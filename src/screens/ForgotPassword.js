import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import './ForgotPassword.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState({ text: '', type: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: '', type: '' });

    try {
      const { data } = await axios.post('http://localhost:5000/api/users/forgot-password', { email });
      
      if (data.success) {
        setMessage({
          text: 'Verification code has been sent to your email',
          type: 'success'
        });
        // Store email temporarily for verification
        localStorage.setItem('resetEmail', email);
        // Redirect to verification page after 2 seconds
        setTimeout(() => {
          navigate('/verify-reset');
        }, 2000);
      }
    } catch (error) {
      setMessage({
        text: error.response?.data?.message || 'Failed to send verification code',
        type: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forgot-password-screen">
      <Container>
        <Row className="justify-content-center align-items-center min-vh-100">
          <Col md={6} lg={4}>
            <Card className="forgot-password-card">
              <Card.Body>
                <h2 className="text-center mb-4">Reset Password</h2>
                {message.text && (
                  <Alert variant={message.type === 'success' ? 'success' : 'danger'} className="mb-4">
                    {message.text}
                  </Alert>
                )}
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-4">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </Form.Group>
                  <Button 
                    type="submit" 
                    className="w-100 mb-3"
                    variant="primary"
                    disabled={loading}
                  >
                    {loading ? 'Sending...' : 'Send Verification Code'}
                  </Button>
                  <div className="text-center">
                    <Link to="/login" className="text-primary">
                      Back to Login
                    </Link>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ForgotPassword; 