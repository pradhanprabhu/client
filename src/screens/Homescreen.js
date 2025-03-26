import React from 'react';
import { Container, Row, Col, Button, Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Homescreen.css';

const Homescreen = () => {
  const carouselItems = [
    {
      image: 'https://files.oaiusercontent.com/file-1Tw9xi6TrcPXsaQCmnTEj7?se=2025-03-20T08%3A04%3A05Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3D428241b0-6dbd-4737-a992-edd91ab57d04.webp&sig=AKQ5LFPtLLwO2mpE6RJnn6d349Iepp70QKS7tyz4Mao%3D',
      title: 'Welcome to Nepalese Hotel',
      description: 'Experience luxury and comfort in the heart of Nepal',
      link: '/rooms',
      buttonText: 'BOOK NOW'
    },
    {
      image: 'https://files.oaiusercontent.com/file-KDctLJCuigk9caBHN8cde7?se=2025-03-20T08%3A04%3A05Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3D8d678e64-1a3f-48ce-9483-260116994e75.webp&sig=bVxU8PtxlGiio56mefpiEScDsLSYFrTenKxMusEX%2BoE%3D',
      title: 'Luxurious Rooms & Suites',
      description: 'Discover our elegant rooms with modern amenities',
      link: '/rooms',
      buttonText: 'VIEW ROOMS'
    },
    {
      image: '',
      title: 'Explore Beautiful Nepal',
      description: 'Discover the most beautiful destinations in Nepal',
      link: '/places',
      buttonText: 'EXPLORE PLACES'
    },
  ];

  return (
    <div>
      <Carousel className="hero-carousel" controls indicators interval={5000} pause={false}>
        {carouselItems.map((item, index) => (
          <Carousel.Item key={index}>
            <div 
              className="carousel-image"
              style={{ backgroundImage: `url(${item.image})` }}
            >
              <div className="carousel-caption">
                <h1>{item.title}</h1>
                <p>{item.description}</p>
                <Link to={item.link}>
                  <Button variant="warning" size="lg">
                    {item.buttonText}
                  </Button>
                </Link>
              </div>
            </div>
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
      <section className="about-section py-5 bg-light">
        <Container>
          <Row className="align-items-center">
            <Col md={6}>
              <img
                src="https://files.oaiusercontent.com/file-KDctLJCuigk9caBHN8cde7?se=2025-03-19T05%3A58%3A24Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3D8d678e64-1a3f-48ce-9483-260116994e75.webp&sig=48C1a%2Bf2fNbkrWkrp2P5I85wJfzVHQw1kbXKyfYAXX4%3D"
                alt="Hotel Exterior"
                className="img-fluid rounded"
              />
            </Col>
            <Col md={6}>
              <h2>About Our Hotel</h2>
              <p className="lead">
                Experience the perfect blend of traditional Nepalese hospitality and modern luxury.
              </p>
              <p>
                Located in the heart of Nepal, our hotel offers a unique experience that combines
                comfort, culture, and exceptional service. With stunning views and world-class
                amenities, we ensure your stay is nothing short of extraordinary.
              </p>
              <Link to="/aboutus" className="btn btn-outline-primary">
                Learn More
              </Link>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
}

export default Homescreen;

