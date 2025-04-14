import React from 'react';
import { Container, Row, Col, Button, Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Homescreen.css';

const Homescreen = () => {
  const carouselItems = [
    {
      image: 'https://res.cloudinary.com/dpblvtdry/image/upload/v1744517422/ChatGPT_Image_Apr_13_2025_09_55_28_AM_rnisux.png',
      title: 'Welcome to Nepalese Hotel',
      description: 'Experience luxury and comfort in the heart of Nepal'
    },
    {
      image: 'https://res.cloudinary.com/dpblvtdry/image/upload/v1744517328/ChatGPT_Image_Apr_13_2025_09_53_50_AM_acdcox.png',
      title: 'Luxurious Accommodations',
      description: 'Choose from our selection of premium rooms and suites'
    },
    {
      image: 'https://res.cloudinary.com/dpblvtdry/image/upload/v1744517873/ChatGPT_Image_Apr_13_2025_10_02_56_AM_fjo14p.png',
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
                src="https://res.cloudinary.com/dpblvtdry/image/upload/v1744518538/ChatGPT_Image_Apr_13_2025_10_13_32_AM_ksb9il.png"
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