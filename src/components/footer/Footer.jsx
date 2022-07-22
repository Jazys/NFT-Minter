import React from 'react'
import { useState } from 'react';
import './footer.css'
import nftlogo from '../../assets/logo.png'
import { nameOfCurrentProject, webhookMail } from '../../contract/global';
import { AiOutlineInstagram,AiOutlineTwitter, } from "react-icons/ai";
import { RiDiscordFill } from "react-icons/ri";
import { FaTelegramPlane } from "react-icons/fa";
const Footer = () => {

  const [input, setInput] = useState(''); 

  //make a http request to a webhook
  function handleClick(e) {
    e.preventDefault();
    console.log('Le lien a été cliqué.'+ webhookMail + " "+input);
    alert("Email was sent");
  }

  return (
    <div className='footer section__padding'>
      <div className="footer-links">
        <div className="footer-links_logo">
        <div>
          <img src={nftlogo} alt="logo" />
          <p>{ nameOfCurrentProject}</p>
        </div>
        <div>
          <h3>Get the lastes Updates</h3>
        </div>
        <div>
          <input type="text" placeholder='Your Email' value={input} onInput={e => setInput(e.target.value)} />
          <button onClick={handleClick}>Email Me!</button>
        </div>
        </div>
        <div className="footer-links_div">
          <h4>{ nameOfCurrentProject}</h4>
          <p>Explore</p>
          <p>Contact Us</p>
        </div>
        <div className="footer-links_div">
          <h4>Support</h4>
          <p>Legal</p>
          <p>Privacy policy</p>
        </div>
      </div>
      <div className="footer-copyright">
        <div>
        <p> © {(new Date().getFullYear())} { nameOfCurrentProject}, Inc. All Rights Reserved</p>
        </div>
        <div>
          <AiOutlineInstagram size={25} color='white' className='footer-icon' />
          <AiOutlineTwitter size={25} color='white' className='footer-icon'/>
          <RiDiscordFill size={25} color='white' className='footer-icon'/>
          <FaTelegramPlane size={25} color='white'  className='footer-icon' />
        </div>

      </div>
    </div>
  )
}

export default Footer
