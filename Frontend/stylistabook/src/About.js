// About.js
import React from 'react';
import './About.css';

const About = () => {
  return (
    <section className="about section-padding">
      <div className="container">
        <div className="row">
          <div className="col-md-6 mb-30">
            <div className="section-title">
              <span>Makeup Artist</span>
              <h2>Belen Ava</h2>
            </div>
            <p>Hello, I’m Belen Ava! I love making people feel beautiful, and I have spent the last 10 years immersed in the world of Makeup &amp; Hair Styling.</p>
            <p className="mb-60">Makeup viverra tristique justo duis vitae diam neque nivamus aestan ateuene artines aringianu atelit finibus viverra nec lacus. Nedana theme erodino setlie suscipe no curabi elit finibus viverra nec a lacus themo the drudea seneoice misuscipit non sagie the fermen.</p>
            <div className="row">
              <div className="col-md-6 mb-30">
                <div className="about-img">
                  <div className="img">
                    <img src="https://duruthemes.com/demo/html/belenava/demo3/img/about3.jpg" className="img-fluid" alt="" />
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="about-img">
                  <div className="img">
                    <img src="https://duruthemes.com/demo/html/belenava/demo3/img/about2.jpg" className="img-fluid" alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-5 offset-md-1">
            <div className="about-img">
              <div className="img">
                <img src="https://duruthemes.com/demo/html/belenava/demo3/img/about.jpg" className="img-fluid" alt="" />
              </div>
              <div className="about-img-2 about-buro">Belen Ava / Makeup Artist</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
