const fs = require('fs');
const {DateTime} = require('luxon');
const {Meme} = require('./mongoService');
const TelegramBot = require('node-telegram-bot-api');


async function fetchTopPosts(){
    const date = DateTime.now().minus({days:1}).toJSDate();
    return await Meme.find({created_utc : {$gte:date}})
                     .sort({upvotes:-1})
                     .limit(20);
}

async function generateReport(){
    try{
        const topPosts = await fetchTopPosts();
        let report = 'Top 20 Trending Memes in the Past 24 Hours:\n\n';
        topPosts.forEach((post, index) => {
             report += `${index + 1}. ${post.title}\n${post.url}\n\n`;
        });

        const fileName = 'memes_report.txt';
        fs.writeFileSync(fileName,report);
        return fileName;
    }catch(error){
        console.error('Error generating report ',error);
        throw error;
    }
};


async function sendReportViaTelegram(token,chatId){
    try{
        const bot = new TelegramBot(token , {polling : false});
        const fileName = await generateReport();
        await bot.sendDocument(chatId , fileName);
        console.log("Report sent via bot");

    }catch(error){
        console.error('Error sending via telegram ' , error);
        throw error;
    }
}


module.exports = {sendReportViaTelegram};