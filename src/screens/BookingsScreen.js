import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import './BookingsScreen.css';

function BookingsScreen() {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
      return;
    }

    const fetchBookings = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`
          }
        };

        const { data } = await axios.get('/api/bookings/user/bookings', config);
        setBookings(data);
        setLoading(false);
      } catch (error) {
        setError(error.response?.data?.message || 'Failed to fetch bookings');
        setLoading(false);
      }
    };

    fetchBookings();
  }, [navigate, userInfo]);

  const handleCancelBooking = async (bookingId) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`
          }
        };

        await axios.put(`/api/bookings/${bookingId}/cancel`, {}, config);
        
        // Update the bookings list
        setBookings(bookings.map(booking => 
          booking._id === bookingId 
            ? { ...booking, status: 'cancelled' }
            : booking
        ));
      } catch (error) {
        setError(error.response?.data?.message || 'Failed to cancel booking');
      }
    }
  };

  if (loading) {
    return (
      <Container className="py-5">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <h2 className="mb-4">My Bookings</h2>
      
      {error && <Alert variant="danger">{error}</Alert>}
      
      {bookings.length === 0 ? (
        <Card>
          <Card.Body className="text-center">
            <h4>No bookings found</h4>
            <p>You haven't made any bookings yet.</p>
            <Button variant="primary" onClick={() => navigate('/rooms')}>
              Book a Room
            </Button>
          </Card.Body>
        </Card>
      ) : (
        <Table responsive striped bordered hover>
          <thead>
            <tr>
              <th>Room</th>
              <th>Check In</th>
              <th>Check Out</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Payment Method</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking._id}>
                <td>{booking.room?.name || 'Room not available'}</td>
                <td>{moment(booking.checkIn).format('MMM DD, YYYY')}</td>
                <td>{moment(booking.checkOut).format('MMM DD, YYYY')}</td>
                <td>Rs. {booking.totalAmount}</td>
                <td>
                  <span className={`status-badge ${booking.status}`}>
                    {booking.status}
                  </span>
                </td>
                <td>{booking.paymentMethod}</td>
                <td>
                  {booking.status === 'pending' && (
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleCancelBooking(booking._id)}
                    >
                      Cancel
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
}

export default BookingsScreen; 