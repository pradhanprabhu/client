import React from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './PaymentFailure.css';

function PaymentFailure() {
  const navigate = useNavigate();

  return (
    <Container className="payment-failure-container">
      <Card className="failure-card">
        <Card.Body className="text-center">
          <div className="failure-icon">✕</div>
          <h2>Payment Failed</h2>
          <p>We're sorry, but your payment could not be processed.</p>
          <p>Please try again or choose a different payment method.</p>
          <div className="button-group">
            <Button 
              variant="primary" 
              onClick={() => navigate('/payment')}
              className="me-2"
            >
              Try Again
            </Button>
            <Button 
              variant="secondary" 
              onClick={() => navigate('/rooms')}
            >
              Back to Rooms
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default PaymentFailure; 