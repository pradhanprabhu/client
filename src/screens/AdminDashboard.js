import React, { useState } from 'react';
import { Container, Row, Col, Card, Table, Nav, Button } from 'react-bootstrap';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data for demonstration
  const stats = {
    totalBookings: 150,
    totalRevenue: 25000,
    activeUsers: 75,
    availableRooms: 20
  };

  const recentBookings = [
    {
      id: 1,
      guest: 'John Doe',
      room: 'Deluxe Suite',
      checkIn: '2024-03-20',
      checkOut: '2024-03-25',
      status: 'Confirmed'
    },
    {
      id: 2,
      guest: 'Jane Smith',
      room: 'Standard Room',
      checkIn: '2024-03-22',
      checkOut: '2024-03-24',
      status: 'Pending'
    }
  ];

  return (
    <div className="admin-dashboard">
      <Row>
        {/* Sidebar */}
        <Col md={3} lg={2} className="sidebar">
          <div className="sidebar-header">
            <h3>Admin Panel</h3>
          </div>
          <Nav className="flex-column">
            <Nav.Link
              active={activeTab === 'overview'}
              onClick={() => setActiveTab('overview')}
            >
              <i className="fas fa-home"></i> Overview
            </Nav.Link>
            <Nav.Link
              active={activeTab === 'bookings'}
              onClick={() => setActiveTab('bookings')}
            >
              <i className="fas fa-calendar-check"></i> Bookings
            </Nav.Link>
            <Nav.Link
              active={activeTab === 'rooms'}
              onClick={() => setActiveTab('rooms')}
            >
              <i className="fas fa-bed"></i> Rooms
            </Nav.Link>
            <Nav.Link
              active={activeTab === 'users'}
              onClick={() => setActiveTab('users')}
            >
              <i className="fas fa-users"></i> Users
            </Nav.Link>
            <Nav.Link
              active={activeTab === 'settings'}
              onClick={() => setActiveTab('settings')}
            >
              <i className="fas fa-cog"></i> Settings
            </Nav.Link>
          </Nav>
        </Col>

        {/* Main Content */}
        <Col md={9} lg={10} className="main-content">
          <div className="content-header">
            <h2>Dashboard Overview</h2>
            <Button variant="primary">
              <i className="fas fa-plus"></i> Add New Booking
            </Button>
          </div>

          {/* Statistics Cards */}
          <Row className="mb-4">
            <Col md={3}>
              <Card className="stat-card">
                <Card.Body>
                  <div className="stat-icon">
                    <i className="fas fa-calendar-check"></i>
                  </div>
                  <Card.Title>Total Bookings</Card.Title>
                  <div className="stat-number">{stats.totalBookings}</div>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="stat-card">
                <Card.Body>
                  <div className="stat-icon">
                    <i className="fas fa-dollar-sign"></i>
                  </div>
                  <Card.Title>Total Revenue</Card.Title>
                  <div className="stat-number">${stats.totalRevenue}</div>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="stat-card">
                <Card.Body>
                  <div className="stat-icon">
                    <i className="fas fa-users"></i>
                  </div>
                  <Card.Title>Active Users</Card.Title>
                  <div className="stat-number">{stats.activeUsers}</div>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="stat-card">
                <Card.Body>
                  <div className="stat-icon">
                    <i className="fas fa-bed"></i>
                  </div>
                  <Card.Title>Available Rooms</Card.Title>
                  <div className="stat-number">{stats.availableRooms}</div>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* Recent Bookings Table */}
          <Card className="table-card">
            <Card.Header>
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="mb-0">Recent Bookings</h5>
                <Button variant="outline-primary" size="sm">View All</Button>
              </div>
            </Card.Header>
            <Card.Body>
              <Table responsive hover>
                <thead>
                  <tr>
                    <th>Booking ID</th>
                    <th>Guest</th>
                    <th>Room</th>
                    <th>Check-in</th>
                    <th>Check-out</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {recentBookings.map((booking) => (
                    <tr key={booking.id}>
                      <td>#{booking.id}</td>
                      <td>{booking.guest}</td>
                      <td>{booking.room}</td>
                      <td>{booking.checkIn}</td>
                      <td>{booking.checkOut}</td>
                      <td>
                        <span className={`status-badge ${booking.status.toLowerCase()}`}>
                          {booking.status}
                        </span>
                      </td>
                      <td>
                        <Button variant="outline-secondary" size="sm" className="me-2">
                          <i className="fas fa-edit"></i>
                        </Button>
                        <Button variant="outline-danger" size="sm">
                          <i className="fas fa-trash"></i>
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AdminDashboard; 