import React from 'react'
import "./Login.css"

function Login() {
  return (
    <div className='login'>
      <div className='btnsdiv'>
        <button className='btns'>Sign Up</button>
        <button style={{backgroundColor:"black",color:"white"}} className='btns'>Login</button>
      </div>
      <form className='loginform' action="">
        <input type="email" placeholder='Enter Email' />
        <input type="password" placeholder='Password'/>
        <input id='submitformbtn' type="submit" value="Log In" />
      </form>
      <div className='parttwo'>
     <div id='frgtpswd'>
     <p >Forgot password</p>
     </div>
      <p id='or'>or</p>
      <button className='googleauth'>
        <img src="https://ragsdalemartin.com/wp-content/uploads/2020/07/white-google-logo.png" alt="googlelogo" />
        <p>Continue With Google </p>
      </button>
      </div>
    </div>
  )
}

export default Login
