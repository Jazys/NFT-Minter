import React from 'react';
import './item.css'
import axios from 'axios';
import item from '../../assets/item1.png'
import { Link } from 'react-router-dom';
import { ethers } from "ethers";
import abiContract from '../../contract/abi.json';
import { contractAdress, prefixNftStoreIpfs, allNft, jsonCID, prefixLinkTransaction, walletAdrEnableToAccordingRent, contractType, CONTRACT_TYPE } from "../../contract/global";
import { useEffect, useState } from 'react';
import   Loader   from '../../components/loader/loader';
import { useLocation } from 'react-router';
//import QRImage from "react-qr-image";

const Item = (props) => {

  const location = useLocation();
  const tokenId= parseInt(location.pathname.replace("/nft/",""));

  const abi= JSON.parse(JSON.stringify(abiContract));
  const [nft,setNft] = useState(''); 
  const [isTransfer, setIsTransfer] = useState(false); 
  const [isBuying, setIsBuying] = useState(false); 
  

  let walletAdr;
  let priceToSell=-1;

  function handleClick(e) {
    e.preventDefault(); 
    transfertNft();
  }

  function handleClickSell(e) {
    e.preventDefault(); 
    setSell();
  }

  function handleClickSetRent(e) {
    e.preventDefault(); 
  }

  function handleClickSetQrcode(e) {
    e.preventDefault(); 
    getCryptMsgAndQrCode();
  }  

  function handleInput(e) {
    e.preventDefault();
    walletAdr=e.target.value;
    }

  function handleInputSell(e) {
    e.preventDefault();
    priceToSell=e.target.value;
  }

  function handleMint(e) {
    e.preventDefault();
    mintSpecifiedToken();
  }

  function handleMintUnique(e) {
    e.preventDefault();
    mint();
  }

  //only display nft that can be buy

  async function getCryptMsgAndQrCode(){

    if(typeof window.ethereum !== 'undefined' ) {  
      let accounts = await window.ethereum.request({method: 'eth_requestAccounts'});
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAdress, abi, signer);
      const msgHash = await contract.getMessageHash("0x14723A09ACff6D2A60DcdF7aA4AFf308FDDC160C",1,"test",1); 
      const signerWithMsgHash =await window.ethereum.request({ method: "personal_sign", params: [accounts[0], msgHash]});
      console.log(signerWithMsgHash);
      const b64SIgner = window.btoa('signerWithMsgHash');
      console.log(b64SIgner);

      const verify= await contract.verify("0x3534916fB6831b6C6d2e843974d1D4351eb63ce8","0x04723A09ACff6D2A60DcdF7aA4AFf308FDDC160C",1,"test",1, signerWithMsgHash) ; 
      console.log(verify);
      //0x0ea4313e4157169b844fc597103c5efd8a662c6b8e4761c1567f6549c7d8449221fda468d09687ea8361c99f614bb740fb0b4e2c32d077fba0607f5c8aef0c581c

      //<QRImage text="hello" />
    }

  }


  async function displayNFT() {
    if(typeof window.ethereum !== 'undefined' ) {
      let isOwner=false;
      let accounts = await window.ethereum.request({method: 'eth_requestAccounts'});
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAdress, abi, signer);
      let ownerOfNft;
      let tokenIsUsesBySomeone=false;
      let thisNFTCanBeRent=false;

      //Get owner of token
      try{
        ownerOfNft = await contract.ownerOf(tokenId); 
        tokenIsUsesBySomeone=true;
      }catch(e){
        if(e.reason.includes("invalid token ID")){
          tokenIsUsesBySomeone=false;
        }
      }
       
      if(tokenIsUsesBySomeone){
        
        //compare 
        if(accounts[0].toUpperCase()  === ownerOfNft.toUpperCase() ){
          isOwner=true;
        }

        //get information about nft
        let tokenMetadataURI = await contract.tokenURI(tokenId);

        if(jsonCID !== "")
          tokenMetadataURI=prefixNftStoreIpfs+jsonCID+"/"+tokenId+".json";
        else
          tokenMetadataURI=prefixNftStoreIpfs+tokenId+".json";

        try{
            let response= await axios.get(tokenMetadataURI);
           
            let imgSrc=prefixNftStoreIpfs+response.data.image.split("ipfs://")[1];     
            setNft(<div className='item section__padding'>
            <div className="item-image">
              <img src={imgSrc} alt="item" />
            </div>
              <div className="item-content">
                <div className="item-content-title">
                  <h1>{allNft[tokenId-1].title}</h1>
                  <p>Price : {allNft[tokenId-1].price} {allNft[tokenId-1].token}</p>
                </div>
                <div className="item-content-detail">
                  <p>{allNft[tokenId-1].content}</p>
                </div>
                <div className="item-content-buy">
                  {isOwner ?
                  (<>
                    <input id="walletAdr" type="text" placeholder='Wallet Addr'  onInput={handleInput} />
                    <button className="primary-btn" onClick={handleClick}>Transfer</button>  
                    { contractType === CONTRACT_TYPE.EIP4907 ?
                      (<>  
                      <div>
                        <input id="priceToSell" type="text" placeholder='Price to sell'  onInput={handleInputSell} />
                        <button className="primary-btn" onClick={handleClickSell}>Sell</button>  
                      </div> 
                      <div>
                        <input id="amoutToRent" type="text" placeholder='Amount to Rent'  onInput={handleInputSell} />
                        <button className="primary-btn" onClick={handleClickSetRent}>Rent</button>  
                      </div>                   
                      </>)
                      :
                      (<></>)
                    }                
                    <button className="secondary-btn">Metadata</button>
                    <button className="primary-btn" onClick={handleClickSetQrcode}>Create QrCode</button>
                  </>):
                  (<>
                    {walletAdrEnableToAccordingRent === ownerOfNft  ?
                    (<>                
                     <button className="primary-btn">Rent</button>     
                     <button className="primary-btn">Buy</button>  
                     </>):(<></>)
                    }              
                    <button className="secondary-btn">Bid</button>
                  </>)  
                
                }
                
                </div>
              </div>
          </div>);        

        }
        catch (e){
          console.log(e);

        }
        
      }else{

        setNft(<div className='item section__padding'>
            <div className="item-image">
              <img src={allNft[tokenId-1].img} alt="item" />
            </div>
              <div className="item-content">
                <div className="item-content-title">
                  <h1>{allNft[tokenId-1].title}</h1>
                  <p>Price : {allNft[tokenId-1].price} {allNft[tokenId-1].token}</p>
                </div>
                <div className="item-content-detail">
                  <p>{allNft[tokenId-1].content}</p>
                </div>
                <div className="item-content-buy">
                  {isOwner ?
                  (<>
                    <input id="walletAdr" type="text" placeholder='Wallet Addr'  onInput={handleInput} />
                    <button className="primary-btn" onClick={handleClick}>Transfer</button>    
                    <button className="secondary-btn">Metadata</button>
                    <button className="primary-btn">Create QrCode</button>
                  </>):
                  (<>
                    <button className="primary-btn" onClick={handleMintUnique}> Mint {allNft[tokenId-1].price} {allNft[tokenId-1].token}</button>
                  </>)  
                
                }
                
                </div>
              </div>
          </div>);

      }

    }
  }

  

  async function transfertNft() {
    if(typeof window.ethereum !== 'undefined' ) {
      let accounts = await window.ethereum.request({method: 'eth_requestAccounts'});
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAdress, abi, signer);
        
      const transaction = await contract["safeTransferFrom(address,address,uint256)"](accounts[0], walletAdr, tokenId);  
      setIsTransfer(true);   
      await transaction.wait();
      setIsTransfer(false);

    }
  }

  async function setSell() {
    if(typeof window.ethereum !== 'undefined' ) {
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
          from: accounts[0]
        }
      
        const transaction = await contract.mint(accounts[0], 1, overrides);
        setIsBuying(true);       
        await transaction.wait();
        setIsBuying(false);
        console.log(
					`Mined, see transaction: ${prefixLinkTransaction}${transaction.hash}`
				)
       
      }
      catch(err) {
        setIsBuying(false);
        console.log(err)
        //setError(err.message);
      }
    }
  }

  async function mintSpecifiedToken() {
    if(typeof window.ethereum !== 'undefined') {
      let accounts = await window.ethereum.request({method: 'eth_requestAccounts'});
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAdress, abi, signer);
      try {
        let overrides = {
          from: accounts[0]
        }
      
        const transaction = await contract.mintSpecifiedToken(accounts[0], tokenId, overrides);
        setIsBuying(true);
        await transaction.wait();
        setIsBuying(false);
        console.log(
					`Mined, see transaction: ${prefixLinkTransaction}${transaction.hash}`
				)

      
       
      }
      catch(err) {
        setIsBuying(false);
        console.log(err)
        //setError(err.message);
      }
    }
  }

  

  useEffect(  () => {
    displayNFT(); 
  }, []); // eslint-disable-line react-hooks/exhaustive-deps



  return( 
    <div>        
        {nft}
        <div className='item-loader'>
          { isTransfer === true ?
            (<><Loader msg="Transfer is in progress"></Loader> </>):
          (<></>)
          }
          { isBuying === true ?
            (<><Loader msg="Buy NFT is in progress"></Loader> </>):
          (<></>)
          }
        </div>
    </div>
      
  )
};

export default Item;
