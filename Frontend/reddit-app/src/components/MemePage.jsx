import React , {useState , useEffect} from 'react';
import axios from 'axios';
import {jsPDF} from 'jspdf';



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
        <div>
            <h2>  Top 20 Trending memes </h2>
            <button onClick={generatePdf}> Generate PDF </button>
            <ul>
                {topPosts.map((meme,index) => (
                    <li key={index}>
                        <strong> {meme.title} </strong> - {meme.url}
                        <strong> {meme.upvotes} </strong>
                    </li>
                ))}
            </ul>
        </div>
    )
};


export default MemePage;