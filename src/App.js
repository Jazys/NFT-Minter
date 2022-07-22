import './App.css';
import {Navbar,Footer} from './components'
import {Home,Profile,Item, Create,Login,Register, MyNft, Mint, Explore} from './pages'
import { Routes, Route } from "react-router-dom";
import React, { useState, useEffect  } from "react";
import { ethers } from "ethers";
import abiContract from './contract/abi.json';
import { contractAdress, enableMint} from './contract/global';
import useBus from 'use-bus';
import { dispatch } from 'use-bus';

//simpli example
//https://github.com/cryptoadam0x28/wallet-nfts

function App() {

  const abi= JSON.parse(JSON.stringify(abiContract));

  const IterateBtn = () => {
    return (
      <button onClick={() => dispatch('@@ui/ADD_ITERATION', '')}>
        Iterate
      </button>
    )
  }
  useBus(
    '@@ui/ADD_ITERATION',
    () => {},
  )

  // usetstate for storing and retrieving wallet details
  const [data, setdata] = useState({
    address: "",
    Balance: null,
  });
  
  // Button handler button for handling a
  // request event for metamask
  const btnhandler = () => {   
    // Asking if metamask is already present or not
    if (window.ethereum) {
      // res[0] for fetching a first wallet
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((res) =>{ setdata({
          address: res[0],
        }); 
        accountChangeHandler(res[0])})
        getNFTFromAdr();
    } else {
      alert("install metamask extension!!");
    }
  };
  
  // getbalance function for getting a balance in
  // a right format with help of ethers
  const getbalance = (address) => {
  
    // Requesting balance method
    window.ethereum
      .request({ 
        method: "eth_getBalance", 
        params: [address, "latest"] 
      })
      .then((balance) => {
        // Setting balance
        setdata({
          Balance: ethers.utils.formatEther(balance),
        });
      });
  };
  
  // Function for getting handling all events
  const accountChangeHandler = (account) => {
    // Setting an address data

    //console.log(account);
    setdata({
      address: account,
    });
  
    // Setting a balance
    getbalance(account);

    //
    getNFTFromAdr();
  };

  useEffect(() => {
    fetchData();
    getNFTFromAdr();
    const timer = setInterval(() =>{ console.log("titi"); console.log(data)}, 10000);
  }, [])

  async function fetchData() {
    if(typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(contractAdress, abi, provider);
      try {
        const cost = await contract.cost();
        const totalSupply = await contract.totalSupply();
        const object = {"cost": String(cost), "totalSupply": String(totalSupply)};
        console.log(object);
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
          value: data.cost
        }
        const transaction = await contract.mint(accounts[0], 1, overrides);
        let tx = await transaction.wait();
        console.log(
					`Mined, see transaction: https://rinkeby.etherscan.io/tx/${transaction.hash}`
				)
        fetchData();
      }
      catch(err) {
        //setError(err.message);
      }
    }
  }

  async function getNFTFromAdr(){
    console.log("toto");
    let accounts = await window.ethereum.request({method: 'eth_requestAccounts'});
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAdress, abi, signer);
    contract.defaultAccount = accounts[0]
    const spacePunksBalance = await contract.balanceOf(accounts[0])

    console.log(spacePunksBalance);

    for(let i = 0; i < spacePunksBalance; i++) {
      const tokenId = await contract.tokenOfOwnerByIndex(accounts[0], i)

      let tokenMetadataURI = await contract.tokenURI(tokenId)

      if (tokenMetadataURI.startsWith("ipfs://")) {
        tokenMetadataURI = `https://gateway.pinata.cloud/ipfs/${tokenMetadataURI.split("ipfs://")[1]}`
        tokenMetadataURI = tokenMetadataURI.replace("json","png");
      }

      //https://gateway.pinata.cloud/ipfs/Qmf8HbWaXaYKrkzaXAFf2oMMAHJuyuVvc7ZUtugESK1LK7/1.json

      console.log(tokenMetadataURI);

      const tokenMetadata = await fetch(tokenMetadataURI).then((response) => response.json())

      /*const spacePunkTokenElement = document.getElementById("nft_template").content.cloneNode(true)
      spacePunkTokenElement.querySelector("h1").innerText = tokenMetadata["name"]
      spacePunkTokenElement.querySelector("a").href = `https://opensea.io/assets/0x45db714f24f5a313569c41683047f1d49e78ba07/${tokenId}`
      spacePunkTokenElement.querySelector("img").src = tokenMetadata["image"]
      spacePunkTokenElement.querySelector("img").alt = tokenMetadata["description"]

      document.getElementById("nfts").append(spacePunkTokenElement)*/
    }
  }

  return (
    <div>
      <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/nft/:id" element={<Item  walletInfo={data}/>} />
            <Route path="/create" element={<Create /> } />
            {enableMint  ?
              (     
                <>  
                    <Route path="/mint" element={ <Mint />} />
                </>  
                
              ):(<> </> )}
            <Route path="/mynft" element={ <MyNft />} />
         
            <Route path="/explore" element={ <Explore />} />
            {/*<Route path="/profile/:id" element={<Profile />} />
            <Route path="/login" element={ <Login connect={btnhandler}/>} />
            <Route path="/register" element={ <Register />} />*/}            
          </Routes>
      <Footer />
    </div>
  );
}

export default App;
