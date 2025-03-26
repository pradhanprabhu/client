import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import './AboutUs.css';

function AboutUs() {
  return (
    <div className="about-us-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="overlay"></div>
        <Container>
          <div className="hero-content text-center text-white">
            <h1>Our Story</h1>
            <p className="lead">A Legacy of Excellence Since 1990</p>
          </div>
        </Container>
      </section>

      {/* Mission & Vision Section */}
      <section className="mission-vision py-5">
        <Container>
          <Row>
            <Col md={6} className="mb-4">
              <Card className="h-100 mission-card">
                <Card.Body className="text-center">
                  <div className="icon-wrapper mb-4">
                    <i className="fas fa-bullseye"></i>
                  </div>
                  <h3>Our Mission</h3>
                  <p>
                    To provide exceptional hospitality services while preserving and promoting 
                    Nepalese culture and traditions. We strive to create memorable experiences 
                    for our guests through authentic service and world-class amenities.
                  </p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6} className="mb-4">
              <Card className="h-100 vision-card">
                <Card.Body className="text-center">
                  <div className="icon-wrapper mb-4">
                    <i className="fas fa-eye"></i>
                  </div>
                  <h3>Our Vision</h3>
                  <p>
                    To be the leading luxury hotel in Nepal, recognized globally for our 
                    commitment to excellence, cultural heritage, and sustainable tourism 
                    practices.
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* History Section */}
      <section className="history-section py-5 bg-light">
        <Container>
          <Row className="align-items-center">
            <Col md={6}>
              <img 
                src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="Hotel History" 
                className="img-fluid rounded shadow"
              />
            </Col>
            <Col md={6}>
              <h2 className="mb-4">Our History</h2>
              <p className="lead">
                Founded in 1990, The Nepalese Hotel has been at the forefront of luxury 
                hospitality in Nepal for over three decades.
              </p>
              <p>
                What started as a small family-owned establishment has grown into one of 
                Nepal's most prestigious hotels. Our journey is marked by continuous 
                innovation, unwavering commitment to service excellence, and deep respect 
                for our cultural heritage.
              </p>
              <div className="milestones mt-4">
                <div className="milestone-item">
                  <span className="year">1990</span>
                  <span className="event">Hotel Establishment</span>
                </div>
                <div className="milestone-item">
                  <span className="year">2005</span>
                  <span className="event">First Luxury Wing Opening</span>
                </div>
                <div className="milestone-item">
                  <span className="year">2015</span>
                  <span className="event">Heritage Wing Launch</span>
                </div>
                <div className="milestone-item">
                  <span className="year">2020</span>
                  <span className="event">30th Anniversary Celebration</span>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Values Section */}
      <section className="values-section py-5">
        <Container>
          <h2 className="text-center mb-5">Our Core Values</h2>
          <Row>
            <Col md={3} className="mb-4">
              <div className="value-card text-center">
                <div className="icon-wrapper mb-3">
                  <i className="fas fa-heart"></i>
                </div>
                <h4>Hospitality</h4>
                <p>Warm, genuine service that makes every guest feel at home.</p>
              </div>
            </Col>
            <Col md={3} className="mb-4">
              <div className="value-card text-center">
                <div className="icon-wrapper mb-3">
                  <i className="fas fa-star"></i>
                </div>
                <h4>Excellence</h4>
                <p>Uncompromising quality in every aspect of our service.</p>
              </div>
            </Col>
            <Col md={3} className="mb-4">
              <div className="value-card text-center">
                <div className="icon-wrapper mb-3">
                  <i className="fas fa-leaf"></i>
                </div>
                <h4>Sustainability</h4>
                <p>Commitment to environmental and social responsibility.</p>
              </div>
            </Col>
            <Col md={3} className="mb-4">
              <div className="value-card text-center">
                <div className="icon-wrapper mb-3">
                  <i className="fas fa-handshake"></i>
                </div>
                <h4>Integrity</h4>
                <p>Honest and ethical business practices.</p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Team Section */}
      <section className="team-section py-5 bg-light">
        <Container>
          <h2 className="text-center mb-5">Our Leadership Team</h2>
          <Row>
            <Col md={4} className="mb-4">
              <Card className="team-card">
                <Card.Img 
                  variant="top" 
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                />
                <Card.Body className="text-center">
                  <h4>Rajesh Sharma</h4>
                  <p className="text-muted">Managing Director</p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-4">
              <Card className="team-card">
                <Card.Img 
                  variant="top" 
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                />
                <Card.Body className="text-center">
                  <h4>Priya Sharma</h4>
                  <p className="text-muted">Operations Director</p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-4">
              <Card className="team-card">
                <Card.Img 
                  variant="top" 
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                />
                <Card.Body className="text-center">
                  <h4>Arun Kumar</h4>
                  <p className="text-muted">Guest Relations Manager</p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
}

export default AboutUs;
