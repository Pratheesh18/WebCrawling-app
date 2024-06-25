import React , {useState , useEffect}  from 'react';
import MemePage from './components/MemePage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import Dashboard from './components/Dashboard';
import { Container } from '@mui/material';


const App = () => {
  return(
    <Router>
      <Container>
        <Routes>
          <Route path='/' element={<RegisterForm />} />
          <Route path='/login' element={<LoginForm />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path="*" element={<div>Page Not Found</div>} />
        </Routes>
      </Container>
    </Router>
  )
};


export default App;







