import React from 'react'
import {textHeader} from "../../contract/global";
import './header.css'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import coin from '../../assets/coin.png'
const Header = () => {

  const displayHeader= textHeader; 
  return (
    <div className='header section__padding'>
      <div className="header-content">
        <div>
          <h1> { displayHeader }</h1>
          <img className='shake-vertical' src={coin} alt="" />
        </div>
      </div>
    </div>
  )
}

export default Header
