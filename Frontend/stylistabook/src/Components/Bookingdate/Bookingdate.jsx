import React,{useState} from 'react'
import "./Bookingdate.css"
function Bookingdate({handleBookClose,title,pricing,catname,duration,serviceId,StylistId}) {
     const[booking,SetBooking]=useState({stylistId:"", serviceId:"", date:"", time:"", notes:""})
  const handleBooking= async(e)=>{
    try {
      const response = await fetch("https://stylistabookbackend-production.up.railway.app/app//book/user",{
             method:"POST",
             body:JSON.stringify(stylistUser),
             headers:{
              "content-type":"application/json"
             }
      })
      
       let res = await response.json()
       console.log(res)
        console.log(res.message)
      if(res){
       alert(res.message)
       if (res.message=="Stylist registered successfully. Please check your email for the OTP."){
          nav("./login")
       }
  
      }else{
        alert(res.message)
      }
  
    } catch (error) {
      console.log(error)
    }
   }


  return (
    <div className='bookingdate'>
       <div className='subbooking' >
       <button className='closebooking' onClick={handleBookClose}>close</button>
        <h2>{title}</h2>
        <div className='selectdate'>
            <div>
            <label htmlFor="">select date</label>
           <input type="date" onChange={} />
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
            <p>{catname}</p>
            <div>
            <p>RS {pricing}</p>
            <p>Duration:{duration}</p>
            </div>
        </div>
        <div className='totaldiv'>
            <p className='total'>Total:RS {pricing}</p>
            <button className='booknowbtn' onClick={}>book now</button>
        </div>
       </div>
    </div>
  )
}

export default Bookingdate
