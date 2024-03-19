import React from 'react';
import './App.css';
import './details.css';
import Nav from './Nav';
import {useNavigate} from 'react-router-dom';
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getAuth,onAuthStateChanged} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
import { getDatabase, ref,set } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";

function Enterdetails() {
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
      
        // Initialize Firebase
        const app = initializeApp(firebaseConfig);
        const auth = getAuth();
        const database = getDatabase(app);

      const submitdetails = () =>
      {
        onAuthStateChanged(auth, (user) => {
            if (user) {
              const userID = user.uid;  
        var name = document.getElementById("verficationname").value;    
        var dob = document.getElementById("verificationdate").value;    
        var address = document.getElementById("verificationaddress").value;    
        var pancardnumber = document.getElementById("varificationpan").value;    
        var aadharcardnumber = document.getElementById("verificationaadhar").value;   
        var income = document.getElementById("incomeRange").value;
        var typeofemployment = document.getElementById("verificationemployment").value;
         
              set(ref(database, 'reactfiststep/'+user.uid),
          {
              name: name,
              dob: dob,
              address: address,
              pancardnumber:pancardnumber,
              aadharcardnumber: aadharcardnumber,
              income:income,
              typeofemployment:typeofemployment
          })
      
      
          .then( () =>{
              console.log("done");
              alert("Details Stored Successfully!!")
              {
              navigate("/Documentsupload");
              }
      
      })
          .catch( () =>{
              
          alert(error);
      })
      
          .catch((error) => {
              alert(error)
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorMessage);
        }); 
    }
})
      }  
  return (
    <>
      <Nav />
      <p style={{color:"rgb(10, 203, 224)",fontSize:"1.7rem",fontWeight:"700",marginLeft:"640px",marginTop:"-290px",animation:'colorpop 15s infinite'}}>Enter Basic Details</p>
      <div className='registerblock '>
      <span style={{ color: 'black' }}>Enter Name:</span>
      <input type="text" id="verficationname" /><br />
      <span style={{ color: 'black' }}>Enter DOB:</span>
      <input type="date" id="verificationdate" /><br />
      <span style={{ color: 'black' }}>Enter Address:</span>
      <textarea rows="4" id="verificationaddress"></textarea><br />
      <span style={{ color: 'black' }}>Enter PAN Card Number:</span>
      <input type="text" id="varificationpan" /><br />
      <span style={{ color: 'black' }}>Enter Aadhar Number:</span>
      <input type="text" id="verificationaadhar" /><br />
      <span style={{ color: 'black' }}>Enter Income range:</span>
      <select id="incomeRange" name="incomeRange">
        <option value="0-20000">Rs 0 - Rs 20,000</option>
        <option value="20001-40000">Rs 20,001 - Rs 40,000</option>
        <option value="40001-60000">Rs 40,001 - Rs 60,000</option>
        <option value="60001-80000">Rs 60,001 - Rs 80,000</option>
        <option value="80001-100000">Rs 80,001 - Rs 100,000</option>
        <option value="above100000">Above Rs 100,000</option>
      </select><br />
      <span style={{ color: 'black' }}>Type of Employment:</span>
      <input type="text" id="verificationemployment" /><br />
      <button onClick={submitdetails} className="next" id="next">NEXT</button>
      </div>
    </>
  );
}

export default Enterdetails;
