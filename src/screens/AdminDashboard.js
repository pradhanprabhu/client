import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Table, Badge } from 'react-bootstrap';
import { FaHotel, FaMapMarkedAlt, FaUsers, FaCalendarAlt, FaRupeeSign } from 'react-icons/fa';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [totals, setTotals] = useState({ 
    rooms: 0, 
    places: 0, 
    users: 0, 
    bookings: 0,
    revenue: 0
  });
  const [recentBookings, setRecentBookings] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [roomsRes, placesRes, usersRes] = await Promise.all([
          axios.get('/api/rooms/'),
          axios.get('/api/places/'),
          axios.get('/api/users/'),
          // axios.get('/api/bookings/')
        ]);

        setTotals({
          rooms: roomsRes.data.length,
          places: placesRes.data.length,
          users: usersRes.data.length,
          // // bookings: bookingsRes.data.length,
          revenue:20000
        });

        // Get recent bookings (last 5)
        const sortedBookings = [...bookingsRes.data]
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 5);
        setRecentBookings(sortedBookings);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const StatCard = ({ title, value, icon, color }) => (
    <Col md={3} className="mb-4">
      <Card className="stat-card">
        <Card.Body>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h6 className="text-muted mb-2">{title}</h6>
              <h3 className="mb-0">{value}</h3>
            </div>
            <div className={`icon-circle bg-${color}`}>
              {icon}
            </div>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );

  return (
    <div className="admin-dashboard">
      <Container className="py-4">
        <h1 className="dashboard-title">Dashboard Overview</h1>
        
        <Row>
          <StatCard
            title="Total Rooms"
            value={totals.rooms}
            icon={<FaHotel className="stat-icon" />}
            color="primary"
          />
          <StatCard
            title="Total Places"
            value={totals.places}
            icon={<FaMapMarkedAlt className="stat-icon" />}
            color="success"
          />
          <StatCard
            title="Total Users"
            value={totals.users}
            icon={<FaUsers className="stat-icon" />}
            color="info"
          />
          <StatCard
            title="Total Revenue"
            value={`₹${totals.revenue}`}
            icon={<FaRupeeSign className="stat-icon" />}
            color="warning"
          />
        </Row>

        <Card className="recent-bookings">
          <Card.Header className="d-flex justify-content-between align-items-center">
            <h5 className="mb-0">Recent Bookings</h5>
            <Badge bg="primary" className="view-all">View All</Badge>
          </Card.Header>
          <Card.Body>
            <Table hover responsive>
              <thead>
                <tr>
                  <th>Booking ID</th>
                  <th>User</th>
                  <th>Room</th>
                  <th>Check In</th>
                  <th>Check Out</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentBookings.map((booking) => (
                  <tr key={booking._id}>
                    <td>{booking._id.slice(-6)}</td>
                    <td>{booking.userName}</td>
                    <td>{booking.roomName}</td>
                    <td>{new Date(booking.checkInDate).toLocaleDateString()}</td>
                    <td>{new Date(booking.checkOutDate).toLocaleDateString()}</td>
                    <td>
                      <Badge bg={booking.status === 'confirmed' ? 'success' : 'warning'}>
                        {booking.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default AdminDashboard; 