import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, Alert } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './BookingConfirmationScreen.css';

function BookingConfirmationScreen() {
  const location = useLocation();
  const navigate = useNavigate();
  const { room } = location.state || {};
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  const [bookingDetails, setBookingDetails] = useState({
    fromDate: '',
    toDate: '',
    totalDays: 0,
    totalAmount: 0,
    guests: 1
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (!room || !userInfo) {
      navigate('/rooms');
    }
  }, [room, userInfo, navigate]);

  const calculateTotal = () => {
    if (bookingDetails.fromDate && bookingDetails.toDate) {
      const from = new Date(bookingDetails.fromDate);
      const to = new Date(bookingDetails.toDate);
      const diffTime = Math.abs(to - from);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      const totalAmount = diffDays * room.rentperday;
      setBookingDetails(prev => ({
        ...prev,
        totalDays: diffDays,
        totalAmount: totalAmount
      }));
    }
  };

  useEffect(() => {
    calculateTotal();
  }, [bookingDetails.fromDate, bookingDetails.toDate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const bookingData = {
        room: room._id,
        user: userInfo._id,
        fromDate: bookingDetails.fromDate,
        toDate: bookingDetails.toDate,
        totalDays: bookingDetails.totalDays,
        totalAmount: bookingDetails.totalAmount,
        guests: bookingDetails.guests
      };

      const response = await axios.post('/api/bookings/create', bookingData);
      setSuccess('Booking confirmed! Proceeding to payment...');
      
      // Navigate to payment screen after a short delay
      setTimeout(() => {
        navigate('/payment', { 
          state: { 
            booking: response.data,
            room: room
          }
        });
      }, 1500);
    } catch (error) {
      setError(error.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  if (!room) return null;

  return (
    <div className="booking-confirmation-screen">
      <Container className="py-5">
        <Row>
          <Col md={8}>
            <Card className="booking-form-card">
              <Card.Header className="bg-primary text-white">
                <h3 className="mb-0">Confirm Your Booking</h3>
              </Card.Header>
              <Card.Body>
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Check-in Date</Form.Label>
                        <Form.Control
                          type="date"
                          value={bookingDetails.fromDate}
                          onChange={(e) => setBookingDetails(prev => ({
                            ...prev,
                            fromDate: e.target.value
                          }))}
                          min={new Date().toISOString().split('T')[0]}
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Check-out Date</Form.Label>
                        <Form.Control
                          type="date"
                          value={bookingDetails.toDate}
                          onChange={(e) => setBookingDetails(prev => ({
                            ...prev,
                            toDate: e.target.value
                          }))}
                          min={bookingDetails.fromDate || new Date().toISOString().split('T')[0]}
                          required
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group className="mb-3">
                    <Form.Label>Number of Guests</Form.Label>
                    <Form.Control
                      type="number"
                      min="1"
                      max={room.maxcount}
                      value={bookingDetails.guests}
                      onChange={(e) => setBookingDetails(prev => ({
                        ...prev,
                        guests: parseInt(e.target.value)
                      }))}
                      required
                    />
                  </Form.Group>

                  {error && <Alert variant="danger">{error}</Alert>}
                  {success && <Alert variant="success">{success}</Alert>}

                  <Button 
                    variant="primary" 
                    type="submit" 
                    className="w-100"
                    disabled={loading}
                  >
                    {loading ? 'Processing...' : 'Confirm Booking & Proceed to Payment'}
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="booking-summary-card">
              <Card.Header className="bg-info text-white">
                <h4 className="mb-0">Booking Summary</h4>
              </Card.Header>
              <Card.Body>
                <div className="room-image mb-3">
                  <img 
                    src={room.imageurls[0]} 
                    alt={room.name}
                    className="img-fluid rounded"
                  />
                </div>
                <h5>{room.name}</h5>
                <p className="text-muted">{room.type}</p>
                
                <div className="booking-details">
                  <div className="detail-item">
                    <span>Check-in:</span>
                    <span>{bookingDetails.fromDate || 'Not selected'}</span>
                  </div>
                  <div className="detail-item">
                    <span>Check-out:</span>
                    <span>{bookingDetails.toDate || 'Not selected'}</span>
                  </div>
                  <div className="detail-item">
                    <span>Duration:</span>
                    <span>{bookingDetails.totalDays} nights</span>
                  </div>
                  <div className="detail-item">
                    <span>Guests:</span>
                    <span>{bookingDetails.guests}</span>
                  </div>
                  <div className="detail-item total">
                    <span>Total Amount:</span>
                    <span>${bookingDetails.totalAmount}</span>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default BookingConfirmationScreen; 