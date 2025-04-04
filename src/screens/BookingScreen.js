import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './BookingScreen.css';

const BookingScreen = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { room } = location.state || {};
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [bookingData, setBookingData] = useState({
    checkIn: '',
    checkOut: '',
    guests: 1
  });

  if (!room) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">Room information not found.</Alert>
      </Container>
    );
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingData({
      ...bookingData,
      [name]: value
    });
  };

  const calculateTotalDays = () => {
    if (!bookingData.checkIn || !bookingData.checkOut) return 0;
    const checkIn = new Date(bookingData.checkIn);
    const checkOut = new Date(bookingData.checkOut);
    const diffTime = Math.abs(checkOut - checkIn);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const calculateTotalAmount = () => {
    const totalDays = calculateTotalDays();
    return totalDays * room.rentperday;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!bookingData.checkIn || !bookingData.checkOut) {
      setError('Please select check-in and check-out dates');
      return;
    }

    const checkIn = new Date(bookingData.checkIn);
    const checkOut = new Date(bookingData.checkOut);
    
    if (checkIn >= checkOut) {
      setError('Check-out date must be after check-in date');
      return;
    }

    if (checkIn < new Date()) {
      setError('Check-in date cannot be in the past');
      return;
    }

    try {
      setLoading(true);
      setError('');
      
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      const bookingDetails = {
        room: room._id,
        userId: userInfo._id,
        checkIn: bookingData.checkIn,
        checkOut: bookingData.checkOut,
        guests: bookingData.guests,
        totalAmount: calculateTotalAmount(),
        totalDays: calculateTotalDays()
      };

      const { data } = await axios.post('/api/bookings/book', bookingDetails);
      
      if (data.success) {
        alert('Room booked successfully!');
        navigate('/profile');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <Container className="py-5">
      <Row>
        <Col md={8} className="mb-4">
          <Card className="booking-card">
            <Card.Body>
              <h2 className="mb-4">Book Your Stay</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Check-in Date</Form.Label>
                      <Form.Control
                        type="date"
                        name="checkIn"
                        value={bookingData.checkIn}
                        onChange={handleInputChange}
                        min={today}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Check-out Date</Form.Label>
                      <Form.Control
                        type="date"
                        name="checkOut"
                        value={bookingData.checkOut}
                        onChange={handleInputChange}
                        min={bookingData.checkIn || today}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label>Number of Guests</Form.Label>
                  <Form.Control
                    type="number"
                    name="guests"
                    value={bookingData.guests}
                    onChange={handleInputChange}
                    min="1"
                    max={room.maxcount}
                    required
                  />
                </Form.Group>

                <Button 
                  variant="primary" 
                  type="submit" 
                  className="w-100"
                  disabled={loading}
                >
                  {loading ? 'Processing...' : 'Confirm Booking'}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="summary-card">
            <Card.Body>
              <h3 className="mb-4">Booking Summary</h3>
              <div className="room-details mb-4">
                <img 
                  src={room.imageurls[0]} 
                  alt={room.name} 
                  className="room-image mb-3"
                />
                <h4>{room.name}</h4>
                <p className="text-muted">{room.type}</p>
              </div>

              <div className="booking-summary">
                <div className="d-flex justify-content-between mb-2">
                  <span>Price per night</span>
                  <span>${room.rentperday}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Number of nights</span>
                  <span>{calculateTotalDays()}</span>
                </div>
                <hr />
                <div className="d-flex justify-content-between total">
                  <strong>Total Amount</strong>
                  <strong>${calculateTotalAmount()}</strong>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default BookingScreen; 