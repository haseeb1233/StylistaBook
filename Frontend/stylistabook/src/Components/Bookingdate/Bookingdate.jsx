import React from 'react'
import "./Bookingdate.css"
function Bookingdate({handleBookClose,title}) {
  return (
    <div className='bookingdate'>
       <div className='subbooking' >
       <button className='closebooking' onClick={handleBookClose}>close</button>
        <h2>{title}</h2>
        <div className='selectdate'>
            <div>
            <label htmlFor="">select date</label>
           <input type="date" />
            </div>
           <div>
           <label htmlFor="">select time</label>
           <select name="" id="">
            <option value="">9:00-10:00</option>
            <option value="">10:00-11:00</option>
            <option value="">2:00-3:00</option>
            <option value="">3:00-4:00</option>
            <option value="">4:00-6:00</option>
           </select>
           </div>
        </div>
        <div className='price'>
            <p>Hair cut</p>
            <div>
            <p>Rs 500</p>
            <p>Duration</p>
            </div>
        </div>
        <div className='totaldiv'>
            <p className='total'>Total:RS 500</p>
            <button className='booknowbtn'>book now</button>
        </div>
       </div>
    </div>
  )
}

export default Bookingdate
