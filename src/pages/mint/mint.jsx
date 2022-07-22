import React from 'react';
import { useState, useEffect } from 'react';
import './mint.css'
import { mintTitle, mintContentText, mintUrlImg } from "../../contract/global";

const Mint = () => {

  const [input, setInput] = useState(''); 
  const [mintNumber, setMintNumber]= useState(''); 

  //make a http request to a webhook
  function handleClick(e) {
    e.preventDefault();
    console.log('Le lien a été cliqué.'+ input);
    alert("Email was sent");
  }

  function getMintNumber(){
    setMintNumber("10/30")
  }

  useEffect(() => {
    getMintNumber()
  }, [])


  return( 
      <div className='item section__padding'>
        <div className="item-image">
          <img src={mintUrlImg} alt="item" />
        </div>
          <div className="item-content">
            <div className="item-content-title">
              <h1>{mintTitle}</h1>          
            </div>        
            <div className="item-content-detail">
              <p>{mintContentText}</p>
            </div>
            <div className="item-content-buy">
             <input type="text" placeholder='Your Email' value={input} onInput={e => setInput(e.target.value)} />
              <button className="primary-btn" onClick={handleClick}>Mint</button>
            </div>
            <div className="item-content-title">
              <p>Mint Available : {mintNumber}</p>       
            </div>         
          </div>
      </div>
  )
};

export default Mint;
