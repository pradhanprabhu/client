import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, Alert } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './ProfileScreen.css';

function ProfileScreen() {
  const navigate = useNavigate();
  const { userId } = useParams();
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

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [showPasswordForm, setShowPasswordForm] = useState(false);

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

        const config = {
          headers: {
            Authorization: `Bearer ${storedUserInfo.token}`
          }
        };

        console.log('Making API request to:', `/api/users/profile/${storedUserInfo._id}`);
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
        console.error('Error response:', error.response);
        console.error('Error message:', error.message);
        console.error('Error status:', error.response?.status);
        
        if (error.response) {
          setError(`Error: ${error.response.status} - ${error.response.data?.message || 'Failed to fetch user data'}`);
        } else if (error.request) {
          setError('No response received from server. Please check if the server is running.');
        } else {
          setError(`Error: ${error.message}`);
        }

        if (error.response?.status === 401) {
          localStorage.removeItem('userInfo');
          navigate('/login');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate, userId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePasswordInputChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validatePassword = (password) => {
    const hasMinLength = password.length >= 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*]/.test(password);

    return hasMinLength && hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar;
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    // Validate passwords match
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError('New passwords do not match');
      setLoading(false);
      return;
    }

    // Validate password requirements
    if (!validatePassword(passwordData.newPassword)) {
      setError('Password must contain at least 8 characters, including uppercase, lowercase, number, and special character');
      setLoading(false);
      return;
    }

    try {
      const storedUserInfo = JSON.parse(localStorage.getItem('userInfo'));
      const config = {
        headers: {
          Authorization: `Bearer ${storedUserInfo.token}`
        }
      };

      const updateData = {
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
        updatePassword: true
      };

      const { data } = await axios.put(`/api/users/profile/${userInfo._id}`, updateData, config);

      // Clear password form
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });

      // Update form data and user info state
      setFormData({
        name: data.data.name,
        email: data.data.email,
        phone: data.data.phone
      });
      setUserInfo(data.data);

      setShowPasswordForm(false);
      setSuccess('Password updated successfully');
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to update password');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Check if any changes were made
    if (formData.name === userInfo.name && formData.phone === userInfo.phone) {
      setError('No changes were made to update');
      return;
    }

    setLoading(true);

    try {
      const storedUserInfo = JSON.parse(localStorage.getItem('userInfo'));
      const config = {
        headers: {
          Authorization: `Bearer ${storedUserInfo.token}`
        }
      };

      // Prepare update data
      const updateData = {
        name: formData.name,
        phone: formData.phone,
        updatePassword: false // Flag to indicate we're not updating password
      };

      console.log('Sending profile update:', updateData);
      const response = await axios.put(`/api/users/profile/${userInfo._id}`, updateData, config);
      console.log('Profile update response:', response.data);
      
      if (response.data.success) {
        // Update local storage with new user info
        const updatedUserInfo = {
          ...storedUserInfo,
          name: response.data.data.name,
          phone: response.data.data.phone
        };
        localStorage.setItem('userInfo', JSON.stringify(updatedUserInfo));

        // Update form data and user info state
        setFormData({
          name: response.data.data.name,
          email: response.data.data.email,
          phone: response.data.data.phone
        });
        setUserInfo(response.data.data);
        setSuccess('Profile updated successfully');
        setIsEditing(false);
      } else {
        setError('Failed to update profile');
      }
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
                      readOnly
                      disabled
                      className="form-control-custom form-control-readonly"
                    />
                    <Form.Text className="text-muted">
                      Email cannot be changed
                    </Form.Text>
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

                <hr className="my-4" />

                <div className="text-center mb-3">
                  <Button
                    variant="outline-primary"
                    onClick={() => setShowPasswordForm(!showPasswordForm)}
                    className="btn-custom"
                  >
                    {showPasswordForm ? 'Hide Password Form' : 'Change Password'}
                  </Button>
                </div>

                {showPasswordForm && (
                  <Form onSubmit={handlePasswordChange} className="mt-4">
                    <h4 className="mb-4">Change Password</h4>
                    <Form.Group className="mb-3">
                      <Form.Label>Current Password</Form.Label>
                      <Form.Control
                        type="password"
                        name="currentPassword"
                        value={passwordData.currentPassword}
                        onChange={handlePasswordInputChange}
                        required
                        className="form-control-custom"
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>New Password</Form.Label>
                      <Form.Control
                        type="password"
                        name="newPassword"
                        value={passwordData.newPassword}
                        onChange={handlePasswordInputChange}
                        required
                        className="form-control-custom"
                      />
                      <Form.Text className="text-muted">
                        Password must contain at least 8 characters, including uppercase, lowercase, number, and special character
                      </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-4">
                      <Form.Label>Confirm New Password</Form.Label>
                      <Form.Control
                        type="password"
                        name="confirmPassword"
                        value={passwordData.confirmPassword}
                        onChange={handlePasswordInputChange}
                        required
                        className="form-control-custom"
                      />
                    </Form.Group>

                    <div className="d-flex justify-content-center">
                      <Button
                        type="submit"
                        variant="primary"
                        className="btn-custom"
                        disabled={loading}
                      >
                        {loading ? 'Updating...' : 'Update Password'}
                      </Button>
                    </div>
                  </Form>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default ProfileScreen; 