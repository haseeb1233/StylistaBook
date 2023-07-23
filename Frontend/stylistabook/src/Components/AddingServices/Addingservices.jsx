import React from 'react'
import "./Addingservices.css"
function Addingservices() {
  return (
    <div>
       <div className='stylistsignup'>
      <div className='btnsdiv'>
        <button style={{backgroundColor:"black",color:"white"}} className='btns'>Close</button>
      </div>
      <form className='stylistform' action="">
        <input type="text" placeholder='Name' />
        <input type="text" placeholder='Description'/>
        <input type="number" placeholder='Duration'/>
        <input type="number" placeholder='price'/>
        <input type="text" placeholder='Enter image url'/>
        <input type="text" placeholder='Category'/>
        <input id='submitformbtn' type="submit" value="ADD SERVICE" />
      </form>
    </div>
    </div>
  )
}

export default Addingservices
