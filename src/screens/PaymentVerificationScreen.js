import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Container, Alert, Spinner } from 'react-bootstrap';
import axios from 'axios';

function PaymentVerificationScreen() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const pidx = searchParams.get('pidx');
        if (!pidx) throw new Error('Payment ID not found');

        // Parse userInfo and extract token correctly
        const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
        const token = userInfo.token;
        console.log('JWT token being sent:', token);
        if (!token) {
          setError('You must be logged in to verify payment.');
          setLoading(false);
          return;
        }

        const response = await axios.get(
          `http://localhost:5000/api/payments/khalti/verify?pidx=${pidx}`,
          {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          }
        );

        if (response.data.success) {
          setSuccess(true);
          setTimeout(() => {
            navigate('/bookings');
          }, 2000);
        } else {
          throw new Error('Payment verification failed');
        }
      } catch (error) {
        console.error('Payment verification error:', error);
        setError(error.response?.data?.message || error.message || 'Payment verification failed');
      } finally {
        setLoading(false);
      }
    };

    verifyPayment();
  }, [searchParams, navigate]);

  if (loading) {
    return (
      <Container className="text-center py-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p className="mt-3">Verifying your payment...</p>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      {error ? (
        <Alert variant="danger">
          <Alert.Heading>Payment Verification Failed</Alert.Heading>
          <p>{error}</p>
          <hr />
          <div className="d-flex justify-content-end">
            <button
              className="btn btn-outline-danger"
              onClick={() => navigate('/payment')}
            >
              Try Again
            </button>
          </div>
        </Alert>
      ) : success ? (
        <Alert variant="success">
          <Alert.Heading>Payment Successful!</Alert.Heading>
          <p>Your payment has been verified successfully. Redirecting to your bookings...</p>
        </Alert>
      ) : null}
    </Container>
  );
}

export default PaymentVerificationScreen; 