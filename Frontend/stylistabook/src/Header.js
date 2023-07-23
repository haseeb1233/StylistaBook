import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Header = () => {
  return (
    <header className="header valign pos-pre bg-img parallaxie" style={{ backgroundImage: "url('img/header.jpg')" }}>
      <Container>
        <Row>
          <Col md={6} className="caption mt-60">
            <div className="o-hidden">
              <h1>Belen Ava <span>Makeup &amp; Hair Stylist</span></h1>
              <p>Hello, I’m Belen Ava! I love to help people feel beautiful, which is why I've spent the last 10 years immersed in doing makeup &amp; hair styling.</p>
              <div className="butn-dark mb-30 mt-30">
                <a href="about.html"><span>About Me</span></a>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </header>
  );
};

export default Header;
