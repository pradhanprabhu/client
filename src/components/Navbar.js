import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Navbar as BootstrapNavbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import '../components/Navbar.css';

function Navbar() {
  const location = useLocation(); // Get the current path

  // Function to check if a link is active
  const isActive = (path) => location.pathname === path;

  return (
    <>
      <BootstrapNavbar bg="dark" variant="dark" expand="lg" className="shadow-sm w-100">
        <Container fluid>
          <BootstrapNavbar.Brand as={Link} to="/" className="text-light fw-bold d-flex align-items-center">
            <img 
              src="https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" 
              alt="Luxury Hotel Room" 
              className="navbar-logo"
            />
            <span className="brand-text ms-2">Nepalese Hotel</span>
          </BootstrapNavbar.Brand>
          <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
          <BootstrapNavbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link 
                as={Link} 
                to="/" 
                className={`nav-link-custom ${isActive("/") ? "active-link" : ""}`}
              >
                Home
              </Nav.Link>
              <Nav.Link 
                as={Link} 
                to="/rooms" 
                className={`nav-link-custom ${isActive("/rooms") ? "active-link" : ""}`}
              >
                Rooms
              </Nav.Link>
              <Nav.Link 
                as={Link} 
                to="/places" 
                className={`nav-link-custom ${isActive("/places") ? "active-link" : ""}`}
              >
                Places
              </Nav.Link>
              <Nav.Link 
                as={Link} 
                to="/aboutus" 
                className={`nav-link-custom ${isActive("/aboutus") ? "active-link" : ""}`}
              >
                About Us
              </Nav.Link>
              <Nav.Link 
                as={Link} 
                to="/contactus" 
                className={`nav-link-custom ${isActive("/contactus") ? "active-link" : ""}`}
              >
                Contact Us
              </Nav.Link>
              <Nav.Link 
                as={Link} 
                to="/terms" 
                className={`nav-link-custom ${isActive("/terms") ? "active-link" : ""}`}
              >
                Terms & Conditions
              </Nav.Link>
              <NavDropdown 
                title={<span className="nav-link-custom">👤 Account</span>} 
                id="basic-nav-dropdown"
                align="end"
              >
                <NavDropdown.Item as={Link} to="/login" className="dropdown-item">
                  Login
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/register" className="dropdown-item">
                  Register
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </BootstrapNavbar.Collapse>
        </Container>
      </BootstrapNavbar>
    </>
  );
}

export default Navbar;
