import React from 'react';
import './App.css';
import './details.css';
import './documentsupload.css';
import Nav from './Nav';
import {useNavigate} from 'react-router-dom';
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getAuth,onAuthStateChanged} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
import { getDatabase, ref,set } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";
import {getStorage, ref as storageRef, uploadBytes} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-storage.js"

function Documentsupload() {
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
        const DocumenttoUpload =() => {
        const app = initializeApp(firebaseConfig);
          const auth = getAuth();
          const storage = getStorage(app);
          const database = getDatabase(app);
      
          onAuthStateChanged(auth, (user) => {
            if (user) {
              const userID = user.uid;
             console.log(userID);
              const fileSelector = document.getElementById('frontchoosefile');
              fileSelector.onchange = () => {
                const file = fileSelector.files[0];
                const mountainsRef = storageRef(storage, "docs/" + user.uid +"/front");
                uploadBytes(mountainsRef, file)
                  .then((snapshot) => {
                    console.log('Uploaded a blob or file!');
                  })
                  .catch((error) => {
                    console.error('Error uploading file:', error);
                  });
              };
      
              const fileSelector1 = document.getElementById('backchoosefile');
              fileSelector1.onchange = () => {
                const file1 = fileSelector1.files[0];
                const mountainsRef = storageRef(storage, "docs/" + user.uid +"/back");
                uploadBytes(mountainsRef, file1)
                  .then((snapshot) => {
                    console.log('Uploaded a blob or file!');
                  })
                  .catch((error) => {
                    console.error('Error uploading file:', error);
                  });
                
                set(ref(database,"reactuserdocs/"+ user.uid), {
                  typeofproof: document.getElementById('documentsselect').value
                }).then(() => {
                  console.log('done');
                  alert('Image Uploaded Successfully');
                  document.getElementById('continuetonextbtn').style.display = 'block';
                });
              };
            } else {
              console.log('No user logged in');
            }
          });
      
      
    }
    const handleConfirmClick = () => {
        const selectedDocument = document.getElementById('documentsselect').value;
        if (selectedDocument !== '--Choose A Document--') {
          document.getElementById('sectiontoupload').style.display = 'block';
          document.getElementById('fotnsidetext').innerHTML = `Upload Front Side Of ${selectedDocument}`;
          document.getElementById('backsidetext').innerHTML = `Upload Back Side Of ${selectedDocument}`;
          document.getElementById('frontchoosefile').value = null;
          document.getElementById('backchoosefile').value = null;
        } else {
          alert('Choose A Valid Document!!');
          document.getElementById('sectiontoupload').style.display = 'none';
        }
      }
  return (
  <>
    <Nav />
    <div className="documentshero">
            <div className="mainhead">
                <h1 style={{ color: 'white',animation:"colorpop 15s infinite" }}>Upload The Following Documents</h1>
            </div>
            <div className="selectdocumenttype">
                <select name="documents" id="documentsselect">
                    <option>--Choose A Document--</option>
                    <option value="Aadhaar Card">Aadhaar Card</option>
                    <option value="Pan Card">Pan Card</option>
                    <option value="Drivers License">Drivers License</option>
                </select>
                <button className="confirm" id="confirm" onClick={handleConfirmClick}>Submit</button>
            </div>
            <div className="sectiontoupload" id="sectiontoupload">
                <span id="fotnsidetext">Upload Front Side Of The Document</span>
                <div className="frontpic">
                    <div className="inititaldiv" id="inititaldiv1">
                        <input type="file" id="frontchoosefile" />
                        <img id="imageupload" src="src/Resources/png-clipart-upload-icon-line-angle-symbol-font-upload-angle-symbol-thumbnail-removebg-preview.png" alt="Upload icon" />
                    </div>
                </div>
                <br />
                <span id="backsidetext">Upload Back Side Of The Document</span>
                <div className="backpic">
                    <div className="inititaldiv" id="inititaldiv2">
                        <input type="file" id="backchoosefile" onClick={DocumenttoUpload} />
                        <img id="imageupload" src="src/Resources/png-clipart-upload-icon-line-angle-symbol-font-upload-angle-symbol-thumbnail-removebg-preview.png" alt="Upload icon" />
                    </div>
                </div>
            </div>
            <button  id="continuetonextbtn">Next Step</button>
        </div>
  </>
  )
}

export default Documentsupload