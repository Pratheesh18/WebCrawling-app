const {storePosts} = require('./mongoService');


async function testStorePosts(){
    try{
        await storePosts();
        console.log("Posts stored success");
    }catch(error){
        console.error('Error fetching memes' , error);
    }
};

testStorePosts();