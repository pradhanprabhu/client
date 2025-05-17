import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import './UserBookingsScreen.css';

function UserBookingsScreen() {
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

        const { data } = await axios.get('/api/bookings?populate=payment', config);
        setBookings(data);
        setLoading(false);
      } catch (error) {
        setError(error.response?.data?.message || 'Failed to fetch bookings');
        setLoading(false);
      }
    };

    fetchBookings();
  }, [navigate, userInfo]);

  const handleCancelBooking = async (booking) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`
          }
        };
        
        if (!booking.paymentId) {
          setError('Payment information not found. Please contact support.');
          return;
        }

        await axios.put(`/api/payments/${booking.paymentId}/cancel`, {}, config);
        setBookings(bookings.map(b =>
          b._id === booking._id
            ? { ...b, status: 'cancelled' }
            : b
        ));
      } catch (error) {
        setError(error.response?.data?.message || 'Failed to cancel booking');
      }
    }
  };

  const handleDeleteBooking = async (bookingId) => {
    if (window.confirm('Are you sure you want to delete this booking?')) {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`
          }
        };
        await axios.delete(`/api/bookings/${bookingId}`, config);
        setBookings(bookings.filter(booking => booking._id !== bookingId));
      } catch (error) {
        setError(error.response?.data?.message || 'Failed to delete booking');
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
                    {booking.status === 'cancelled' ? 'Cancelled' : booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                  </span>
                </td>
                <td>
                  <span className={`payment-method ${booking.paymentMethod}`}>
                    {booking.paymentMethod === 'cash' ? 'Cash on Arrival' : 
                     booking.paymentMethod === 'esewa' ? 'eSewa' : 
                     booking.paymentMethod === 'khalti' ? 'Khalti' : 
                     booking.paymentMethod === 'mastercard' ? 'Mastercard' : 
                     'N/A'}
                  </span>
                </td>
                <td>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleCancelBooking(booking)}
                    disabled={booking.status === 'cancelled'}
                  >
                    Cancel
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
}

export default UserBookingsScreen; 