import React,{useRef} from "react";
import "./Scrollimg.css";

function Scrollimg() {

  const containerRef = useRef(null);

  const handleScrollLeft = () => {
    containerRef.current.scrollLeft -= 200; // Adjust the scroll distance as needed
  };

  const handleScrollRight = () => {
    containerRef.current.scrollLeft += 200; // Adjust the scroll distance as needed
  };

  return (
    <div className="container">
      <div className="rowposters" ref={containerRef}>

      <div className='postersdiv'>
       <div className="reviewdiv">
       <p className="rating">4.9</p>
        <p className="noofreviews">135 reviews</p>
       </div>
      <img src="https://d2zdpiztbgorvt.cloudfront.net/region1/us/555774/biz_photo/2b78b57f45f840d8bb60392dd8315f-sotoallure-biz-photo-162ed2bcfc2d41ea96692336936c92-booksy.jpeg?size=640x427" alt="error" />
      <p className="titleshop">New Era Cuts</p>
      <p className="addressshop"> 3338 fairmount Ave, New era cuts, San Diego, 92105</p>
      </div>
      <div className='postersdiv'>
      <div className="reviewdiv">
       <p className="rating">5.0</p>
        <p className="noofreviews">73 reviews</p>
       </div>
      <img src="https://d2zdpiztbgorvt.cloudfront.net/region1/us/604035/biz_photo/ecbb8d2007804675b4fa413a90fe8a-salon-scorpio-biz-photo-d01a5dc499b94593a16395ec06ef75-booksy.jpeg?size=640x427" alt="error" />
      <p className="titleshop">Salon Scorpio</p>
      <p className="addressshop">535 university ave suite 1, San Diego, 92103</p>
      </div>
      <div className='postersdiv'>
      <div className="reviewdiv">
       <p className="rating">5.0</p>
        <p className="noofreviews">413 reviews</p>
       </div>
      <img src="https://d2zdpiztbgorvt.cloudfront.net/region1/us/441745/biz_photo/7bcbf5ed54a04300afe676c26181f5-omar-kingsmen-barber-lounge-biz-photo-e610d4cd481044398abcf631d44a54-booksy.jpeg?size=640x427" alt="error" />
      <p className="titleshop">Omar💈 Kingsmen Barber Lounge</p>
      <p className="addressshop"> 960 Lincoln Hwy, Schererville, 46375</p>
      </div>
      <div className='postersdiv'>
      <div className="reviewdiv">
       <p className="rating">5.0</p>
        <p className="noofreviews">35 reviews</p>
       </div>
      <img src="https://d2zdpiztbgorvt.cloudfront.net/region1/us/772210/biz_photo/3ec7eea1220f48e3b3554a692ad6c2-jen-candelaria-at-salon-savoir-biz-photo-8d85c6cd5b004b678b04e3b480092a-booksy.jpeg?size=640x427" alt="error" />
      <p className="titleshop">Jen Candelaria Stylist at Salon</p>
      <p className="addressshop">3690 5th Ave, San Diego, 92103</p>
      </div>
      <div className='postersdiv'>
      <div className="reviewdiv">
       <p className="rating">5.0</p>
        <p className="noofreviews">11 reviews</p>
       </div>
      <img src="https://d2zdpiztbgorvt.cloudfront.net/region1/us/441682/biz_photo/8d88287550c84086b20b2eebed77fd-hair-by-rebecka-biz-photo-da2fcfa9f9264c17bcc57edd37530f-booksy.jpeg?size=640x427" alt="error" />
      <p className="titleshop">Hair by Rebacka</p>
      <p className="addressshop"> 3338 fairmount Ave, New era cuts, San Diego, 92105</p>
      </div>
      <div className='postersdiv'>
      <div className="reviewdiv">
       <p className="rating">4.9</p>
        <p className="noofreviews">135 reviews</p>
       </div>
      <img src="https://static.booksy.com/static/live/covers/hair_salons.jpg" alt="error" />
      <p className="titleshop">Glare Beauty</p>
      <p className="addressshop"> 3338 fairmount Ave, New era cuts, San Diego, 92105</p>
      </div>
      </div>
    </div>
  );
}

export default Scrollimg;
