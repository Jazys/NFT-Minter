import React,{ useState} from 'react'
import './navbar.css'
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';
import { FaGalacticRepublic } from 'react-icons/fa';
import logo from '../../assets/logo.png'
import {  Link } from "react-router-dom";
import { ethers } from "ethers";
import { contractAdress, nameOfCurrentProject, chainId, chaineName, enableMint} from '../../contract/global';


const Menu = () => (
  <>
     <Link to="/explore"><p>Explore</p> </Link>
     <Link to="/mynft"><p>My NFTs</p></Link>

     {enableMint  ?
      (     
        <>  
          <Link to="/mint"><p>Mint</p></Link>
        </>  
        
      ):(<> </> )}    
  </>
 )

 const Navbar = () => {

    // usetstate for storing and retrieving wallet details
    const [data, setdata] = useState({
      address: "",
      addressMin:"",
      Balance: null,
    });
    
  const [toggleMenu,setToggleMenu] = useState(false)


  // Button handler button for handling a
  // request event for metamask
  const bntConnectWallet = () => {   
    // Asking if metamask is already present or not
    
    if (window.ethereum) {
      // res[0] for fetching a first wallet
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then(async (res) =>{ 

          let chainIdWallet = await window.ethereum.request({ method: 'eth_chainId'})
          console.log('Connected to chain:' + chainId)

      

          if (chainIdWallet !== chainId) {
            alert('You are not connected to the '+chaineName)
            return
          }

         accountChangeHandler(res[0])
      });
    } else {
      alert("install metamask extension!!");
    }
  };
  
  // getbalance function for getting a balance in
  // a right format with help of ethers
  const getbalance = async (address) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const balance = await provider.getBalance(address);
   
    let balanceInEth = ethers.utils.formatEther(balance);
    console.log(balanceInEth);

    const address2 = contractAdress;
    const balanceBigNumber = await provider.getBalance(address2);
    balanceInEth = ethers.utils.formatEther(balanceBigNumber);
    console.log(balanceInEth);

  
  };
  
  // Function for getting handling all events
  const accountChangeHandler = (account) => {
    // Setting an address data

    //console.log(account);
    setdata({
      address: account,
      addressMin: account.substr(0,6)+"...."+account.substr(account.length-4)
    });

    // Setting a balance
    getbalance(account);
  };

  return (
    <div className='navbar'>
      <div className="navbar-links">
        <div className="navbar-links_logo">
          <img src={logo} alt="logo" />
          <Link to="/"> 
            <h1>{ nameOfCurrentProject}</h1>
          </Link>
        </div>
        <div className="navbar-links_container">
          {/*<input type="text" placeholder='Search Item Here' autoFocus={true} /> */}
         <Menu />               
        </div>
      </div>
      <div className="navbar-sign">
     
      {data.address !=="" ?
      (     
        <>  
        <FaGalacticRepublic color="#0f0"/> 
          <b style={{ color: 'white' }}> {data.addressMin}</b>  
        </>  
         
      ):(
        <>
        <button type='button' className='primary-btn' onClick={bntConnectWallet} >Connect Wallet</button>
        </>
      )}
  

       
      </div>
      <div className="navbar-menu">
        {toggleMenu ? 
        <RiCloseLine  color="#fff" size={27} onClick={() => setToggleMenu(false)} /> 
        : <RiMenu3Line color="#fff" size={27} onClick={() => setToggleMenu(true)} />}
        {toggleMenu && (
          <div className="navbar-menu_container scale-up-center" >
            <div className="navbar-menu_container-links">
             <Menu />
            </div>
            <div className="navbar-menu_container-links-sign">
            {data.address !=="" ?
              (     
                <>  
                <FaGalacticRepublic color="#0f0"/> 
                  <b style={{ color: 'white' }}> {data.addressMin}</b>  
                </>  
                
              ):(
                <>
                <button type='button' className='primary-btn' onClick={bntConnectWallet} >Connect Wallet</button>
                </>
              )}           
            </div>
            </div>
        )}
      </div>
    </div>
  )
}

export default Navbar
