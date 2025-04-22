import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import './VerifyReset.css';

const VerifyReset = () => {
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState({ text: '', type: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: '', type: '' });

    if (newPassword !== confirmPassword) {
      setMessage({
        text: 'Passwords do not match',
        type: 'error'
      });
      setLoading(false);
      return;
    }

    try {
      const email = localStorage.getItem('resetEmail');
      const { data } = await axios.post('/api/users/reset-password', {
        email,
        code,
        newPassword
      });

      if (data.success) {
        setMessage({
          text: 'Password reset successful! Redirecting to login...',
          type: 'success'
        });
        localStorage.removeItem('resetEmail');
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      }
    } catch (error) {
      setMessage({
        text: error.response?.data?.message || 'Failed to reset password',
        type: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="verify-reset-screen">
      <Container>
        <Row className="justify-content-center align-items-center min-vh-100">
          <Col md={6} lg={4}>
            <Card className="verify-reset-card">
              <Card.Body>
                <h2 className="text-center mb-4">Reset Password</h2>
                {message.text && (
                  <Alert variant={message.type === 'success' ? 'success' : 'danger'} className="mb-4">
                    {message.text}
                  </Alert>
                )}
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>Verification Code</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter verification code"
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>New Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter new password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                      minLength={8}
                    />
                  </Form.Group>
                  <Form.Group className="mb-4">
                    <Form.Label>Confirm New Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Confirm new password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      minLength={8}
                    />
                  </Form.Group>
                  <Button 
                    type="submit" 
                    className="w-100 mb-3"
                    variant="primary"
                    disabled={loading}
                  >
                    {loading ? 'Resetting...' : 'Reset Password'}
                  </Button>
                  <div className="text-center">
                    <Button 
                      variant="link" 
                      className="text-primary"
                      onClick={() => navigate('/forgot-password')}
                    >
                      Back to Forgot Password
                    </Button>
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

export default VerifyReset; 