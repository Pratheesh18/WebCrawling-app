import React , {useState} from 'react';
import axios from 'axios';
import { Button,TextField,Container,Typography } from '@mui/material';
import {useNavigate} from 'react-router-dom';


const RegisterForm = () => {
    const [username , setUserName] = useState('');
    const [email , setEmail] = useState('');
    const [password , setPassword] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try{
            const res = await axios.post('http://localhost:5000/api/register',{
                username,
                email,
                password
            });
            console.log('Registration successful' , res.data);
            navigate('/login');
        }catch(error){
            console.error('Error registering ' , err);
        };
    };

    const handleGoogleLogin = () => {
        window.location.href = 'http://localhost:5000/auth/google'
    };

    return(
        <Container maxWidth="sm">
            <Typography variant='h4' gutterBottom> Register </Typography>
            <form onSubmit={handleRegister}>
                <TextField label="Username" margin='normal' value={username} onChange={(e) => setUserName(e.target.value)} fullWidth required />
                <TextField label="Email" margin='normal' value={email} onChange={(e) => setEmail(e.target.value)} fullWidth required />
                <TextField label="Password" margin='normal' value={password} onChange={(e) => setPassword(e.target.value)} fullWidth required />
                <Button type='submit' variant='contained' color='primary' fullWidth>
                    Register
                </Button>
            </form>
            <Button variant='contained' color='secondary' fullWidth style={{marginTop:'16px'}} onClick={handleGoogleLogin}>
                Sign Up with Google
            </Button>
        </Container>
    )
};


export default RegisterForm;