import React from 'react'
import "./Changepswd.css"
function Changepswd() {
  return (
    <div className='Changepswd'>
      <div className='btnsdiv'>
        <button className='btns'>Sign Up</button>
        <button style={{backgroundColor:"black",color:"white"}} className='btns'>Login</button>
      </div>
      <form className='loginform' action="">
        <input type="number" placeholder='Enter Otp' />
        <input type="password" placeholder='Password'/>
        <input type="password" placeholder='Confirm Password'/>
        <input id='submitformbtn' type="submit" value="Submit" />
      </form>
    </div>
  )
}

export default Changepswd
