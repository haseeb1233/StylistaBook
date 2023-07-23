import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ills from "./illustrator.jpg";
import "./style1.css"
const Header = () => {
  return (
    <header className="header valign pos-pre bg-img parallaxie" style={{ backgroundImage: "url('img/header.jpg')" }}>
      <Container>
        <Row>
          <Col md={6} className="caption mt-60">
            <div className="o-hidden">
              <h1>Stylista Book <span>Makeup &amp; Hair Stylist</span></h1>
              <p>Hello, we! love to help people feel beautiful, which is why we've spent the last 10 years immersed in doing makeup &amp; hair styling.</p>
              <div className="butn-dark mb-30 mt-30">
                <a href="about.html"><span>About Me</span></a>
              </div>
            </div>
          </Col>
          <div className='illus'>
            <img  src={ills}/>
          </div>
        </Row>
      </Container>
    </header>
  );
};

export default Header;
