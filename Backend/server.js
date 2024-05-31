const express = require('express');
const {fetchTopPosts} = require('./crawler');
const cors = require('cors')

const app = express();

app.use(cors());

app.get('/api/top-posts' , async (req,res) => {
    try{
        const topPosts = await fetchTopPosts();
        res.json(topPosts);
    }catch(error){
        console.error("Error fetching" , error);
        res.status(500).json({error:'Failed to fetch the posts'});
    }
});

const PORT  = 5000;
app.listen(PORT , () => {
    console.log(`Server is running on port ${PORT}`);
})