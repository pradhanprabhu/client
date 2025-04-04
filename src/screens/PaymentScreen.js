import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, Alert } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './PaymentScreen.css';

function PaymentScreen() {
  const location = useLocation();
  const navigate = useNavigate();
  const { booking, room } = location.state || {};
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    address: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (!booking || !room || !userInfo) {
      navigate('/rooms');
    }
  }, [booking, room, userInfo, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // Here you would typically integrate with a payment gateway
      // For demo purposes, we'll just simulate a successful payment
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Update booking status
      await axios.put(`/api/bookings/${booking._id}`, {
        status: 'paid'
      });

      setSuccess('Payment successful! Redirecting to your bookings...');
      
      // Navigate to bookings page after a short delay
      setTimeout(() => {
        navigate('/bookings');
      }, 1500);
    } catch (error) {
      setError(error.response?.data?.message || 'Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!booking) return null;

  return (
    <div className="payment-screen">
      <Container className="py-5">
        <Row>
          <Col md={8}>
            <Card className="payment-form-card">
              <Card.Header className="bg-primary text-white">
                <h3 className="mb-0">Payment Details</h3>
              </Card.Header>
              <Card.Body>
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>Card Number</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      value={paymentDetails.cardNumber}
                      onChange={(e) => setPaymentDetails(prev => ({
                        ...prev,
                        cardNumber: e.target.value
                      }))}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Cardholder Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="John Doe"
                      value={paymentDetails.cardName}
                      onChange={(e) => setPaymentDetails(prev => ({
                        ...prev,
                        cardName: e.target.value
                      }))}
                      required
                    />
                  </Form.Group>

                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Expiry Date</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="MM/YY"
                          value={paymentDetails.expiryDate}
                          onChange={(e) => setPaymentDetails(prev => ({
                            ...prev,
                            expiryDate: e.target.value
                          }))}
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>CVV</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="123"
                          value={paymentDetails.cvv}
                          onChange={(e) => setPaymentDetails(prev => ({
                            ...prev,
                            cvv: e.target.value
                          }))}
                          required
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group className="mb-3">
                    <Form.Label>Billing Address</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      value={paymentDetails.address}
                      onChange={(e) => setPaymentDetails(prev => ({
                        ...prev,
                        address: e.target.value
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
                    {loading ? 'Processing Payment...' : `Pay $${booking.totalAmount}`}
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="payment-summary-card">
              <Card.Header className="bg-info text-white">
                <h4 className="mb-0">Payment Summary</h4>
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
                
                <div className="payment-details">
                  <div className="detail-item">
                    <span>Check-in:</span>
                    <span>{new Date(booking.fromDate).toLocaleDateString()}</span>
                  </div>
                  <div className="detail-item">
                    <span>Check-out:</span>
                    <span>{new Date(booking.toDate).toLocaleDateString()}</span>
                  </div>
                  <div className="detail-item">
                    <span>Duration:</span>
                    <span>{booking.totalDays} nights</span>
                  </div>
                  <div className="detail-item">
                    <span>Guests:</span>
                    <span>{booking.guests}</span>
                  </div>
                  <div className="detail-item total">
                    <span>Total Amount:</span>
                    <span>${booking.totalAmount}</span>
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

export default PaymentScreen; 