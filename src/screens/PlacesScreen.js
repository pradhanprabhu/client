import React, { useState } from 'react';
import { Container, Row, Col, Button, Modal, Form } from 'react-bootstrap';
import './PlacesScreen.css';

function PlacesScreen() {
  const [showModal, setShowModal] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [filters, setFilters] = useState({
    placeType: 'All Types',
    distance: 'Any Distance'
  });

  const handleClose = () => setShowModal(false);
  const handleShow = (place) => {
    setSelectedPlace(place);
    setShowModal(true);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Places data
  const places = [
    {
      name: "Phewa Lake",
      image: "https://www.nepalsanctuarytreks.com/wp-content/uploads/2018/11/phewa-lake.png",
      description: "The second largest lake in Nepal with stunning views of the Annapurna range.",
      location: "Pokhara, Nepal",
      bestTime: "October to March",
      fullDescription: "Phewa Lake is a freshwater lake in Pokhara that offers breathtaking reflections of the Annapurna and Dhaulagiri ranges. The lake features the famous Tal Barahi Temple on an island and is perfect for boating, fishing, and watching stunning sunsets.",
      category: "Lake",
      distance: "200"
    },
    {
      name: "Pashupatinath Temple",
      image: "https://dwq3yv87q1b43.cloudfront.net/public/blogs/fit-in/1200x675/Blog_20250110-1245282677-1736491311.jpg",
      description: "One of the most sacred Hindu temples dedicated to Lord Shiva.",
      location: "Kathmandu, Nepal",
      bestTime: "March to October",
      fullDescription: "Pashupatinath Temple is one of the most sacred Hindu temples in the world. Located on the banks of the Bagmati River, it's a UNESCO World Heritage Site and the center of Hindu pilgrimage in Nepal. The temple complex includes various shrines, ashrams, and cremation ghats.",
      category: "Heritage",
      distance: "50"
    },
    {
      name: "Mount Everest",
      image: "https://alpenglowexpeditions.com/wp-content/uploads/2017/05/everest_rgb_everest-2330x1800.jpg",
      description: "The world's highest peak and ultimate mountaineering destination.",
      location: "Solukhumbu District, Nepal",
      bestTime: "March to May, September to November",
      fullDescription: "Mount Everest, standing at 8,848.86 meters, is Earth's highest mountain above sea level. The mountain attracts climbers of all levels, from novice trekkers to experienced mountaineers. The journey to Everest Base Camp offers stunning views and an unforgettable adventure.",
      category: "Mountain",
      distance: "400"
    }
  ];

  const filteredPlaces = places.filter(place => {
    let matches = true;
    
    if (filters.placeType !== 'All Types') {
      matches = matches && place.category === filters.placeType;
    }
    
    if (filters.distance !== 'Any Distance') {
      const [min, max] = filters.distance.split('-').map(Number);
      matches = matches && place.distance >= min && place.distance <= max;
    }
    
    return matches;
  });

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

        {/* Filters */}
        <Row className="mb-4">
          <Col md={6}>
            <Form.Group>
              <Form.Label>Place Type</Form.Label>
              <Form.Select
                name="placeType"
                value={filters.placeType}
                onChange={handleFilterChange}
              >
                <option>All Types</option>
                <option>Lake</option>
                <option>Heritage</option>
                <option>Mountain</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Distance from Kathmandu (km)</Form.Label>
              <Form.Select
                name="distance"
                value={filters.distance}
                onChange={handleFilterChange}
              >
                <option>Any Distance</option>
                <option value="0-100">0 - 100 km</option>
                <option value="101-200">101 - 200 km</option>
                <option value="201-300">201 - 300 km</option>
                <option value="301-500">300+ km</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        {/* Places Grid */}
        <Row>
          {filteredPlaces.map((place, index) => (
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

          {filteredPlaces.length === 0 && (
            <div className="text-center py-5">
              <h3>No places match your filters</h3>
              <Button 
                variant="primary" 
                onClick={() => setFilters({
                  placeType: 'All Types',
                  distance: 'Any Distance'
                })}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </Row>
      </Container>

      {/* Place Details Modal */}
      <Modal show={showModal} onHide={handleClose} size="lg">
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