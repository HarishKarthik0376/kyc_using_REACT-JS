import React from 'react'
import './App.css'
import { Navigate, useNavigate} from 'react-router-dom';
import Signuup from './Signuup';
import Nav from './Nav';
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
import { getDatabase, set, ref } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";


function Newfile() {
  const navigate = useNavigate();
  const firebaseConfig = {
    apiKey: "AIzaSyDiB0CIJQ11qRk_QftVaWtIk-bH58K8o5M",
    authDomain: "kycverification-dbee2.firebaseapp.com",
    databaseURL: "https://kycverification-dbee2-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "kycverification-dbee2",
    storageBucket: "kycverification-dbee2.appspot.com",
    messagingSenderId: "298818644287",
    appId: "1:298818644287:web:60cabbb085e0e1d49f4b8a"
  };
  const app = initializeApp(firebaseConfig);
  const auth = getAuth();
  const database = getDatabase(app);
  const Savetodatabse = () =>
  {
    var email = document.getElementById("loginemail").value;
    var password =  document.getElementById("loginpassword").value;
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log(user);
    alert("Welcome"+email)
    {
      navigate("/Mainpage");
    }
    
  })

.catch((error) => {
     alert(error)
    const errorMessage = error.message;
    console.log(errorMessage);


  })
}
  
  
  return (
    <>
      <Nav />
      <div className='together'>
        <div className='imageside'>
          <p style={{color:"white",fontSize:"3rem",fontWeight:"700",marginLeft:"190px",marginTop:"40px"}}>WELCOME TO THE</p>
          <p style={{color:"white",fontSize:"3rem",fontWeight:"700",marginLeft:"295px",marginTop:"10px", animation:"colorpop 15s", animationIterationCount:"infinite"}}>HkBanks</p>
          <img id='loginpng' src="src/Resources/1060387.png"/>
          <p style={{color:"white",fontSize:"2rem",fontWeight:"700",marginLeft:"185px",marginTop:"10px"}}>KINDLY LOGIN TO CONTINUE</p>
        </div>
        <div className='section'>
          <div className='loginbox'>
            <p style={{color:"white",fontSize:"2.5rem",fontWeight:"700",marginLeft:"180px",marginTop:"10px"}}>Login</p>
            <div className='email' style={{marginTop:"20px",marginLeft:"10px"}}>
              <span style={{color:"white",fontSize:"1.4rem",fontWeight:"700",marginLeft:"10px",marginTop:"10px"}}>Enter Your Email: </span><input type="email" className='loginemail' id='loginemail' placeholder='Enter Email Id' />
            </div>
            <div className='password' style={{marginTop:"30px",marginLeft:"10px"}}>
              <span style={{color:"white",fontSize:"1.4rem",fontWeight:"700",marginLeft:"10px",marginTop:"10px"}}>Enter Your Password: </span><input type="password" className='loginpassword'id='loginpassword' placeholder='Enter Password' />
              <button onClick={Savetodatabse} className='submitlogin' id='Login'>Login</button>
              <p onClick={()=>
              {
                navigate("/Signuup");
              }}  style={{ color: 'white', fontSize: '1rem', fontWeight: '700', marginLeft: '125px', marginTop: '5px', animation: 'colorpop 15s infinite', textDecoration: 'none', cursor: 'pointer' }}>New? Click Here To Signup</p>
            </div>
          </div>
        </div>
      </div>
      </>
  )
}

export default Newfile