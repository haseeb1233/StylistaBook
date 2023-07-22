import React from 'react'
import "./Details.css"
function Details() {
  return (
    <div>
      <div className='detailsposters'>
      <div className='detailsdiv'>
       <div className="reviewdiv">
       <p className="rating">4.9</p>
        <p className="noofreviews">135 reviews</p>
       </div>
      <img src="https://d2zdpiztbgorvt.cloudfront.net/region1/us/555774/biz_photo/2b78b57f45f840d8bb60392dd8315f-sotoallure-biz-photo-162ed2bcfc2d41ea96692336936c92-booksy.jpeg?size=640x427" alt="error" />
      <p className="titleshop">New Era Cuts</p>
      <p className="addressshop"> 3338 fairmount Ave, New era cuts, San Diego, 92105</p>
      <p className='service'>Services</p>
      <div className='bookmain'>
            <p className='servicetitle'>Hair Cut</p>
            <div className='booksub'>
                <p>RS 500</p>
                <button className='bookbtn'>Book</button>
            </div>
        </div>
        <div className='bookmain'>
            <p className='servicetitle'>Hair Cut</p>
            <div className='booksub'>
                <p>RS 500</p>
                <button className='bookbtn'>Book</button>
            </div>
        </div>
        <div className='bookmain'>
            <p className='servicetitle'>Hair Cut</p>
            <div className='booksub'>
                <p>RS 500</p>
                <button className='bookbtn'>Book</button>
            </div>
        </div>
      </div>
      <div className='bookingdetails'>
        <div className='aboutusdiv'>
        <h2>About us</h2>
        <p>Love Your hair,Love yourself</p>
        </div>
        <div className='businesshours'>
            <p className='businesstitle'>CONTACT & BUSINESS HOURS </p>
            <div className='call'>
                <p>(619) 693-8433</p>
                <button>Call</button>
            </div >
            <div className='date'>
                <p>Sunday</p>
                <p>11.00AM-7.00PM</p>
            </div >
            <div className='date'>
                <p>Monday</p>
                <p>11.00AM-7.00PM</p>
            </div>
            <div className='date'>
                <p>Tuesday</p>
                <p>11.00AM-7.00PM</p>
            </div>
            <div className='date'>
                <p>Wednesday</p>
                <p>11.00AM-7.00PM</p>
            </div>
            <div className='date'>
                <p>Thursday</p>
                <p>11.00AM-7.00PM</p>
            </div>
            <div className='date'>
                <p>Friday</p>
                <p>11.00AM-7.00PM</p>
            </div>
            <div className='date'>
                <p>Saturday</p>
                <p>11.00AM-7.00PM</p>
            </div>
        </div>
      </div>
      </div>
    </div>
  )
}

export default Details
