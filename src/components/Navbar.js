import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Navbar as BootstrapNavbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import '../components/Navbar.css';

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const loadUserInfo = () => {
      const storedUserInfo = localStorage.getItem('userInfo');
      if (storedUserInfo) {
        try {
          const parsedUserInfo = JSON.parse(storedUserInfo);
          console.log('Loaded user info:', parsedUserInfo); // Debug log
          setUserInfo(parsedUserInfo);
        } catch (error) {
          console.error('Error parsing user info:', error);
          localStorage.removeItem('userInfo');
          setUserInfo(null);
        }
      }
    };

    // Load user info initially
    loadUserInfo();

    // Add event listener for storage changes
    window.addEventListener('storage', loadUserInfo);

    // Cleanup
    return () => {
      window.removeEventListener('storage', loadUserInfo);
    };
  }, [location]); // Add location as dependency to update when route changes

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    setUserInfo(null);
    navigate('/login');
  };

  // Function to check if a link is active
  const isActive = (path) => location.pathname === path;

  return (
    <>
      <BootstrapNavbar bg="dark" variant="dark" expand="lg" className="shadow-sm w-100">
        <Container fluid>
          <BootstrapNavbar.Brand as={Link} to="/" className="text-light fw-bold d-flex align-items-center">
            <img 
              src="https://res.cloudinary.com/dpblvtdry/image/upload/v1744516929/ChatGPT_Image_Apr_13_2025_12_19_11_AM_x4etuz.png" 
              alt="Luxury Hotel Room" 
              className="navbar-logo"
            />
            <span className="brand-text ms-2">Nepalese Hotel</span>
          </BootstrapNavbar.Brand>
          <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
          <BootstrapNavbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {!(userInfo && userInfo.isAdmin) && (
                <Nav.Link 
                  as={Link} 
                  to="/" 
                  className={`nav-link-custom ${isActive("/") ? "active-link" : ""}`}
                >
                  Home
                </Nav.Link>
              )}
              {!(userInfo && userInfo.isAdmin) && (
                <>
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
                    to="/terms" 
                    className={`nav-link-custom ${isActive("/terms") ? "active-link" : ""}`}
                  >
                    Terms & Conditions
                  </Nav.Link>
                </>
              )}
              {!(userInfo && userInfo.isAdmin) && (
                <>
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
                </>
              )}
              {userInfo && userInfo.isAdmin && (
                <Nav.Link as={Link} to="/admin">
                  Admin Dashboard
                </Nav.Link>
              )}
              {userInfo && userInfo.isAdmin && (
                <>
                  <Nav.Link as={Link} to="/admin/rooms" className="me-3">
                    Rooms
                  </Nav.Link>
                  <Nav.Link as={Link} to="/admin/places" className="me-3">
                    Places
                  </Nav.Link>
                  <Nav.Link as={Link} to="/admin/users" className="me-3">
                    Users
                  </Nav.Link>
                  <Nav.Link as={Link} to="/admin/bookings" className="me-3">
                    Bookings
                  </Nav.Link>
                </>
              )}
              {userInfo && userInfo.name ? (
                <NavDropdown 
                  title={
                    <span className="nav-link-custom d-flex align-items-center">
                      <i className="fas fa-user-circle me-2"></i>
                      {userInfo.name}
                    </span>
                  } 
                  id="basic-nav-dropdown"
                  align="end"
                >
                  <div className="dropdown-header">
                    <div className="user-info">
                      <i className="fas fa-user-circle fa-2x mb-2"></i>
                      <div className="user-details">
                        <div className="user-name">{userInfo.name}</div>
                        <div className="user-email">{userInfo.email}</div>
                        {userInfo.phone && (
                          <div className="user-phone">{userInfo.phone}</div>
                        )}
                      </div>
                    </div>
                  </div>
                  <NavDropdown.Divider />
                  <NavDropdown.Item 
                    as={Link} 
                    to={`/profile/${userInfo._id}`} 
                    className="dropdown-item"
                  >
                    <i className="fas fa-user me-2"></i>Profile
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/bookings" className="dropdown-item">
                    <i className="fas fa-calendar-alt me-2"></i>My Bookings
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={handleLogout} className="dropdown-item">
                    <i className="fas fa-sign-out-alt me-2"></i>Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
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
              )}
            </Nav>
          </BootstrapNavbar.Collapse>
        </Container>
      </BootstrapNavbar>
    </>
  );
}

export default Navbar;