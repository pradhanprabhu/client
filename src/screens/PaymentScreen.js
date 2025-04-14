import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, Alert } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './PaymentScreen.css';

function PaymentScreen() {
  const location = useLocation();
  const navigate = useNavigate();
  const [bookingData, setBookingData] = useState(null);
  const { state } = location;
  const { room, checkIn, checkOut, totalAmount, totalDays, guests } = state || {};
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  const [paymentDetails, setPaymentDetails] = useState({
    phoneNumber: '',
    transactionId: '',
    paymentMethod: 'esewa'
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (!state || !state.room || !state.checkIn || !state.checkOut || !state.totalAmount || !state.totalDays || !state.guests) {
      navigate('/rooms');
      return;
    }
    setBookingData({
      room: state.room,
      checkIn: state.checkIn,
      checkOut: state.checkOut,
      totalAmount: state.totalAmount,
      totalDays: state.totalDays,
      guests: state.guests
    });
  }, [state, navigate]);

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    }
  }, [userInfo, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    console.log('Starting booking process with data:', bookingData);
    
    try {
      if (!bookingData || !bookingData.room || !bookingData.room._id) {
        throw new Error('Invalid booking data');
      }

      // First create the booking
      const bookingDetails = {
        room: bookingData.room._id,
        checkIn: bookingData.checkIn,
        checkOut: bookingData.checkOut,
        totalAmount: Number(bookingData.totalAmount),
        totalDays: Number(bookingData.totalDays),
        guests: Number(bookingData.guests),
        status: 'pending'
      };

      console.log('Sending booking details:', bookingDetails);

      const response = await axios.post('/api/bookings', bookingDetails, {
        headers: {
          'Authorization': `Bearer ${userInfo.token}`,
          'Content-Type': 'application/json'
        }
      });
      
      const newBooking = response.data;
      console.log('Booking created:', newBooking);

      if (!newBooking || !newBooking._id) {
        throw new Error('Invalid response from server');
      }

      // Create payment record
      const paymentData = {
        bookingId: newBooking._id,
        amount: totalAmount,
        paymentMethod: paymentDetails.paymentMethod,
        status: paymentDetails.paymentMethod === 'cash' ? 'pending' : 'completed',
        paymentDetails: paymentDetails.paymentMethod === 'cash' ? {} : {
          phoneNumber: paymentDetails.phoneNumber,
          transactionId: paymentDetails.transactionId
        }
      };
      // Validate payment details based on payment method
      if (paymentDetails.paymentMethod === 'esewa' || paymentDetails.paymentMethod === 'khalti') {
        if (!paymentDetails.phoneNumber || !paymentDetails.transactionId) {
          throw new Error(`Please fill in all ${paymentDetails.paymentMethod} payment details`);
        }
      }

      // Send payment request to server
      const { data } = await axios.post('/api/payments', paymentData, {
        headers: {
          'Authorization': `Bearer ${userInfo.token}`
        }
      });

      // Update booking status
      await axios.put(`/api/bookings/${newBooking._id}`, {
        status: 'confirmed',
        paymentId: data._id
      }, {
        headers: {
          'Authorization': `Bearer ${userInfo.token}`
        }
      });

      setSuccess('Payment successful! Redirecting to your bookings...');
      
      // Navigate to bookings page after a short delay
      setTimeout(() => {
        navigate('/bookings');
      }, 1500);
    } catch (error) {
      setError(error.response?.data?.message || error.message || 'Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!bookingData) return null;

  const renderBookingSummary = () => (
    <Card className="mb-4">
      <Card.Header className="bg-light">
        <h5 className="mb-0">Booking Summary</h5>
      </Card.Header>
      <Card.Body>
        <div className="booking-details">
          <p><strong>Room:</strong> {bookingData.room.name} ({bookingData.room.type})</p>
          <p><strong>Check-in:</strong> {new Date(bookingData.checkIn).toLocaleDateString()}</p>
          <p><strong>Check-out:</strong> {new Date(bookingData.checkOut).toLocaleDateString()}</p>
          <p><strong>Duration:</strong> {bookingData.totalDays} days</p>
          <p><strong>Guests:</strong> {bookingData.guests} person(s)</p>
          <hr />
          <div className="d-flex justify-content-between total-amount">
            <strong>Total Amount:</strong>
            <strong>Rs. {bookingData.totalAmount}</strong>
          </div>
        </div>
      </Card.Body>
    </Card>
  );

  return (
    <div className="payment-screen">
      <Container className="py-5">
        <Row>
          <Col md={8}>
            {renderBookingSummary()}
            <Card className="payment-form-card">
              <Card.Header className="bg-primary text-white">
                <h3 className="mb-0">Payment Details</h3>
              </Card.Header>
              <Card.Body>
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-4">
                    <Form.Label>Payment Method</Form.Label>
                    <div className="payment-methods">
                      <div className={`payment-method-option ${paymentDetails.paymentMethod === 'esewa' ? 'active' : ''}`}>
                        <Form.Check
                          type="radio"
                          label="eSewa"
                          name="paymentMethod"
                          value="esewa"
                          checked={paymentDetails.paymentMethod === 'esewa'}
                          onChange={(e) => setPaymentDetails(prev => ({
                            ...prev,
                            paymentMethod: e.target.value
                          }))}
                        />
                      </div>
                      <div className={`payment-method-option ${paymentDetails.paymentMethod === 'khalti' ? 'active' : ''}`}>
                        <Form.Check
                          type="radio"
                          label="Khalti"
                          name="paymentMethod"
                          value="khalti"
                          checked={paymentDetails.paymentMethod === 'khalti'}
                          onChange={(e) => setPaymentDetails(prev => ({
                            ...prev,
                            paymentMethod: e.target.value
                          }))}
                        />
                      </div>
                      <div className={`payment-method-option ${paymentDetails.paymentMethod === 'cash' ? 'active' : ''}`}>
                        <Form.Check
                          type="radio"
                          label="Cash on Arrival"
                          name="paymentMethod"
                          value="cash"
                          checked={paymentDetails.paymentMethod === 'cash'}
                          onChange={(e) => setPaymentDetails(prev => ({
                            ...prev,
                            paymentMethod: e.target.value
                          }))}
                        />
                      </div>
                    </div>
                  </Form.Group>

                  {(paymentDetails.paymentMethod === 'esewa' || paymentDetails.paymentMethod === 'khalti') && (
                    <div className="digital-payment-fields">
                      <Form.Group className="mb-3">
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="98XXXXXXXX"
                          value={paymentDetails.phoneNumber}
                          onChange={(e) => setPaymentDetails(prev => ({
                            ...prev,
                            phoneNumber: e.target.value
                          }))}
                        />
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>Transaction ID</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter transaction ID"
                          value={paymentDetails.transactionId}
                          onChange={(e) => setPaymentDetails(prev => ({
                            ...prev,
                            transactionId: e.target.value
                          }))}
                        />
                      </Form.Group>
                    </div>
                  )}

                  {paymentDetails.paymentMethod === 'cash' && (
                    <div className="cash-payment-message">
                      <Alert variant="info">
                        Payment will be collected at the time of check-in.
                      </Alert>
                    </div>
                  )}

                  <Button
                    type="submit"
                    variant="primary"
                    className="w-100 mt-4"
                    disabled={loading}
                  >
                    {loading ? 'Processing Payment...' : 'Pay Now'}
                  </Button>

                  {error && (
                    <Alert variant="danger" className="mt-3">
                      {error}
                    </Alert>
                  )}

                  {success && (
                    <Alert variant="success" className="mt-3">
                      {success}
                    </Alert>
                  )}
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
                <div className="booking-info">
                  <p><strong>Room:</strong> {bookingData.room.name}</p>
                  <p><strong>Check-in:</strong> {new Date(bookingData.checkIn).toLocaleDateString()}</p>
                  <p><strong>Check-out:</strong> {new Date(bookingData.checkOut).toLocaleDateString()}</p>
                  <p><strong>Nights:</strong> {bookingData.totalDays}</p>
                  <p><strong>Guests:</strong> {bookingData.guests}</p>
                  <hr />
                  <h5>Total Amount: Rs. {bookingData.totalAmount}</h5>
                </div>
              </Card.Body>
            </Card>
            {error && (
              <Alert variant="danger" className="mt-3">
                {error}
              </Alert>
            )}
            {success && (
              <Alert variant="success" className="mt-3">
                {success}
              </Alert>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default PaymentScreen;