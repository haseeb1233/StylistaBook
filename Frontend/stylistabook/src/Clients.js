import React from 'react';
import OwlCarousel from 'react-owl-carousel2';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

const Clients = () => {
  const options = {
    items: 3,
    loop: true,
    nav: true,
    dots: false,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    responsive: {
      0: {
        items: 1,
      },
      768: {
        items: 2,
      },
      992: {
        items: 3,
      },
    },
  };

  const clientsLogos = [
    'https://duruthemes.com/demo/html/belenava/demo3/img/clients/1.png',
    'https://duruthemes.com/demo/html/belenava/demo3/img/clients/2.png',
    'https://duruthemes.com/demo/html/belenava/demo3/img/clients/3.png',
    'https://duruthemes.com/demo/html/belenava/demo3/img/clients/4.png',
    'https://duruthemes.com/demo/html/belenava/demo3/img/clients/5.png',
    'https://duruthemes.com/demo/html/belenava/demo3/img/clients/6.png',
  ];

  return (
    <section className="clients">
      <div className="container">
        <div className="row">
          <div className="col-md-7">
            <OwlCarousel options={options}>
              {clientsLogos.map((logo, index) => (
                <div key={index} className="clients-logo">
                  <a href="#0">
                    <img src={logo} alt={`Client Logo ${index + 1}`} />
                  </a>
                </div>
              ))}
            </OwlCarousel>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Clients;
