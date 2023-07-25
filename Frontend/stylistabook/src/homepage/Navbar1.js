import React from "react";

import { Navbar, Nav, Container } from "react-bootstrap";
import logoo from "./logostylista.jpeg";
import { Link, useNavigate } from "react-router-dom";
const Navbar1 = ({ setSerrch }) => {
  let googletoken = window.location.href.split("?t=")[1];

  if (googletoken) {
    localStorage.setItem("token", googletoken);
  }

  console.log(googletoken);
  let token = localStorage.getItem("token") || null;
  console.log(token);
  let navigate = useNavigate();
  return (
    <Navbar expand="lg" bg="light" variant="light">
      <Container>
        <Navbar.Brand to="#home">
          <img src={logoo} alt="Logo" className="logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarSupportedContent" />
        <Navbar.Collapse id="navbarSupportedContent">
          <Nav className="ml-auto">
            <Nav.Link>
              <Link to={"/saloon?q=hair"}>Hair Salon</Link>
            </Nav.Link>

            <Nav.Link>
              <Link to={"/saloon?q=nail"}>Nails Salon</Link>
            </Nav.Link>

            <Link>
              <Nav.Link to="/signup">
                <button
                  onClick={() => {
                    navigate("/signup");
                  }}
                  style={{ padding: "6px 10px", borderRadius: "4px" }}
                >
                  Start Your Business
                </button>
              </Nav.Link>
            </Link>
            {!token && (
              <Link>
                <Nav.Link to="/login">
                  <button
                    onClick={() => {
                      navigate("/login");
                    }}
                    style={{ padding: "6px 10px", borderRadius: "4px" }}
                  >
                    Login
                  </button>{" "}
                </Nav.Link>
              </Link>
            )}
            {!token && (
              <Link>
                <Nav.Link to="/client">
                  <button
                    onClick={() => {
                      navigate("/client");
                    }}
                    style={{ padding: "6px 10px", borderRadius: "4px" }}
                  >
                    Signup
                  </button>{" "}
                </Nav.Link>
              </Link>
            )}
            {token && (
              <Link>
                <Nav.Link to="/">
                  <button
                    onClick={() => {
                      localStorage.clear();
                      navigate("/");
                    }}
                    style={{ padding: "6px 10px", borderRadius: "4px" }}
                  >
                    Logout
                  </button>
                </Nav.Link>
              </Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navbar1;
