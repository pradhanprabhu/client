import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ProfileScreen.css';

function ProfileScreen() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedUserInfo = JSON.parse(localStorage.getItem('userInfo'));
        console.log('Stored User Info:', storedUserInfo);

        if (!storedUserInfo) {
          console.log('No user info found in localStorage');
          navigate('/login');
          return;
        }

        const { data } = await axios.get(`/api/users/profile/${storedUserInfo._id}`);
        console.log('API Response Data:', data);
        
        if (!data || !data.success) {
          throw new Error('Failed to fetch user data');
        }

        setUserInfo(data.data);
        setFormData({
          name: data.data.name,
          email: data.data.email,
          phone: data.data.phone
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError('Failed to fetch user data');
        if (error.response?.status === 401) {
          localStorage.removeItem('userInfo');
          navigate('/login');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const { data } = await axios.put(`/api/users/profile/${userInfo._id}`, formData);
      setUserInfo(data.data);
      setSuccess('Profile updated successfully');
      setIsEditing(false);
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: 'calc(100vh - 70px)' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-screen">
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col md={8}>
            <Card className="profile-card">
              <Card.Body className="p-4">
                <div className="text-center mb-4">
                  <div className="profile-avatar">
                    <i className="fas fa-user"></i>
                  </div>
                  <h2 className="mt-3">Welcome, {userInfo?.name}</h2>
                  <p className="text-muted">Member since {new Date(userInfo?.createdAt).toLocaleDateString()}</p>
                </div>

                {error && <Alert variant="danger">{error}</Alert>}
                {success && <Alert variant="success">{success}</Alert>}

                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-4">
                    <Form.Label className="form-label">Full Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      required
                      className="form-control-custom"
                    />
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label className="form-label">Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      required
                      className="form-control-custom"
                    />
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label className="form-label">Phone</Form.Label>
                    <Form.Control
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      required
                      className="form-control-custom"
                    />
                  </Form.Group>

                  <div className="d-flex gap-3 justify-content-center mt-4">
                    {!isEditing ? (
                      <Button
                        variant="primary"
                        onClick={() => setIsEditing(true)}
                        className="btn-custom"
                      >
                        Edit Profile
                      </Button>
                    ) : (
                      <>
                        <Button
                          type="submit"
                          variant="success"
                          className="btn-custom"
                          disabled={loading}
                        >
                          {loading ? 'Saving...' : 'Save Changes'}
                        </Button>
                        <Button
                          variant="secondary"
                          onClick={() => {
                            setIsEditing(false);
                            setFormData({
                              name: userInfo.name,
                              email: userInfo.email,
                              phone: userInfo.phone
                            });
                          }}
                          className="btn-custom"
                        >
                          Cancel
                        </Button>
                      </>
                    )}
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default ProfileScreen; 