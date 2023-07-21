import React from 'react'
import "./Stylist.css"

function Stylist() {
  return (
    <div className='stylistsignup'>
      <div className='btnsdiv'>
        <button style={{backgroundColor:"black",color:"white"}} className='btns'>Sign Up</button>
        <button  className='btns'>Login</button>
      </div>
      <form className='stylistform' action="">
        <input type="text" placeholder='First name' />
        <input type="text" placeholder='Last name' />
        <input type="email" placeholder='Enter Email' />
        <input type="password" placeholder='Password'/>
        <input id='submitformbtn' type="submit" value="Create Account" />
      </form>
    </div>
  )
}

export default Stylist
