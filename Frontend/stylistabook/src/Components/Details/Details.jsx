import React, { useState, useRef, useEffect } from "react";
import "./Details.css";
import Bookingdate from "../Bookingdate/Bookingdate";
import { useLocation, useParams } from "react-router-dom";
import Navbar1 from "../../homepage/Navbar1";
import Footer from "../../homepage/Footer";
function Details() {
  let param = useLocation();
  console.log("000000000000000000000000000000000000000000", param);
  const [showBook, setShowBook] = useState(false);
  const [pricing, SetPricing] = useState("");
  const [catname, SetCatname] = useState("");
  const [duration, Setduration] = useState("");
  const [stylistDetail, setStylistdetails] = useState([{}]);
  const [title, setTitle] = useState("");
  const titleRef = useRef(null);
  let params = useParams();
  params = params.id.split("-");
  const serviceId = params[0];
  const StylistId = params[1];
  const salonName = params[2];
  const FetchStylist = async () => {
    try {
      let response = await fetch(
        `https://stylistabookbackend-production.up.railway.app/service/my/${StylistId}`
      );
      response = await response.json();
      setStylistdetails(response);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    FetchStylist();
  }, []);
  console.log(stylistDetail);
  const handleBookClose = () => {
    setShowBook(false);
  };
  return (
    <div>
      <Navbar1 />
      {showBook && (
        <Bookingdate
          handleBookClose={handleBookClose}
          title={title}
          pricing={pricing}
          catname={catname}
          duration={duration}
          StylistId={StylistId}
          serviceId={serviceId}
        />
      )}
      <div className="detailsposters">
        <div className="detailsdiv">
          <div className="reviewdiv">
            <p className="rating">4.9</p>
            <p className="noofreviews">135 reviews</p>
          </div>
          <img src={stylistDetail[0].image} alt="error" />
          <p className="titleshop" ref={titleRef}>
            {salonName}
          </p>
          <p className="addressshop">
            {" "}
            3338 fairmount Ave, New era cuts, San Diego, 92105
          </p>
          <p className="service">Services</p>
          {stylistDetail.map((ele, index) => (
            <div key={ele._id} className="bookmain">
              <p className="servicetitle">{ele.name}</p>
              <div className="booksub">
                <p>RS{ele.pricing}</p>
                <button
                  className="bookbtn"
                  onClick={() => {
                    setTitle(titleRef.current.innerText);
                    SetPricing(ele.pricing);
                    SetCatname(ele.name);
                    Setduration(ele.duration);
                    setShowBook(true);
                    console.log(title);
                  }}
                >
                  Book
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="bookingdetails">
          <div className="aboutusdiv">
            <h2>About us</h2>
            <p>{stylistDetail[0].description}</p>
          </div>
          <div className="businesshours">
            <p className="businesstitle">CONTACT & BUSINESS HOURS </p>
            <div className="call">
              <p>(619) 693-8433</p>
              <button>Call</button>
            </div>
            <div className="date">
              <p>Sunday</p>
              <p>11.00AM-7.00PM</p>
            </div>
            <div className="date">
              <p>Monday</p>
              <p>11.00AM-7.00PM</p>
            </div>
            <div className="date">
              <p>Tuesday</p>
              <p>11.00AM-7.00PM</p>
            </div>
            <div className="date">
              <p>Wednesday</p>
              <p>11.00AM-7.00PM</p>
            </div>
            <div className="date">
              <p>Thursday</p>
              <p>11.00AM-7.00PM</p>
            </div>
            <div className="date">
              <p>Friday</p>
              <p>11.00AM-7.00PM</p>
            </div>
            <div className="date">
              <p>Saturday</p>
              <p>11.00AM-7.00PM</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Details;
