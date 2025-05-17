import React, { useEffect, useState } from 'react';
import { Container, Card, Button, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './PaymentSuccess.css';

function PaymentSuccess() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        // Get the booking data from localStorage
        const pendingBooking = localStorage.getItem('pendingBooking');
        if (!pendingBooking) {
          setError('No pending booking found');
          setLoading(false);
          return;
        }

        const bookingData = JSON.parse(pendingBooking);
        
        // Create the booking in the database
        const response = await axios.post('http://localhost:5000/api/bookings', {
          room: bookingData.room._id,
          checkIn: bookingData.checkIn,
          checkOut: bookingData.checkOut,
          totalAmount: Number(bookingData.totalAmount),
          totalDays: Number(bookingData.totalDays),
          guests: Number(bookingData.guests),
          status: 'confirmed',
          paymentMethod: bookingData.paymentMethod || 'card',
          paymentDetails: bookingData.paymentDetails || {}
        }, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')).token : ''}`,
            'Content-Type': 'application/json'
          }
        });

        // Clear the pending booking data
        localStorage.removeItem('pendingBooking');
        setLoading(false);
      } catch (error) {
        console.error('Error verifying payment:', error);
        setError('Failed to verify payment. Please contact support.');
        setLoading(false);
      }
    };

    verifyPayment();
  }, []);

  if (loading) {
    return (
      <Container className="payment-success-container">
        <Card className="success-card">
          <Card.Body className="text-center">
            <Spinner animation="border" role="status" className="mb-3">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
            <h2>Verifying Payment...</h2>
            <p>Please wait while we confirm your payment.</p>
          </Card.Body>
        </Card>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="payment-success-container">
        <Card className="failure-card">
          <Card.Body className="text-center">
            <div className="failure-icon">✕</div>
            <h2>Verification Failed</h2>
            <p>{error}</p>
            <Button 
              variant="primary" 
              onClick={() => navigate('/bookings')}
              className="mt-3"
            >
              View Your Bookings
            </Button>
          </Card.Body>
        </Card>
      </Container>
    );
  }

  return (
    <Container className="payment-success-container">
      <Card className="success-card">
        <Card.Body className="text-center">
          <div className="success-icon">✓</div>
          <h2>Payment Successful!</h2>
          <p>Your payment has been processed successfully.</p>
          <p>Thank you for choosing our service.</p>
          <p className="mt-3">Your booking has been confirmed.</p>
          <Button 
            variant="primary" 
            onClick={() => navigate('/bookings')}
            className="mt-3"
          >
            View Your Bookings
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default PaymentSuccess; 