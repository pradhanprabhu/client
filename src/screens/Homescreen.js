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
      <Carousel className="hero-carousel" controls indicators interval={4000} pause={false}>
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
                Nestled in a vibrant urban setting, Nepalese Hotel offers a perfect blend of modern comfort and 
                traditional charm, making it a welcoming retreat for travelers from all walks of life. Designed with subtle Himalayan
                influences and warm Nepali hospitality, the hotel provides guests with a serene atmosphere amid the hustle and bustle
                of the city. Each room is thoughtfully furnished, combining contemporary design with cultural elements, ensuring a relaxing
                and culturally enriching stay.Guests at Nepalese Hotel can enjoy a wide range of amenities, including complimentary Wi-Fi, an 
                in-house restaurant serving authentic Nepali and international cuisine, and a rooftop terrace offering panoramic views of the city skyline.
                The hotel's location is ideal for both business and leisure travelers, with key attractions, shopping areas, and transportation hubs just a short
                distance away. Whether you're visiting for a short city break or an extended stay, the dedicated staff ensures personalized service and a memorable experience.
                With a focus on comfort, cleanliness, and cultural immersion, Nepalese Hotel stands out as a top choice for those seeking a peaceful yet connected place to stay.
                 Experience the warmth of Nepalese hospitality in a setting that feels just like home—only more indulgent
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