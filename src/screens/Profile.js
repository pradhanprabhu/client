import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import './Profile.css';

const Profile = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    // Get user info from localStorage
    const storedUserInfo = localStorage.getItem('userInfo');
    if (storedUserInfo) {
      setUserInfo(JSON.parse(storedUserInfo));
    } else {
      // If no user info, redirect to login
      navigate('/login');
    }
  }, [navigate]);

  if (!userInfo) {
    return null;
  }

  return (
    <div className="profile-page">
      <div className="hero-section" style={{
        backgroundImage: `url('https://files.oaiusercontent.com/file-1WWdiGTdsF9beZiEL3owcM?se=2025-03-26T10%3A26%3A47Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3Dfd2d3a6e-acca-421c-a0d8-53780720e125.webp&sig=XaTIBZIlgiFbxeMpQM7Z7W/Yo3jtFLOtyr/YSYVxeaY%3D')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}>
        <div className="overlay"></div>
        <Container className="hero-content text-center text-white">
          <h1 className="display-4">My Profile</h1>
          <p className="lead">View and manage your account information</p>
        </Container>
      </div>

      <Container className="profile-container">
        <Row className="justify-content-center">
          <Col md={8}>
            <Card className="profile-card">
              <Card.Body>
                <div className="profile-header text-center mb-4">
                  <div className="profile-avatar">
                    <i className="fas fa-user-circle"></i>
                  </div>
                  <h2>{userInfo.name}</h2>
                </div>

                <div className="profile-details">
                  <h3>{userInfo.name}</h3>
                  <p><i className="fas fa-envelope"></i> {userInfo.email}</p>
                  <p><i className="fas fa-phone"></i> {userInfo.phone}</p>
                  {userInfo.createdAt && (
                    <p><i className="fas fa-calendar"></i> Member since {new Date(userInfo.createdAt).toLocaleDateString()}</p>
                  )}
                </div>

                <div className="profile-actions text-center mt-4">
                  <Button variant="warning" className="me-2">
                    <i className="fas fa-edit me-2"></i>Edit Profile
                  </Button>
                  <Button variant="outline-danger">
                    <i className="fas fa-key me-2"></i>Change Password
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Profile; 