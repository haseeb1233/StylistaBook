// import React from 'react';
// import { Carousel } from 'react-responsive-carousel';
// import 'react-responsive-carousel/lib/styles/carousel.min.css';
// import "./style.css"
// const Services = () => {
//   return (
//     <section className="services section-padding bg-cream">
//       <div className="container">
//         <div className="row">
//           <div className="col-md-8 mb-30">
//             <div className="section-title">
//               <span>What We Do</span>
//               <h2>Services</h2>
//               <p>
//                 Our main services face makeup, eyebrow makeup, haircut makeup, facial makeup, dressing table, bride
//                 makeup, wedding makeup, effect makeup, occasion makeup, etc.
//               </p>
//             </div>
//           </div>
//         </div>
//         <div className="row">
//           <div className="col-md-6">
//             <Carousel showArrows={true} showThumbs={false} showStatus={false} infiniteLoop={true}>
//               <div>
//                 <img src="https://duruthemes.com/demo/html/belenava/demo3/img/services/male-makeup.jpg" alt="Male Makeup" />
//                 <p className="legend">Male Makeup</p>
//               </div>
//               <div>
//                 <img src="https://duruthemes.com/demo/html/belenava/demo3/img/services/effect-makeup.jpg" alt="Effect Makeup" />
//                 <p className="legend">Effect Makeup</p>
//               </div>
//               <div>
//                 <img src="https://duruthemes.com/demo/html/belenava/demo3/img/services/eye-makeup.jpg" alt="Occasion Makeup" />
//                 <p className="legend">Occasion Makeup</p>
//               </div>
//               <div>
//                 <img src="https://duruthemes.com/demo/html/belenava/demo3/img/services/wedding-makeup.jpg" alt="Bridal Makeup" />
//                 <p className="legend">Bridal Makeup</p>
//               </div>
//               <div>
//                 <img src="https://duruthemes.com/demo/html/belenava/demo3/img/services/hair-makeup.jpg" alt="Hair Makeup" />
//                 <p className="legend">Hair Makeup</p>
//               </div>
//               <div>
//                 <img src="https://duruthemes.com/demo/html/belenava/demo3/img/services/face-makeup.jpg" alt="Face & Eye Makeup" />
//                 <p className="legend">Face & Eye Makeup</p>
//               </div>
//             </Carousel>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Services;


import React from 'react';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Services = () => {
  const servicesData = [
    // Add your services data here
    {
      title: 'Bridal Makeup',
      imageUrl: 'https://d2zdpiztbgorvt.cloudfront.net/region1/us/441745/biz_photo/7bcbf5ed54a04300afe676c26181f5-omar-kingsmen-barber-lounge-biz-photo-e610d4cd481044398abcf631d44a54-booksy.jpeg?size=640x427',
      link: 'makeup-bridal.html',
    },
    {
      title: 'Bridal Makeup',
      imageUrl: 'https://d2zdpiztbgorvt.cloudfront.net/region1/us/396863/biz_photo/9954152d32c34d61be55bf53ac30e0-manny-de-barber-biz-photo-af96c388e36945369d503d159e0a56-booksy.jpeg?size=640x427',
      link: 'makeup-bridal.html',
    },
    {
      title: 'Bridal Makeup',
      imageUrl: 'https://d2zdpiztbgorvt.cloudfront.net/us/81100/3528f2d667e143c0b8f263f98a7838de-GetRightWithAnt-biz-photo.PNG?size=640x427',
      link: 'makeup-bridal.html',
    },
    {
      title: 'Bridal Makeup',
      imageUrl: 'https://d2zdpiztbgorvt.cloudfront.net/region1/us/398145/biz_photo/b8cfe258101b43e79420c880575c60-yoko-dapper-cuts-biz-photo-7cf47094bafc46f286302d06fb4a5d-booksy.jpeg?size=640x427',
      link: 'makeup-bridal.html',
    },
    {
      title: 'Bridal Makeup',
      imageUrl: 'https://d2zdpiztbgorvt.cloudfront.net/region1/us/800297/biz_photo/423dc5a2873f4d89aaf13fc67acbbf-supercleancutz-biz-photo-2206e30fd41142c581d6cedcc73323-booksy.jpeg?size=640x427',
      link: 'makeup-bridal.html',
    },
    {
      title: 'Bridal Makeup',
      imageUrl: 'https://d2zdpiztbgorvt.cloudfront.net/region1/us/800297/biz_photo/423dc5a2873f4d89aaf13fc67acbbf-supercleancutz-biz-photo-2206e30fd41142c581d6cedcc73323-booksy.jpeg?size=640x427',
      link: 'makeup-bridal.html',
    },
    // Add more services data
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <section className="services section-padding bg-cream">
      <div className="container">
        <div className="row">
          <div className="col-lg-8 col-md-10 mx-auto">
            <div className="section-title">
              <span>What We Do</span>
              <h2>Services</h2>
              <p>
                Our main services face makeup, eyebrow makeup, haircut makeup, facial makeup, dressing table, bride makeup,
                wedding makeup, effect makeup, occasion makeup, etc.
              </p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <Slider {...settings}>
              {servicesData.map((service, index) => (
                <div className="services-con" key={index}>
                  <a href={service.link}>
                    <div className="services-title">
                      <h4>{service.title}</h4>
                    </div>
                    <img src={service.imageUrl} alt={service.title} />
                  </a>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
