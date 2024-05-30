const {fetchTopPosts} = require('./crawler');

async function testFetchTopPosts() { 
    try{
        const topPosts = await fetchTopPosts();
        console.log('Top Posts ',topPosts);
    }catch(error){
        console.error("Error Fetching " , error);
    }
};

testFetchTopPosts();