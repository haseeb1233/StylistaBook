import React from 'react'
import "./Signup.css"
function Signup() {
  return (
    <div className='signup'>
       <div className='btnsdiv'>
        <button style={{backgroundColor:"black",color:"white"}} className='btns'>Sign Up</button>
        <button  className='btns'>Login</button>
      </div>

      <div>
        <div className='signuppart'>
           <h2>Sign Up for StylistaBook</h2>
        </div>
        <button className='signupselect'>
        <p>SIGNUP AS A CLIENT </p>
      </button>
        <p id='or'>or</p>
        <button className='signupselect'>
        <p>SET UP MY BUSINESS </p>
      </button>
      </div>
    </div>
  )
}

export default Signup
