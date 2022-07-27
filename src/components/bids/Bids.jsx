/* eslint-disable no-loop-func */
import './bids.css'
import { AiFillHeart} from "react-icons/ai";
import { Link } from 'react-router-dom';
import { allNft } from '../../contract/global';
import React, { useState, useEffect  } from "react";
import { ethers } from "ethers";
import abiContract from '../../contract/abi.json';
import { contractAdress, walletAdrEnableToAccordingRent} from '../../contract/global';
import useBus from 'use-bus';
import { dispatch } from 'use-bus';

const Bids = ({title, more}) => {

  const abi= JSON.parse(JSON.stringify(abiContract));
  const [nftToDisplay,setNftToDisplay] = useState([]); 


  useBus(
    '@@ui/RELOAD_COLLECTION',
    () => { getNumberTakenNft(); },
  )

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  async function getNumberTakenNft() {
    if(typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(contractAdress, abi, provider);
      try {
        const cost = await contract.cost();
        const totalSupply = await contract.totalSupply();
        const object = {"cost": String(ethers.utils.formatEther(cost)), "totalSupply": String(totalSupply)};

        let numberNfTaken=parseInt(totalSupply);
        for (var i = 0; i < allNft.length; i++) {

          let colorStatusNft="bids-card-bottom-available-mint";

          if( i< numberNfTaken){
            let ownerOfNft = await contract.ownerOf(i+1);

            if(ownerOfNft === walletAdrEnableToAccordingRent)
              colorStatusNft="bids-card-bottom-available-rent";
            else
              colorStatusNft="bids-card-bottom-unavailable";
          }

          setNftToDisplay(oldArray => [...oldArray, <div className="card-column" key={i}>
          <div className="bids-card">
            <div className="bids-card-top">
              <img src={allNft[i].img} alt="" />
            <Link to={`/nft/`+allNft[i].id}>
            <p className="bids-title">{allNft[i].title}</p>
            </Link>
            </div>
            <div className={colorStatusNft}>
              <p>{allNft[i].price} <span>{allNft[i].token}</span></p>
              <p> <AiFillHeart /> {getRandomInt(100)}</p>
            </div>
          </div>
        </div>]);
        }
      }
      catch(err) {
        console.log(err);
        //setError(err.message);
      }
    }
  }

  useEffect(() => {
    getNumberTakenNft();
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  
  

  return (
    <div className='bids section__padding'>
      <div className="bids-container">
        <div className="bids-container-text">
          <h1>{title}</h1>
        </div>
        <div className="bids-container-card">
          {nftToDisplay}
        </div>
      </div>
      {more ?
        (<>
          <div className="load-more">
            <button>Load More</button>
          </div>
        </>):(
          <>
          <div className="bids-card-bottom ">
            <p>Legend :</p>
            <p className='legend-rent'><span className='legend-rent'>Can be Rent/Buy</span></p>
            <p className='legend-mint'><span className='legend-mint'>Can be Mint</span></p>
            <p><span>No Available</span></p>
          </div>
          </>
        )
      }

      
      
    </div>
  )
}

export default Bids
