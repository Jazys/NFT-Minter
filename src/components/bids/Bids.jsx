import React from 'react'
import './bids.css'
import { AiFillHeart} from "react-icons/ai";
import { Link } from 'react-router-dom';
import { allNft } from '../../contract/global';

const Bids = ({title, more}) => {

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  const nftToDisplay = [];
  for (var i = 0; i < allNft.length; i++) {
    nftToDisplay.push( <div className="card-column" >
    <div className="bids-card">
      <div className="bids-card-top">
        <img src={allNft[i].img} alt="" />
      <Link to={`/nft/`+allNft[i].id}>
      <p className="bids-title">{allNft[i].title}</p>
      </Link>
      </div>
      <div className="bids-card-bottom">
        <p>{allNft[i].price} <span>{allNft[i].token}</span></p>
        <p> <AiFillHeart /> {getRandomInt(100)}</p>
      </div>
    </div>
  </div>);
  }

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
        <></>
      )
    }
      
    </div>
  )
}

export default Bids
