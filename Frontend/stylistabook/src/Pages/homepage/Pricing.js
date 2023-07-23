import React from 'react';
import "./style1.css"
const Pricing = () => {
  return (
    <section className="pricing">
      <div
        className="background bg-img bg-fixed section-padding"
        data-overlay-dark="2"
        data-background="img/header.jpg"
        style={{ backgroundImage: 'url("img/header.jpg")' }}
      >
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="section-title text-center">
                <span>Our Pricing</span>
                <h2>Pricing Plan</h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-5">
              <div className="pricing-panel">
                <div className="pricing-content">
                  <h4 className="pricing-heading">Bridal Makeup</h4>
                  <div className="pricing-divider"></div>
                  <span className="price">₹200</span>
                </div>
                <p className="pricing-desc">Our stylist consults &amp; delivers you a precision bridal makeup.</p>
              </div>
            </div>
            <div className="col-md-5 offset-md-2">
              <div className="pricing-panel">
                <div className="pricing-content">
                  <h4 className="pricing-heading">Hair Makeup</h4>
                  <div className="pricing-divider"></div>
                  <span className="price">$50</span>
                </div>
                <p className="pricing-desc">Our stylist consults &amp; delivers you a precision hair makeup.</p>
              </div>
            </div>
            <div className="col-md-5">
              <div className="pricing-panel">
                <div className="pricing-content">
                  <h4 className="pricing-heading">Face Makeup</h4>
                  <div className="pricing-divider"></div>
                  <span className="price">$45</span>
                </div>
                <p className="pricing-desc">Our stylist consults &amp; delivers you a precision face makeup.</p>
              </div>
            </div>
            <div className="col-md-5 offset-md-2">
              <div className="pricing-panel">
                <div className="pricing-content">
                  <h4 className="pricing-heading">Event Makeup</h4>
                  <div className="pricing-divider"></div>
                  <span className="price">$100</span>
                </div>
                <p className="pricing-desc">Our stylist consults &amp; delivers you a precision event makeup.</p>
              </div>
            </div>
            <div className="col-md-5">
              <div className="pricing-panel">
                <div className="pricing-content">
                  <h4 className="pricing-heading">Hair Color</h4>
                  <div className="pricing-divider"></div>
                  <span className="price">$60</span>
                </div>
                <p className="pricing-desc">Our stylist consults &amp; delivers you a precision hair color.</p>
              </div>
            </div>
            <div className="col-md-5 offset-md-2">
              <div className="pricing-panel">
                <div className="pricing-content">
                  <h4 className="pricing-heading">Nails</h4>
                  <div className="pricing-divider"></div>
                  <span className="price">$70</span>
                </div>
                <p className="pricing-desc">Our stylist consults &amp; delivers you a precision nail service.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
