import React from 'react';
import './login.css'
import {Link} from 'react-router-dom'
const Login = (props) => {

  console.log(props);


  return (
    <div className='login section__padding'>
      <div className="login-container">
        <h1>Login</h1>
        <div className='login-writeForm'>
          <div className="login-formGroup">
            <label>Username</label>
            <input type="text" placeholder='Username'  />
          </div>
          <div className="login-formGroup">
            <label>Password</label>
            <input type="password" placeholder='Password'  />
          </div>
          
         <div className="login-button">
          <button className='login-writeButton' onClick={props.connect}>Login</button>
          <Link to="/register">
            <button className='login-reg-writeButton' type='submit'>Register</button>
          </Link>
         </div>
        </div>
      </div>
    </div>
   )
};

export default Login;
