import React, { useState } from 'react';
import { Container, Row, Col, Button, Modal } from 'react-bootstrap';
import './PlacesScreen.css';

function PlacesScreen() {
  const [showModal, setShowModal] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState(null);

  const handleClose = () => setShowModal(false);
  const handleShow = (place) => {
    setSelectedPlace(place);
    setShowModal(true);
  };

  // Places data
  const places = [
    {
      name: "Phewa Lake",
      image: "https://images.unsplash.com/photo-1589308454676-21178b360ab6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      description: "The second largest lake in Nepal with stunning views of the Annapurna range.",
      location: "Pokhara, Nepal",
      bestTime: "October to March",
      fullDescription: "Phewa Lake is a freshwater lake in Pokhara that offers breathtaking reflections of the Annapurna and Dhaulagiri ranges. The lake features the famous Tal Barahi Temple on an island and is perfect for boating, fishing, and watching stunning sunsets.",
      category: "Lake"
    },
    {
      name: "Pashupatinath Temple",
      image: "https://images.unsplash.com/photo-1582653291997-079a1c04e0a1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      description: "One of the most sacred Hindu temples dedicated to Lord Shiva.",
      location: "Kathmandu, Nepal",
      bestTime: "March to October",
      fullDescription: "Pashupatinath Temple is one of the most sacred Hindu temples in the world. Located on the banks of the Bagmati River, it's a UNESCO World Heritage Site and the center of Hindu pilgrimage in Nepal. The temple complex includes various shrines, ashrams, and cremation ghats.",
      category: "Heritage"
    },
    {
      name: "Mount Everest",
      image: "https://images.unsplash.com/photo-1522050212171-61b01dd24579?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      description: "The world's highest peak and ultimate mountaineering destination.",
      location: "Solukhumbu District, Nepal",
      bestTime: "March to May, September to November",
      fullDescription: "Mount Everest, standing at 8,848.86 meters, is Earth's highest mountain above sea level. The mountain attracts climbers of all levels, from novice trekkers to experienced mountaineers. The journey to Everest Base Camp offers stunning views and an unforgettable adventure.",
      category: "Mountain"
    }
  ];

  return (
    <div className="places-screen">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="overlay"></div>
        <Container className="hero-content text-center text-white">
          <h1 className="display-4">Discover Nepal</h1>
          <p className="lead">A Legacy of Natural Beauty Since 1990</p>
        </Container>
      </div>

      <Container className="py-5">
        {/* Section Header */}
        <div className="section-header text-center mb-5">
          <h2 className="display-5">Discover Nepal</h2>
          <div className="header-line"></div>
          <p className="lead text-muted">Explore the wonders of our beautiful country</p>
        </div>

        {/* Places Grid */}
        <Row>
          {places.map((place, index) => (
            <Col key={index} lg={4} md={6} className="mb-4">
              <div className="place-card">
                <div 
                  className="place-image"
                  style={{ backgroundImage: `url(${place.image})` }}
                >
                  <div className="category-badge">{place.category}</div>
                </div>
                <div className="place-content">
                  <h3>{place.name}</h3>
                  <p className="location">
                    <i className="fas fa-map-marker-alt"></i> {place.location}
                  </p>
                  <p className="description">{place.description}</p>
                  <Button 
                    variant="outline-primary" 
                    onClick={() => handleShow(place)}
                  >
                    View Details
                  </Button>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Place Details Modal */}
      <Modal show={showModal} onHide={handleClose} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>{selectedPlace?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedPlace && (
            <div className="place-details">
              <div 
                className="place-details-image"
                style={{ backgroundImage: `url(${selectedPlace.image})` }}
              ></div>
              <div className="place-details-content">
                <div className="detail-item">
                  <h4>Location</h4>
                  <p>{selectedPlace.location}</p>
                </div>
                <div className="detail-item">
                  <h4>Best Time to Visit</h4>
                  <p>{selectedPlace.bestTime}</p>
                </div>
                <div className="detail-item">
                  <h4>Description</h4>
                  <p>{selectedPlace.fullDescription}</p>
                </div>
              </div>
            </div>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default PlacesScreen; 