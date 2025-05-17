import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, Alert, Tabs, Tab } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import MastercardPaymentForm from '../components/MastercardPaymentForm';
import './PaymentScreen.css';

function PaymentScreen() {
  const location = useLocation();
  const navigate = useNavigate();
  const [bookingData, setBookingData] = useState(null);
  const { state } = location;
  const { room, checkIn, checkOut, totalAmount, totalDays, guests } = state || {};
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [activeTab, setActiveTab] = useState('khalti');

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

  const handleKhaltiPayment = async () => {
    setLoading(true);
    setError('');

    try {
      console.log('Creating booking with data:', {
        room: bookingData.room._id,
        checkIn: bookingData.checkIn,
        checkOut: bookingData.checkOut,
        totalAmount: Number(bookingData.totalAmount),
        totalDays: Number(bookingData.totalDays),
        guests: Number(bookingData.guests)
      });

      // Create booking first
      const bookingResponse = await axios.post('http://localhost:5000/api/bookings', {
        room: bookingData.room._id,
        checkIn: bookingData.checkIn,
        checkOut: bookingData.checkOut,
        totalAmount: Number(bookingData.totalAmount),
        totalDays: Number(bookingData.totalDays),
        guests: Number(bookingData.guests),
        paymentMethod: 'khalti',
        status: 'pending'
      }, {
        headers: {
          'Authorization': `Bearer ${userInfo.token}`,
          'Content-Type': 'application/json'
        }
      });

      console.log('Booking created successfully:', bookingResponse.data);

      if (bookingResponse.data) {
        console.log('Initiating Khalti payment with:', {
          amount: bookingData.totalAmount,
          bookingId: bookingResponse.data._id
        });

        // Initiate Khalti payment
        const paymentResponse = await axios.post(
          'http://localhost:5000/api/payments/khalti/initiate',
          {
            amount: bookingData.totalAmount,
            bookingId: bookingResponse.data._id
          },
          {
            headers: {
              'Authorization': `Bearer ${userInfo.token}`,
              'Content-Type': 'application/json'
            }
          }
        );

        console.log('Khalti payment initiated:', paymentResponse.data);

        // Redirect to Khalti payment page
        if (paymentResponse.data.paymentUrl) {
          window.location.href = paymentResponse.data.paymentUrl;
        } else {
          throw new Error('Payment URL not received from Khalti');
        }
      } else {
        throw new Error('Failed to create booking');
      }
    } catch (error) {
      console.error('Khalti payment error:', error);
      console.error('Error details:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
      
      const errorMessage = error.response?.data?.details || 
                          error.response?.data?.message || 
                          error.message || 
                          'Payment failed. Please try again.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleMastercardPayment = async (paymentDetails) => {
    setLoading(true);
    setError('');

    try {
      if (!bookingData || !bookingData.room || !bookingData.room._id) {
        throw new Error('Invalid booking data');
      }

      // Create booking first
      const bookingResponse = await axios.post('http://localhost:5000/api/bookings', {
        room: bookingData.room._id,
        checkIn: bookingData.checkIn,
        checkOut: bookingData.checkOut,
        totalAmount: Number(bookingData.totalAmount),
        totalDays: Number(bookingData.totalDays),
        guests: Number(bookingData.guests),
        paymentMethod: 'mastercard',
        status: 'confirmed',
        paymentDetails: {
          cardNumber: paymentDetails.cardNumber,
          cardHolder: paymentDetails.cardHolder,
          expiryDate: paymentDetails.expiryDate
        }
      }, {
        headers: {
          'Authorization': `Bearer ${userInfo.token}`,
          'Content-Type': 'application/json'
        }
      });

      if (bookingResponse.data) {
        setSuccess('Payment successful! Redirecting to your bookings...');
        setTimeout(() => {
          navigate('/bookings');
        }, 1500);
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (error) {
      console.error('Mastercard payment error:', error);
      const errorMessage = error.response?.data?.details || 
                          error.response?.data?.message || 
                          error.message || 
                          'Payment failed. Please try again.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleCashPayment = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const bookingDetails = {
        room: bookingData.room._id,
        checkIn: bookingData.checkIn,
        checkOut: bookingData.checkOut,
        totalAmount: Number(bookingData.totalAmount),
        totalDays: Number(bookingData.totalDays),
        guests: Number(bookingData.guests),
        status: 'pending',
        paymentMethod: 'cash'
      };

      const response = await axios.post('http://localhost:5000/api/bookings', bookingDetails, {
        headers: {
          'Authorization': `Bearer ${userInfo.token}`,
          'Content-Type': 'application/json'
        }
      });
      
      setSuccess('Booking successful! Redirecting to your bookings...');
      setTimeout(() => {
        navigate('/bookings');
      }, 1500);
    } catch (error) {
      setError(error.response?.data?.message || error.message || 'Booking failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!bookingData) return null;

  return (
    <div className="payment-screen">
      <Container className="py-5">
        <Row>
          <Col md={8}>
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

            <Card className="payment-form-card">
              <Card.Header className="bg-primary text-white">
                <h3 className="mb-0">Payment Options</h3>
              </Card.Header>
              <Card.Body>
                <Tabs
                  activeKey={activeTab}
                  onSelect={(k) => setActiveTab(k)}
                  className="mb-3"
                  variant="pills"
                >
                  <Tab eventKey="khalti" title="Khalti">
                    <div className="payment-options mt-3">
                      <Button
                        variant="primary"
                        className="w-100"
                        onClick={handleKhaltiPayment}
                        disabled={loading}
                      >
                        {loading ? 'Processing...' : 'Pay with Khalti'}
                      </Button>
                    </div>
                  </Tab>
                  <Tab eventKey="mastercard" title="Mastercard">
                    <div className="mt-3">
                      <MastercardPaymentForm
                        amount={bookingData.totalAmount}
                        onSuccess={handleMastercardPayment}
                        onError={setError}
                        loading={loading}
                      />
                    </div>
                  </Tab>
                  <Tab eventKey="cash" title="Cash on Arrival">
                    <div className="payment-options mt-3">
                      <Button
                        variant="secondary"
                        className="w-100"
                        onClick={handleCashPayment}
                        disabled={loading}
                      >
                        {loading ? 'Processing...' : 'Pay on Arrival'}
                      </Button>
                    </div>
                  </Tab>
                </Tabs>

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
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default PaymentScreen;