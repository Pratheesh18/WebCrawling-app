const axios = require('axios');
const {DateTime} = require('luxon');


async function fetchTopPosts() {
    const url = 'https://www.reddit.com/r/memes/top.json?t=day&limit=100';
    const headers = {'User-agent': 'Mozilla/5.0'};
    const response = await axios.get(url,{headers});
    const posts = response.data.data.children;


    const topPosts = posts
                          .map(post => ({
                            title : post.data.title,
                            url : post.data.url,
                            upvotes : post.data.ups,
                            created_utc : post.data.created_utc
                          }))
                          .filter(post => DateTime.fromSeconds(post.created_utc) >= DateTime.now().minus({days:1}))
                          .sort((a,b) => b.upvotes - a.upvotes)
                          .slice(0,20);

             return topPosts;
}


module.exports = {fetchTopPosts};