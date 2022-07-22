import React from 'react'
import './mynft.css'
import { AiFillHeart} from "react-icons/ai";
import { Link } from 'react-router-dom';

const MyNft = () => {

  //look if we are connected

  //get balance of all nft for the contract

  //contruct table

  var mynft = [];
  for (var i = 0; i < 1; i++) {
    mynft.push( <div className="card-column" key={i}>
    <div className="bids-card">
      <div className="bids-card-top">
        <img src="" alt="" />
      <Link to={`/nft/123`}>
      <p className="bids-title">Abstact Smoke Red</p>
      </Link>
      </div>
      <div className="bids-card-bottom">
        <p>1.25 <span>ETH</span></p>
        <p> <AiFillHeart /> 92</p>
      </div>
    </div>
  </div>);
  }

  return (
    <div className='bids section__padding'>
      <div className="bids-container">
      { mynft }
      </div>
    </div>
  )
}

export default MyNft
