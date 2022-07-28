import React from 'react'
import axios from 'axios';
import './mynft.css'
import { Link } from 'react-router-dom';
import { ethers } from "ethers";
import abiContract from '../../contract/abi.json';
import { contractAdress, prefixNftStoreIpfs, jsonCID, CONTRACT_TYPE, contractType } from "../../contract/global";
import { useEffect, useState } from 'react';
import   Loader   from '../../components/loader/loader';


const MyNft = () => {

  const abi= JSON.parse(JSON.stringify(abiContract));
  const [loadState, setLoadState] = useState(false); 
  const [firtLoad, setFirstLoad] = useState(true); 
  const [mynft,setMynft] = useState([]); 

  //get balance of all nft for the contract

  async function getMyAllNft() {
    if(typeof window.ethereum !== 'undefined' && firtLoad) {
      let accounts = await window.ethereum.request({method: 'eth_requestAccounts'});
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAdress, abi, signer);

      const nftBalance = await contract.balanceOf(accounts[0]);
      const nbNft = await contract.totalSupply();

      setLoadState(true);

      if(contractType === CONTRACT_TYPE.ERC721){

        for(let i = 0; i < nbNft; i++) {  
          try{

            const tokenId = await contract.tokenOfOwnerByIndex(accounts[0], i);

            let tokenMetadataURI = await contract.tokenURI(tokenId);
       
            if(jsonCID === "")
              tokenMetadataURI=prefixNftStoreIpfs+jsonCID+"/"+tokenId+".json";
            else
              tokenMetadataURI=prefixNftStoreIpfs+tokenMetadataURI.replace("ipfs://",'');
  
            let imgSrc="";

            let response= await axios.get(tokenMetadataURI);  
            imgSrc=prefixNftStoreIpfs+response.data.image.split("ipfs://")[1];

            setMynft(oldArray => [...oldArray, <div className="card-column" key={i}>
            <div className="bids-card">
              <div className="bids-card-top">
                <img src={imgSrc} alt="" />
              <Link to={{pathname:`/nft/${tokenId}`, state:''}}>
              <p className="bids-title">{response.data.name}</p>
              </Link>
              </div>
              <div className="bids-card-bottom">
                <p>{response.data.description}</p>
                <p>Edition : {response.data.edition}</p>
              </div>
            </div>
          </div>]);
          }
          catch{

          }
          }
      }else if(contractType === CONTRACT_TYPE.EIP4907){        

        for(let i = 0; i < nbNft; i++) {
          const tokenId = i+1;
  
          let owner = await contract.ownerOf(i+1);
    
          if( owner.toLowerCase() === accounts[0].toLowerCase() )
          {
            let tokenMetadataURI = await contract.tokenURI(tokenId);
  
            if(jsonCID !== "")
              tokenMetadataURI=prefixNftStoreIpfs+jsonCID+"/"+tokenId+".json";
            else
              tokenMetadataURI=prefixNftStoreIpfs+tokenId+".json";

              try{
                  let response= await axios.get(tokenMetadataURI);               
                  let imgSrc=prefixNftStoreIpfs+response.data.image.split("ipfs://")[1];
                  setMynft(oldArray => [...oldArray, <div className="card-column" key={i}>
                  <div className="bids-card">
                    <div className="bids-card-top">
                      <img src={imgSrc} alt="" />
                    <Link to={{pathname:`/nft/${tokenId}`, state:''}}>
                    <p className="bids-title">{response.data.name}</p>
                    </Link>
                    </div>
                    <div className="bids-card-bottom">
                      <p>{response.data.description}</p>
                      <p>Edition : {response.data.edition}</p>
                    </div>
                  </div>
                </div>]);  
              }
              catch{
  
              }
            }
          }

      }         

      setLoadState(false);
      
    }
  }

  useEffect( async () => {
    getMyAllNft(); 
}, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <div className='bids-container'>
        { loadState === true ?
        (<><Loader msg="Loading your NFT"></Loader> </>):
        (<></>)
        }
      </div>
    <div className='bids section__padding'>
      <div className="bids-container">     
      <div className="bids-container-card">
          {mynft}
      </div>
     
      </div>
    </div>
    </div>
  )
}

export default MyNft
