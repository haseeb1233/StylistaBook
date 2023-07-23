import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import logoo from "./logostylista.jpeg"
const Navbar1 = () => {
  return (
    <Navbar expand="lg" bg="light" variant="light">
      <Container>
        <Navbar.Brand href="#home">
          <img
            src={logoo}
            alt="Logo"
            className="logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarSupportedContent" />
        <Navbar.Collapse id="navbarSupportedContent">
          <Nav className="ml-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#about">About</Nav.Link>
            <Nav.Link href="#services">Services</Nav.Link>
            <Nav.Link href="#faqs">Faqs</Nav.Link>
            <Nav.Link href="#gallery">Gallery</Nav.Link>
            <Nav.Link href="#blog">Blog</Nav.Link>
            <Nav.Link href="#contact">Contact</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navbar1;
