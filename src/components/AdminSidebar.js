import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import './AdminSidebar.css';

const AdminSidebar = () => {
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    navigate('/login');
  };

  return (
    <Navbar className="admin-sidebar" expand="lg">
      <div className="sidebar-content">
        <div className="sidebar-header">
          <h3>Admin Panel</h3>
        </div>
        <Nav className="flex-column">
          <Nav.Link as={Link} to="/admin" className="sidebar-link">
            <i className="fas fa-tachometer-alt me-2"></i>
            Dashboard
          </Nav.Link>
          <Nav.Link as={Link} to="/admin/rooms" className="sidebar-link">
            <i className="fas fa-bed me-2"></i>
            Rooms
          </Nav.Link>
          <Nav.Link as={Link} to="/admin/places" className="sidebar-link">
            <i className="fas fa-map-marker-alt me-2"></i>
            Places
          </Nav.Link>
          <Nav.Link as={Link} to="/admin/bookings" className="sidebar-link">
            <i className="fas fa-calendar-check me-2"></i>
            Bookings
          </Nav.Link>
          <Nav.Link as={Link} to="/admin/users" className="sidebar-link">
            <i className="fas fa-users me-2"></i>
            Users
          </Nav.Link>
          <Nav.Link as={Link} to="/admin/payments" className="sidebar-link">
            <i className="fas fa-money-bill-wave me-2"></i>
            Payments
          </Nav.Link>
        </Nav>
        <div className="sidebar-footer">
          <div className="user-info">
            <i className="fas fa-user-circle me-2"></i>
            <span>{userInfo?.name || 'Admin'}</span>
          </div>
          <Nav.Link onClick={handleLogout} className="sidebar-link">
            <i className="fas fa-sign-out-alt me-2"></i>
            Logout
          </Nav.Link>
        </div>
      </div>
    </Navbar>
  );
};

export default AdminSidebar; 