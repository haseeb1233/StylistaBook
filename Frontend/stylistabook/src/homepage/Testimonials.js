import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import "./style1.css"
const Testimonials = () => {
  const options = {
    items: 1,
    loop: true,
    nav: false,
    dots: true,
    autoplay: true,
    autoplayTimeout: 5000,
    autoplayHoverPause: true,
    responsive: {
      0: {
        items: 1,
      },
      768: {
        items: 2,
      },
    },
  };

  const testimonialsData = [
    {
      name: 'Faye Neera',
      role: 'Bride',
      content:
        'Amazing place to find a bridal hair & makeup artist. So easy to use and found one the 1st day, after making an enquiry. Brilliant service and lots of useful info for brides to be. Thank you!',
      image: 'https://duruthemes.com/demo/html/belenava/demo3/img/team/t1.png',
    },
    // Add more testimonial objects as needed
  ];

  return (
    <section className="testimonials">
      <div className="background bg-img bg-fixed section-padding pb-0">
        <div className="container">
          <div className="row">
            {/* Promo video */}
            <div className="col-md-6">
              <div className="vid-area">
                {/* Your video player code goes here */}
              </div>
            </div>
            {/* Testimonials */}
            <div className="col-md-5 offset-md-1">
              <div className="testimonials-box animate-box" data-animate-effect="fadeInUp">
                <div className="head-box">
                  <h4>Kind words</h4>
                </div>
                <Carousel options={options}>
                  {testimonialsData.map((testimonial, index) => (
                    <div key={index} className="item">
                      <span className="quote">
                        <img src="https://duruthemes.com/demo/html/belenava/demo3/img/quot.png" alt="" />
                      </span>
                      <p>{testimonial.content}</p>
                      <div className="info">
                        <div className="author-img">
                          <img src={testimonial.image} alt="" />
                        </div>
                        <div className="cont">
                          <h6>{testimonial.name}</h6> <span>{testimonial.role}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </Carousel>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
