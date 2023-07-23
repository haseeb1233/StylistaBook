import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const Services = () => {
  return (
    <section className="services section-padding bg-cream">
      <div className="container">
        <div className="row">
          <div className="col-md-8 mb-30">
            <div className="section-title">
              <span>What We Do</span>
              <h2>Services</h2>
              <p>
                Our main services face makeup, eyebrow makeup, haircut makeup, facial makeup, dressing table, bride
                makeup, wedding makeup, effect makeup, occasion makeup, etc.
              </p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <Carousel showArrows={true} showThumbs={false} showStatus={false} infiniteLoop={true}>
              <div>
                <img src="https://duruthemes.com/demo/html/belenava/demo3/img/services/male-makeup.jpg" alt="Male Makeup" />
                <p className="legend">Male Makeup</p>
              </div>
              <div>
                <img src="https://duruthemes.com/demo/html/belenava/demo3/img/services/effect-makeup.jpg" alt="Effect Makeup" />
                <p className="legend">Effect Makeup</p>
              </div>
              <div>
                <img src="https://duruthemes.com/demo/html/belenava/demo3/img/services/eye-makeup.jpg" alt="Occasion Makeup" />
                <p className="legend">Occasion Makeup</p>
              </div>
              <div>
                <img src="https://duruthemes.com/demo/html/belenava/demo3/img/services/wedding-makeup.jpg" alt="Bridal Makeup" />
                <p className="legend">Bridal Makeup</p>
              </div>
              <div>
                <img src="https://duruthemes.com/demo/html/belenava/demo3/img/services/hair-makeup.jpg" alt="Hair Makeup" />
                <p className="legend">Hair Makeup</p>
              </div>
              <div>
                <img src="https://duruthemes.com/demo/html/belenava/demo3/img/services/face-makeup.jpg" alt="Face & Eye Makeup" />
                <p className="legend">Face & Eye Makeup</p>
              </div>
            </Carousel>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
