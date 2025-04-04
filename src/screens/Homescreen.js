import React from 'react';
import { Container, Row, Col, Button, Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Homescreen.css';

const Homescreen = () => {
  const carouselItems = [
    {
      image: 'https://files.oaiusercontent.com/file-1Tw9xi6TrcPXsaQCmnTEj7?se=2025-03-19T10%3A39%3A15Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3D428241b0-6dbd-4737-a992-edd91ab57d04.webp&sig=/8SDAhv5iSSsyzj0S/LEarLpYNdft7M9gi9cPg8LV4I%3D',
      title: 'Welcome to Nepalese Hotel',
      description: 'Experience luxury and comfort in the heart of Nepal'
    },
    {
      image: 'https://files.oaiusercontent.com/file-1Tw9xi6TrcPXsaQCmnTEj7?se=2025-03-19T10%3A39%3A15Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3D428241b0-6dbd-4737-a992-edd91ab57d04.webp&sig=/8SDAhv5iSSsyzj0S/LEarLpYNdft7M9gi9cPg8LV4I%3D',
      title: 'Luxurious Accommodations',
      description: 'Choose from our selection of premium rooms and suites'
    },
    {
      image: 'https://files.oaiusercontent.com/file-1Tw9xi6TrcPXsaQCmnTEj7?se=2025-03-19T10%3A39%3A15Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3D428241b0-6dbd-4737-a992-edd91ab57d04.webp&sig=/8SDAhv5iSSsyzj0S/LEarLpYNdft7M9gi9cPg8LV4I%3D',
      title: 'Explore Nepal',
      description: 'Discover the beauty and culture of Nepal'
    }
  ];

  return (
    <div>
      <Carousel className="hero-carousel" controls indicators interval={5000} pause={false}>
        {carouselItems.map((item, index) => (
          <Carousel.Item key={index}>
            <div
              className="carousel-image"
              style={{ backgroundImage: `url(${item.image})` }}
            />
            <Carousel.Caption>
              <h1>{item.title}</h1>
              <p>{item.description}</p>
              <Link to="/rooms">
                <Button variant="warning" size="lg">View Rooms</Button>
              </Link>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>

      {/* Features Section */}
      <section className="py-5">
        <Container>
          <Row>
            <Col md={4} className="mb-4">
              <div className="feature-item text-center">
                <div className="feature-icon">
                  <i className="fas fa-concierge-bell"></i>
                </div>
                <h3>24/7 Service</h3>
                <p>Round-the-clock assistance for all your needs</p>
              </div>
            </Col>
            <Col md={4} className="mb-4">
              <div className="feature-item text-center">
                <div className="feature-icon">
                  <i className="fas fa-spa"></i>
                </div>
                <h3>Luxury Spa</h3>
                <p>Rejuvenate your body and mind</p>
              </div>
            </Col>
            <Col md={4} className="mb-4">
              <div className="feature-item text-center">
                <div className="feature-icon">
                  <i className="fas fa-utensils"></i>
                </div>
                <h3>Fine Dining</h3>
                <p>Exquisite culinary experiences</p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* About Section */}
      <section className="py-5 bg-light">
        <Container>
          <Row className="align-items-center">
            <Col md={6} className="mb-4 mb-md-0">
              <h2>About Nepalese Hotel</h2>
              <p>
                Experience the perfect blend of traditional Nepalese hospitality and modern luxury at our hotel.
                Located in the heart of Nepal, we offer stunning views, world-class amenities, and unforgettable experiences.
              </p>
              <Link to="/aboutus">
                <Button variant="outline-warning">Learn More</Button>
              </Link>
            </Col>
            <Col md={6}>
              <img
                src="https://files.oaiusercontent.com/file-1Tw9xi6TrcPXsaQCmnTEj7?se=2025-03-19T10%3A39%3A15Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3D428241b0-6dbd-4737-a992-edd91ab57d04.webp&sig=/8SDAhv5iSSsyzj0S/LEarLpYNdft7M9gi9cPg8LV4I%3D"
                alt="Hotel"
                className="img-fluid rounded"
              />
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default Homescreen;

