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
  const [imagePreview, setImagePreview] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    profilePicture: ''
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

        if (!storedUserInfo) {
          navigate('/login');
          return;
        }

        const config = {
          headers: {
            Authorization: `Bearer ${storedUserInfo.token}`
          }
        };

        const { data } = await axios.get(`/api/users/profile/${storedUserInfo._id}`, config);

        if (!data || !data.success) {
          throw new Error('Failed to fetch user data');
        }

        setUserInfo(data.data);
        setFormData({
          name: data.data.name,
          email: data.data.email,
          phone: data.data.phone,
          profilePicture: data.data.profilePicture || ''
        });
        setImagePreview(data.data.profilePicture || '');
      } catch (error) {
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
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePasswordInputChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({
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

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    setImagePreview(URL.createObjectURL(file));

    const formData = new FormData();
    formData.append('image', file);

    try {
      const { data } = await axios.post('/api/users/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setFormData((prev) => ({
        ...prev,
        profilePicture: data.url
      }));
    } catch (error) {
      console.error('Image upload failed:', error);
      setError('Image upload failed');
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError('New passwords do not match');
      setLoading(false);
      return;
    }

    if (!validatePassword(passwordData.newPassword)) {
      setError('Password must be strong (8+ chars, uppercase, lowercase, number, special char)');
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

      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });

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

    if (
      formData.name === userInfo.name &&
      formData.phone === userInfo.phone &&
      formData.profilePicture === userInfo.profilePicture
    ) {
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

      const updateData = {
        name: formData.name,
        phone: formData.phone,
        profilePicture: formData.profilePicture,
        updatePassword: false
      };

      const response = await axios.put(`/api/users/profile/${userInfo._id}`, updateData, config);

      if (response.data.success) {
        const updatedUserInfo = {
          ...storedUserInfo,
          name: response.data.data.name,
          phone: response.data.data.phone,
          profilePicture: response.data.data.profilePicture
        };
        localStorage.setItem('userInfo', JSON.stringify(updatedUserInfo));

        setUserInfo(response.data.data);
        setFormData({
          name: response.data.data.name,
          email: response.data.data.email,
          phone: response.data.data.phone,
          profilePicture: response.data.data.profilePicture
        });
        setImagePreview(response.data.data.profilePicture);
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
                    {imagePreview ? (
                      <img src={imagePreview} alt="Profile" className="rounded-circle" width="100" height="100" />
                    ) : (
                      <i className="fas fa-user fa-3x"></i>
                    )}
                  </div>
                  <h2 className="mt-3">Welcome, {userInfo?.name}</h2>
                  <p className="text-muted">Member since {new Date(userInfo?.createdAt).toLocaleDateString()}</p>
                </div>

                {error && <Alert variant="danger">{error}</Alert>}
                {success && <Alert variant="success">{success}</Alert>}

                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-4">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" value={formData.email} disabled readOnly />
                    <Form.Text className="text-muted">Email cannot be changed</Form.Text>
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      required
                    />
                  </Form.Group>

                  {isEditing && (
                    <Form.Group className="mb-4">
                      <Form.Label>Profile Picture</Form.Label>
                      <Form.Control type="file" accept="image/*" onChange={handleImageUpload} />
                    </Form.Group>
                  )}

                  <div className="d-flex gap-3 justify-content-center mt-4">
                    {!isEditing ? (
                      <Button variant="primary" onClick={() => setIsEditing(true)}>
                        Edit Profile
                      </Button>
                    ) : (
                      <>
                        <Button type="submit" variant="success" disabled={loading}>
                          {loading ? 'Saving...' : 'Save Changes'}
                        </Button>
                        <Button
                          variant="secondary"
                          onClick={() => {
                            setIsEditing(false);
                            setFormData({
                              name: userInfo.name,
                              email: userInfo.email,
                              phone: userInfo.phone,
                              profilePicture: userInfo.profilePicture
                            });
                            setImagePreview(userInfo.profilePicture);
                          }}
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
                  >
                    {showPasswordForm ? 'Hide Password Form' : 'Change Password'}
                  </Button>
                </div>

                {showPasswordForm && (
                  <Form onSubmit={handlePasswordChange}>
                    <h4 className="mb-4">Change Password</h4>

                    <Form.Group className="mb-3">
                      <Form.Label>Current Password</Form.Label>
                      <Form.Control
                        type="password"
                        name="currentPassword"
                        value={passwordData.currentPassword}
                        onChange={handlePasswordInputChange}
                        required
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
                      />
                      <Form.Text className="text-muted">
                        Must be 8+ characters with uppercase, lowercase, number, and special character.
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
                      />
                    </Form.Group>

                    <div className="d-flex justify-content-center">
                      <Button type="submit" variant="primary" disabled={loading}>
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
