import React from 'react'
import "./Forgotpswd.css"
function Forgotpswd() {
  return (
    <div className='forgotpswd'>
       <div>
        <button className='btns'>Sign Up</button>
        <button style={{backgroundColor:"black",color:"white"}} className='btns'>Login</button>
      </div>
      <form className='loginform' action="">
        <label htmlFor="">Enter your email to reset password</label>
        <input type="email" placeholder='Enter Email' />
        <input id='submitformbtn' type="submit" value="Submit" />
      </form>
    </div>
  )
}

export default Forgotpswd
