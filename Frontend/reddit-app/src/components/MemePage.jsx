import React , {useState , useEffect} from 'react';
import axios from 'axios';
import {jsPDF} from 'jspdf';
import {Card,CardContent,CardMedia,Typography,Button,Grid} from '@mui/material';
import { DateTime } from 'luxon';



const MemePage = () => {
    const [topPosts , setTopPosts] = useState([]);


    useEffect(() => {
        fetchTopPosts();
        console.log("Posts " , fetchTopPosts());
    },[]);

    const fetchTopPosts = async () => {
        try{
            const res = await axios.get('http://localhost:5000/api/top-posts');
            console.log("memes" , res.data)
            setTopPosts(res.data);
        }catch(err){
            console.error('Error fetching data ' , err);
        }
    };

    const formDate = (unixTimeStamp) => {
        return DateTime.fromSeconds(unixTimeStamp).toLocaleString(DateTime.DATETIME_MED);
    }


    const generatePdf = () => {
        const doc = new jsPDF();
        let yPos = 10;

        doc.text("Top 20 trending memes " , 10,yPos);

        topPosts.forEach((post,index) => {
            yPos += 10;
            doc.text(`${index + 1}. ${post.title}`, 10, yPos);
            doc.text(`${post.url}`, 10, yPos + 5);
        });

        doc.save('Top_Memes_Report.pdf');
    };


    return(
        <div style={{padding:20}}>
            <Typography variant='h4' gutterBottom>
                Top 20 Trending Memes
            </Typography>
            <Button variant='contained' color='primary' onClick={generatePdf} style={{marginBottom:20}}>
                Generate PDF
            </Button>
            <Grid conatiner spacing={4}>
                {topPosts.map((meme,index) => (
                    <Grid item key={index} xs={12} sm={6} md={4}>
                        <Card style={{margin:20}}>
                            <CardMedia
                                 component="img"
                                 alt={meme.title}
                                 height="140"
                                 image={meme.url}
                                 title={meme.title}
                            />
                            <CardContent>
                                <Typography variant='h6' component="div">
                                    {meme.title}
                                </Typography>
                                <Typography variant='body2' color="text.secondary">
                                    Upvotes : {meme.upvotes}
                                </Typography>
                                <Typography variant='body2' color="text.secondary">
                                    Created Date and Time :   {formDate(meme.created_utc)}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </div>
    )
};


export default MemePage;