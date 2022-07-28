import React from 'react';
import { useState, useEffect } from 'react';
import './mint.css'
import { contractAdress,  mintTitle, mintContentText, mintUrlImg, prefixLinkTransaction } from "../../contract/global";
import { ethers } from "ethers";
import abiContract from '../../contract/abi.json';
import   Loader   from '../../components/loader/loader';
import parse from 'html-react-parser'



const Mint = () => {

  const abi= JSON.parse(JSON.stringify(abiContract));

  const [input, setInput] = useState(''); 
  const [mintState, setMintState] = useState(false); 
  const [lastTransaction, setLastTransaction] = useState(''); 
  const [mintNumber, setMintNumber]= useState(''); 
  
  //make a http request to a webhook
  function handleClick(e) {
    e.preventDefault();
    mint();
  }

  async function getMaxSupply() {
    if(typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(contractAdress, abi, provider);
      try {
        const cost = await contract.cost();
        const totalSupply = await contract.totalSupply();
        const maxSupply = await contract.maxSupply();
        const object = {"cost": String(cost), "totalSupply": String(totalSupply), "maxSupply":String(maxSupply)};
        setMintNumber(String(totalSupply)+"/"+String(maxSupply));
        //setData(object);
      }
      catch(err) {
        console.log(err);
        //setError(err.message);
      }
    }
  }


  

  async function mint() {
    if(typeof window.ethereum !== 'undefined') {
      let accounts = await window.ethereum.request({method: 'eth_requestAccounts'});
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAdress, abi, signer);
      try {
        let overrides = {
          from: accounts[0],
          gasLimit: 1 * 10 ** 6
        }
      
        const transaction = await contract.mint(accounts[0], input, overrides);
        setMintState(true);
        setLastTransaction("");
        await transaction.wait();
        setMintState(false);
        setLastTransaction(`${prefixLinkTransaction}${transaction.hash}`);
        console.log(
					`Mined, see transaction: ${prefixLinkTransaction}${transaction.hash}`
				)

        getMaxSupply();
       
      }
      catch(err) {
        setMintState(false);
        console.log(err)
        //setError(err.message);
      }
    }
  }


  useEffect(() => {
    getMaxSupply();
  },)


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
              <p>
               {parse(mintContentText)}</p>
            </div>
            <div className="item-content-buy">
             <input type="text" placeholder='Number to mint' value={input} onInput={e => setInput(e.target.value)} />
              <button className="primary-btn" onClick={handleClick}>Mint</button>
              { mintState === true ?
                (<><Loader msg="Mint is in progess, see change of Mint Availabe"></Loader> </>):
                (<></>)
              }
                    
            </div>            
            <div className="item-content-title">
              <p>Mint Available : {mintNumber} (see last transaction : <a href={ lastTransaction }> { lastTransaction }</a>)</p>       
            </div>             
          </div>
      </div>
  )
};

export default Mint;
