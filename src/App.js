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

  

  useEffect(() => {
    fetchData();
  }, [])

  async function fetchData() {
    if(typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(contractAdress, abi, provider);
      try {
        const cost = await contract.cost();
        const totalSupply = await contract.totalSupply();
        const object = {"cost": String(ethers.utils.formatEther(cost)), "totalSupply": String(totalSupply)};
        //setData(object);
      }
      catch(err) {
        console.log(err);
        //setError(err.message);
      }
    }
  }



 

  return (
    <div>
      <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/nft/:id" element={<Item />} />
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
