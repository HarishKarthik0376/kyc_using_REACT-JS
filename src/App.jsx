import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import Newfile from './Newfile';
import Signuup from './Signuup';
import Mainpage from './Mainpage'
import Enterdetails from './Enterdetails'
import Documentsupload from './Documentsupload'
import Livecamera from './Livecamera';
import Nav from './Nav';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Newfile' element={<Newfile />} />
        <Route path='/Signuup' element={<Signuup />} />
        <Route path='/Mainpage' element={<Mainpage />} />
        <Route path='/Enterdetails' element={<Enterdetails />} />
        <Route path='/Documentsupload' element={<Documentsupload />} />
        <Route path='/Livecamera' element={<Livecamera />} />
      </Routes>
    </Router>
  );
}

function Home() {
  return (
    <div>
    <Nav />
      <div className='buttons'>
        <Navigation />
        <AnotherNav />
      </div>
    </div>
  );
}

function Navigation() {
  const navigate = useNavigate(); 

  return (
    <button className='button1' onClick={() => navigate('/Newfile')}>Login</button>
  )
}

function AnotherNav() {
  const navigate = useNavigate(); 

  return (
    <button className='button1' onClick={() => navigate('/Signuup')}>Sign Up</button>
  );
}

export default App;
