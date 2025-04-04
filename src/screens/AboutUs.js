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
                  src="https://scontent.fktm17-1.fna.fbcdn.net/v/t39.30808-6/481670689_2081867788948222_2613998384074175959_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=v9dq5_j6x0QQ7kNvgGcQY7B&_nc_oc=AdlN0BBDxCPju6ngfmKuq-TSI4c472Io-7SgC0D6i3O6kJnuMJiHwyVBp0CDqyYr9SSy96dlnos0TV6LboRJ9fM1&_nc_zt=23&_nc_ht=scontent.fktm17-1.fna&_nc_gid=VIecbSTbQvqLjvncJLpNIA&oh=00_AYG4xK9LcLBT2DLL_3tdPSV3QXUq6jjrE-Yqi-lfwpCCyw&oe=67EEF47E"
                />
                <Card.Body className="text-center">
                  <h4>Prabhu Pradhan</h4>
                  <p className="text-muted">Managing Director</p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-4">
              <Card className="team-card">
                <Card.Img 
                  variant="top" 
                  src="https://scontent.fktm17-1.fna.fbcdn.net/v/t39.30808-6/481776596_1385647846143454_5906989994570467601_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=833d8c&_nc_ohc=j6CX-Me2ph0Q7kNvgFqrpUn&_nc_oc=AdmDHkALKVmnF33gNJIS8_PB7Pm89X7h2qaPndFpsD7TuTGZLR0-y6J4Pudu7aQX4fbv2Z2xJnN4OvEpUZNVs4Cv&_nc_zt=23&_nc_ht=scontent.fktm17-1.fna&_nc_gid=rAyAcsbjrHvKeReq8j0TQA&oh=00_AYFJQTukcXcaxpyAXA1k9bNiclMu39kuMEvI-_GtElEXHw&oe=67EEF4C6"
                />
                <Card.Body className="text-center">
                  <h4>Gita Pradhan</h4>
                  <p className="text-muted">Operations Director</p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-4">
              <Card className="team-card">
                <Card.Img 
                  variant="top" 
                  src="https://scontent.fktm17-1.fna.fbcdn.net/v/t1.6435-9/69884353_2649344891783102_7355625986869690368_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=a5f93a&_nc_ohc=n2Lbqk9MSQ8Q7kNvgG1mrJB&_nc_oc=AdnxvfxuaWPxCXVaHMNMhd9oBymT8JoNo4SdlTK8nXbYePnNvXNxXr8ECYNyO3dEdkanUZX9YvxTaAhrWoZ67Il3&_nc_zt=23&_nc_ht=scontent.fktm17-1.fna&_nc_gid=Cy3TFNkJWEgnhi0RMhhYug&oh=00_AYHkK_meezYepC3bkO0cQplQFAridTSERgZgEzCZV5BR-Q&oe=6810705D"
                />
                <Card.Body className="text-center">
                  <h4>Bimal Pradhan</h4>
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
