import React, { useState } from 'react';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

const BookNow = () => {
  const images = [
    'https://duruthemes.com/demo/html/belenava/demo3/img/gallery/1.jpg',
    'https://duruthemes.com/demo/html/belenava/demo3/img/gallery/2.jpg',
    'https://duruthemes.com/demo/html/belenava/demo3/img/gallery/3.jpg',
    'https://duruthemes.com/demo/html/belenava/demo3/img/gallery/4.jpg',
    'https://duruthemes.com/demo/html/belenava/demo3/img/gallery/5.jpg',
    'https://duruthemes.com/demo/html/belenava/demo3/img/gallery/6.jpg',
  ];

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  const openLightbox = (index) => {
    setLightboxOpen(true);
    setPhotoIndex(index);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  return (
    <section className="section-padding bg-cream">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="section-title">
              <span>Portfolio</span>
              <h2>Our Gallery</h2>
            </div>
          </div>
        </div>
        <div className="row">
          {images.map((image, index) => (
            <div key={index} className="col-md-4 gallery-item" onClick={() => openLightbox(index)}>
              <div className="gallery-box">
                <div className="gallery-img">
                  <img src={image} className="img-fluid mx-auto d-block" alt={`work-img-${index}`} />
                </div>
              </div>
            </div>
          ))}
        </div>
        {lightboxOpen && (
          <Lightbox
            mainSrc={images[photoIndex]}
            nextSrc={images[(photoIndex + 1) % images.length]}
            prevSrc={images[(photoIndex + images.length - 1) % images.length]}
            onCloseRequest={closeLightbox}
            onMovePrevRequest={() => setPhotoIndex((photoIndex + images.length - 1) % images.length)}
            onMoveNextRequest={() => setPhotoIndex((photoIndex + 1) % images.length)}
          />
        )}
      </div>
    </section>
  );
};

export default BookNow;
