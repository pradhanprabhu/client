import React from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import './AdminNavbar.css';

const AdminNavbar = () => {
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    navigate('/login');
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="admin-navbar">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/admin/dashboard"> Admin Dashboard</Nav.Link>
            <Nav.Link as={Link} to="/admin/rooms">Rooms</Nav.Link>
            <Nav.Link as={Link} to="/admin/places">Places</Nav.Link>
            <Nav.Link as={Link} to="/admin/bookings">Bookings</Nav.Link>
          </Nav>
          <Nav>
            <NavDropdown 
              title={
                <span>
                  <i className="fas fa-user-circle me-1"></i>
                  {userInfo?.name || 'Admin'}
                </span>
              } 
              id="basic-nav-dropdown"
              align="end"
            >
              <NavDropdown.Item as={Link} to="/admin/profile">
                <i className="fas fa-user me-2"></i>Profile
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/admin/settings">
                <i className="fas fa-cog me-2"></i>Settings
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={handleLogout}>
                <i className="fas fa-sign-out-alt me-2"></i>Logout
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AdminNavbar; 