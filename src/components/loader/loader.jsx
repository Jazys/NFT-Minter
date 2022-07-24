import React from 'react'
import './loader.css'

const Loader = (props) => {

  return (
    <div className="row">
     <div className="column loader"> </div>
     <div className='column msg'>{ props.msg }</div>
    </div>
    
  )
}

export default Loader
