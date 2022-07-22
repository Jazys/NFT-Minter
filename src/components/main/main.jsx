import React from 'react'
import './main.css'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { main } from "../../contract/global";

const Main = () => {

  const dataToDisplay=[];

  for (var i = 0; i < main.length; i++) {

    if(main[i].position===1){
      dataToDisplay.push(
          <div class="row main-card" key={i}>
            <div class="column-left">
            <img src={main[i].img} alt=""/>
            </div>
            <div>
            <h2 class="title-main">{main[i].title}</h2>  
            <p class="main-card-text">{main[i].content}</p>
            </div>
          </div>
      );
    }else{
      dataToDisplay.push(
          <div class="row main-card" key={i}>
            <div class="column-right">
            <h2 class="title-main">{main[i].title}</h2>  
            <p class="main-card-text">{main[i].content}</p>
            </div>
            <div>
            <img src={main[i].img} alt="" />
            </div>
          </div>);
    }

   
  }

  
  return (
    <div>
      {dataToDisplay}      
    </div>
  )
}

export default Main
