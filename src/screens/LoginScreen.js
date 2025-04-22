import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import './LoginScreen.css';

function LoginScreen() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const { data } = await axios.post('/api/users/login', {
        email,
        password
      });

      if (data.success) {
        const user = data.data;

        // Check if email is verified
        if (!user.isVerified) {
          setError('Please verify your email before logging in.');
          return;
        }

        localStorage.setItem('userInfo', JSON.stringify(user));
        localStorage.setItem('token', user.token);
        setSuccess('Login successful!');

        setTimeout(() => {
          if (user.isAdmin) {
            navigate('/admin');
          } else {
            navigate('/');
          }
        }, 1500);
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="login-screen">
        <Container>
          <Row className="justify-content-center align-items-center min-vh-100">
            <Col md={6} lg={5}>
              <div className="login-card">
                <h2 className="text-center mb-4">Login</h2>
                {error && <Alert variant="danger">{error}</Alert>}
                {success && <Alert variant="success">{success}</Alert>}
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <div className="text-end mt-2">
                      <Link to="/forgot-password" className="text-primary">
                        Forgot Password?
                      </Link>
                    </div>
                  </Form.Group>

                  <Button 
                    variant="primary" 
                    type="submit" 
                    className="w-100 mb-3"
                    disabled={loading}
                  >
                    {loading ? 'Logging in...' : 'Login'}
                  </Button>

                  <div className="text-center">
                    <p className="mb-0">
                      Don't have an account?{' '}
                      <Link to="/register" className="text-primary">
                        Register here
                      </Link>
                    </p>
                  </div>
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default LoginScreen;
