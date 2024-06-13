const express = require('express');
const mongoose = require('mongoose');
const {fetchTopPosts} = require('./crawler');
const authRoutes = require('./Routes/authRoutes')
const cors = require('cors')
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth' , authRoutes)

app.get('/api/top-posts' , async (req,res) => {
    try{
        const topPosts = await fetchTopPosts();
        res.json(topPosts);
    }catch(error){
        console.error("Error fetching" , error);
        res.status(500).json({error:'Failed to fetch the posts'});
    }
});


 mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser : true,
    useUnifiedTopology : true
 })
   .then(() => console.log('Mongo DB Connected'))
   .catch(err => console.error('MongoDB connection error' , err));



const PORT  = 5000;
app.listen(PORT , () => {
    console.log(`Server is running on port ${PORT}`);
})