import React from 'react'
import './App.css'
import './Mainpage.css'
import Nav from './Nav'
import { Navigate, useNavigate} from 'react-router-dom';

function Mainpage() {
    const navigate = useNavigate();
  return (
    <>
    <Nav />
    <div className='mainsection'>
    <img id='kycphoto' src="src/Resources/kyc.png"/>
    <div className='emptybox'>
    <p style={{color:"rgb(10, 203, 224)",fontSize:"1.4rem",fontWeight:"700",marginLeft:"180px",marginTop:"10px",animation:'colorpop 15s infinite'}}>About Kyc Verification</p>
        <p id='aboutkyc'>Online KYC (Know Your Customer) verification utilizing OCR (Optical Character Recognition) technology has revolutionized the authentication process for businesses worldwide. By leveraging OCR, companies can swiftly and accurately verify the identity of their customers through various documents such as passports, IDs, and driver's licenses. This process extracts relevant information from scanned documents, including name, date of birth, and address, and compares it against databases for validation. Not only does this streamline the onboarding process, but it also enhances security by detecting fraudulent documents and ensuring compliance with regulatory requirements. With the seamless integration of OCR technology, online KYC verification offers a convenient and efficient solution for businesses while maintaining robust security standards.</p>
    </div>
    </div>
    <div className='sectiontwo'>
        <p style={{color:"rgb(10, 203, 224)",fontSize:"1.4rem",fontWeight:"700",marginLeft:"170px",marginTop:"20px",animation:'colorpop 15s infinite'}}>Steps To Verify KYC Online</p>
        <div className='listofsteps'>
            <ul className='unorderlist'>
                <li className='steps'>Enter Basic Details About Self</li>
                <li className='steps'>Upload A Identity Proof</li>
                <li className='steps'>Live Camera Verification</li>
                <li className='steps'>Confirm And Start Verification</li>
            </ul>
        </div>
        <button onClick={() =>
        {
            navigate("/Enterdetails");
        }} className='submitlogin1' id='startkyc'>Start KYC Verification</button>
    </div>
    </>
  )
}

export default Mainpage