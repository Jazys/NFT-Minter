import React from 'react'
import { story } from "../../contract/global";
import './story.css'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const Story = () => {

  const dataToDisplay=[];

  for (var i = 0; i < story.length; i++) {
    dataToDisplay.push( <div className="card" key={i}>
    <div className="info">
      <h3 className="title">{ story[i].title }</h3>
      <p className='txt'><span className='txt'>{ story[i].content }</span></p>
    </div>
  </div>);
  }

  return (
    <div>
      <div className="title-story">
      Our Story
      </div>  
      <div className="timeline">
        <div className="outer">
          {dataToDisplay} 
        </div>
      </div>
    </div>
  )
}

export default Story
