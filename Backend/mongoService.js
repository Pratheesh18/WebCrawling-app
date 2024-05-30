const mongoose = require('mongoose');
const {DateTime} = require('luxon');
const {fetchTopPosts} = require('./crawler');
require('dotenv').config()


const memeSchema = new mongoose.Schema({
    title : String,
    url : String,
    upvotes : Number,
    created_utc : Date
});

const Meme = mongoose.model('Meme' , memeSchema);

async function storePosts(){
    try{
        await mongoose.connect(process.env.MONGO_URL,{
            useNewUrlParser : true,
            useUnifiedTopology : true
        });
        console.log('Connected to Database');

        const topPosts = await fetchTopPosts();
        await Meme.insertMany(topPosts);
        console.log("Memes stored in database");
    }catch(error){
        await mongoose.disconnect();
        console.log("Disconnected from mongodb");
    }
};


module.exports = {storePosts};