import React, { useRef, useState } from "react";
import "./Bookingdate.css";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar1 from "../../homepage/Navbar1";
function Bookingdate({
  handleBookClose,
  title,
  pricing,
  catname,
  duration,
  serviceId,
  StylistId,
}) {
  const closebtn = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("token") || null;
  console.log(token);
  const [booking, SetBooking] = useState({
    stylistId: StylistId,
    serviceId: serviceId,
    date: "",
    time: "",
    notes: "please arrive 10 min early",
  });
  const handleInput = (e) => {
    let { name, value } = e.target;
    SetBooking({
      ...booking,
      [name]: value,
    });
  };
  const handleBooking = async (e) => {
    try {
      const response = await fetch(
        "https://stylistabookbackend-production.up.railway.app/app/book/user",
        {
          method: "POST",
          body: JSON.stringify(booking),
          headers: {
            Authorization: `Bearer ${token}`,
            "content-type": "application/json",
          },
        }
      );

      let res = await response.json();
      if (res.error) {
        navigate("/login", { state: { from: location.pathname } });
      } else if (res.message) {
        closebtn.current.click();
        alert(res.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  console.log(booking);
  return (
    <>
      <div className="bookingdate">
        <div className="subbooking">
          <button
            ref={closebtn}
            className="closebooking"
            onClick={handleBookClose}
          >
            close
          </button>
          <h2>{title}</h2>
          <div className="selectdate">
            <div>
              <label htmlFor="">select date</label>
              <input type="date" name="date" onChange={handleInput} />
            </div>
            <div>
              <label htmlFor="">select time</label>
              <select name="time" onChange={handleInput} id="">
                <option value="">Select the time</option>
                <option value="9:00-10:00">9:00-10:00</option>
                <option value="10:00-11:00">10:00-11:00</option>
                <option value="2:00-3:00">2:00-3:00</option>
                <option value="3:00-4:00">3:00-4:00</option>
                <option value="4:00-6:00">4:00-6:00</option>
              </select>
            </div>
          </div>
          <div className="price">
            <p>{catname}</p>
            <div>
              <p>Duration:{duration}</p>
            </div>
          </div>
          <div className="totaldiv">
            <p className="total">Total:RS {pricing}</p>
            <button className="booknowbtn" onClick={handleBooking}>
              book now
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Bookingdate;
