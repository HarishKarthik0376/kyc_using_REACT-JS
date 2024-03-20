import React,{useState} from 'react';
import './App.css';
import './details.css';
import './Livecamera.css';
import Nav from './Nav';
import {useNavigate} from 'react-router-dom';
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getAuth,onAuthStateChanged} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
import { getDatabase, ref,set } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";
import { Helmet } from 'react-helmet';

function Livecamera() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
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

        const webcamel = document.getElementById("webcam");
        const canvasel = document.getElementById("canvas");

        let openweb;
        let imagecaptured;

        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user.uid);
                console.log("This is" + user.uid);
                openweb = new Webcam(webcamel, "user", canvasel);
                openweb.start();
            }
        });

    const snaptheimage = () => {
        imagecaptured = openweb.snap();
    };

    const captureimage = () => {
        snaptheimage();
        openweb.stop();
        webcamel.setAttribute("poster", imagecaptured);
        webcamel.style.display = "none";
        canvasel.style.display = "block";
        document.getElementById("captureimage1").style.display = "block";
        document.getElementById("contninuetonextbtn").style.display = "block";
        set(ref(database, 'profilepic/' + user),
            {
                capturedimage: imagecaptured
            })
            .then(() => {
                console.log("done");
                alert("Image Uploaded Successfully!!");
            })
            .catch((error) => {
                alert(error);
            });
    };

    const retrakeimage = () => {
        document.getElementById("captureimage1").style.display = "none";
        openweb.start();
        webcamel.style.display = "block";
        canvasel.style.display = "none";
        document.getElementById("contninuetonextbtn").style.display = "none";
    };

  return (
   <>
   <Nav />
   <Helmet>
    <title>Camera Verification</title>
   </Helmet>
     <div className="documentshero">
      <div className="mainhead">
      <p style={{color:"rgb(10, 203, 224)",fontSize:"2.9rem",fontWeight:"700",marginLeft:"75px",marginTop:"-20px",animation:'colorpop 15s infinite'}}>Live Camera Verification</p>
      <p style={{color:"white",fontSize:"1.7rem",fontWeight:"700",marginLeft:"110px",marginTop:"-5px",animation:'colorpop 15s infinite'}}>Make Sure There Is Ample Of Light</p>
      </div>
      <div className="webcamdiv">
        <video style={{ borderRadius: '10px', border: '2px solid white' }} id="webcam" autoPlay playsInline width="400" height="400"></video>
        <canvas id="canvas" style={{ display: 'none' }}></canvas>
        <div className="cameraoptions">
        <a href="#"><button id="captureimage" onClick={captureimage}>Capture Image</button></a>
            <a href="#"><button id="captureimage1" onClick={retrakeimage}>Retake</button></a>
        </div>
      </div>
      <button id="contninuetonextbtn" >Next Step</button>
    </div>
  
    
   </>
  )
}

export default Livecamera