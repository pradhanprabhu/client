import React, { useState, useEffect } from 'react';
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
  const [roomData, setRoomData] = useState(room);
  const [bookingData, setBookingData] = useState({
    checkIn: new Date().toISOString().split('T')[0],
    checkOut: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    guests: 1
  });

  useEffect(() => {
    if (!room) {
      navigate('/rooms');
    }
  }, [room, navigate]);

  const handleInputChange = async (e) => {
    const { name, value } = e.target;
    
    if (name === 'guests') {
      const numGuests = parseInt(value, 10) || 0;
      // Don't allow guests to exceed room capacity
      if (numGuests > roomData.maxcount) {
        setError(`Error: Cannot exceed maximum capacity of ${roomData.capacity} guests`);
        // Keep the previous valid value
        return;
      }
      
      if (numGuests < 1) {
        setError('Please enter at least 1 guest');
      } else {
        setError('');
      }

      // Only update if within valid range
      if (numGuests <= roomData.capacity && numGuests >= 0) {
        setBookingData(prev => ({
          ...prev,
          guests: numGuests
        }));
      }
      return;
    }

    // Check room availability when check-in date is selected
    if (name === 'checkIn') {
      try {
        const response = await axios.get(`/api/rooms/${roomData._id}/availability?date=${value}`);
        if (!response.data.available) {
          setError('This room is already booked for the selected date. Please choose a different date.');
          return;
        }
      } catch (error) {
        console.error('Error checking room availability:', error);
        setError('Error checking room availability. Please try again.');
        return;
      }
    }

    setBookingData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const calculateTotalDays = () => {
    if (!bookingData.checkIn || !bookingData.checkOut) return 0;
    const checkIn = new Date(bookingData.checkIn + 'T00:00:00.000Z');
    const checkOut = new Date(bookingData.checkOut + 'T00:00:00.000Z');
    const diffTime = Math.abs(checkOut - checkIn);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays || 0;
  };

  const calculateTotalAmount = () => {
    const totalDays = calculateTotalDays();
    return totalDays * (roomData?.price || 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // Validate guests first
    const numGuests = parseInt(bookingData.guests, 10) || 0;
    if (numGuests < 1) {
      setError('Please enter at least 1 guest');
      return;
    }
    if (numGuests > roomData.capacity) {
      setError(`Cannot proceed: ${numGuests} guests exceeds room capacity of ${roomData.capacity}`);
      return;
    }

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

    // Final capacity check before proceeding
    if (bookingData.guests > roomData.capacity) {
      setError(`Cannot proceed: ${bookingData.guests} guests exceeds room capacity of ${roomData.capacity}`);
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
      const totalDays = calculateTotalDays();
      const totalAmount = calculateTotalAmount();
      
      // Validate required fields
      if (isNaN(bookingData.guests) || bookingData.guests < 1) {
        setError('Please enter a valid number of guests');
        return;
      }
      if (bookingData.guests > roomData.capacity) {
        setError(`Error: Cannot book for ${bookingData.guests} guests. This room has a maximum capacity of ${roomData.capacity} guests.`);
        return;
      }

      if (totalDays < 1) {
        setError('Please select valid check-in and check-out dates');
        return;
      }

      // Final validation before proceeding to payment
      const numGuests = parseInt(bookingData.guests, 10);
      
      if (numGuests > roomData.capacity) {
        setError(`Error: Cannot proceed. ${numGuests} guests exceeds room capacity of ${roomData.capacity}`);
        setLoading(false);
        return;
      }

      if (numGuests <= 0) {
        setError('Error: Please enter at least 1 guest');
        setLoading(false);
        return;
      }

      // All validations passed, proceed to payment
      // Format dates properly for the backend
      const formattedData = {
        room: roomData,
        checkIn: new Date(bookingData.checkIn).toISOString().split('T')[0],
        checkOut: new Date(bookingData.checkOut).toISOString().split('T')[0],
        totalAmount: calculateTotalAmount(),
        totalDays: calculateTotalDays(),
        guests: numGuests
      };

      console.log('Navigating to payment with data:', formattedData);

      navigate('/payment', { state: formattedData });
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
                  <div className="d-flex align-items-center gap-2">
                    <Form.Control
                      type="number"
                      name="guests"
                      value={bookingData.guests}
                      onChange={handleInputChange}
                      min="1"
                      max={roomData.capacity}
                      required
                      className={bookingData.guests > roomData.capacity ? 'is-invalid' : ''}
                    />
                    <span className="text-muted">
                      / {roomData.maxcount}
                    </span>
                  </div>
                  {bookingData.guests > roomData.capacity ? (
                    <Form.Text className="text-danger">
                      Error: Maximum {roomData.capacity} guests allowed for this room
                    </Form.Text>
                  ) : (
                    <Form.Text className="text-muted">
                      Enter number of guests (max: {roomData.capacity})
                    </Form.Text>
                  )}
                </Form.Group>

                <div className="terms-and-conditions mt-4 mb-3">
                  <h5 className="mb-3">Terms and Conditions For Booking</h5>
                  <div className="terms-content p-3 bg-light rounded">
                    <ul className="list-unstyled">
                      <li className="mb-2">✓ Check-in time is from 2:00 PM, and check-out is until 12:00 PM</li>
                      <li className="mb-2">✓ Valid ID is required during check-in</li>
                      <li className="mb-2">✓ Payment must be done within 5 hours incase booking is only done</li>
                      <li className="mb-2">✓ Free cancellation up to 24 hours before check-in</li>
                      <li>✓ The hotel reserves the right to cancel bookings with invalid information</li>
                    </ul>
                  </div>
                </div>

                <Button 
                  variant="primary" 
                  type="submit" 
                  className="w-100"
                  disabled={loading || bookingData.guests > roomData.capacity || bookingData.guests < 1}
                >
                  {loading ? 'Processing...' : 
                   bookingData.guests > roomData.capacity ? `Cannot Book: Exceeds ${roomData.capacity} Guest Limit` :
                   bookingData.guests < 1 ? 'Enter Number of Guests' : 'Confirm Booking'}
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
                  src={roomData?.images?.[0] || 'https://via.placeholder.com/300x200'} 
                  alt={roomData?.name} 
                  className="room-image mb-3"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/300x200';
                  }}
                />
                <h4>{roomData?.name}</h4>
                <p className="text-muted">{roomData?.type}</p>
              </div>

              <div className="booking-summary mt-4">
                <h5 className="mb-3">Booking Details</h5>
                <div className="booking-details p-3 bg-light rounded">
                  <p className="mb-2"><strong>Duration:</strong> {calculateTotalDays()} days</p>
                  <p className="mb-2"><strong>Guests:</strong> {bookingData.guests} person(s)</p>
                  <p className="mb-3"><strong>Price per day:</strong> Rs. {roomData?.price || 0}</p>
                  <hr />
                  <div className="d-flex justify-content-between total mt-2">
                    <strong>Total Amount:</strong>
                    <strong>Rs. {calculateTotalAmount()}</strong>
                  </div>
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