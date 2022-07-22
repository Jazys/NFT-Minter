import React from 'react'
import { story } from "../../contract/global";
import './story.css'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const Story = () => {

  const dataToDisplay=[];

  for (var i = 0; i < story.length; i++) {
    dataToDisplay.push( <div class="card" key={i}>
    <div class="info">
      <h3 class="title">{ story[i].title }</h3>
      <p>{ story[i].content }</p>
    </div>
  </div>);
  }

  return (
    <div>
      <div class="title-story">
      Our Story
      </div>  
      <div class="timeline">
        <div class="outer">
          {dataToDisplay} 
        </div>
      </div>
    </div>
  )
}

export default Story
