import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Form, InputGroup } from 'react-bootstrap';
import axios from 'axios';
import './PlacesScreen.css';
import '../components/Place.css';
import Place from '../components/Place';

function PlacesScreen() {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    placeType: 'All Types',
    distanceRange: 'Any Distance'
  });

  useEffect(() => {
    const fetchPlaces = async () => {
      setLoading(true);
      setError(false);
      try {
        const response = await axios.get('/api/places');
        console.log('Places API response:', response);
        
        const { data } = response;
        if (Array.isArray(data)) {
          console.log('Places data:', data);
          setPlaces(data);
        } else {
          console.error('Invalid data format received:', data);
          setError('Failed to load places. Please try again later.');
          setPlaces([]);
        }
      } catch (error) {
        console.error('Error fetching places:', error);
        setError(error.response?.data?.message || 'Failed to load places. Please try again later.');
        setPlaces([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPlaces();
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredPlaces = Array.isArray(places) ? places.filter(place => {
    let matches = true;

    if (searchQuery) {
      matches = matches && (
        place.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        place.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        place.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    if (filters.placeType !== 'All Types') {
      matches = matches && place.category === filters.placeType;
    }
    
    if (filters.distanceRange !== 'Any Distance') {
      const [min, max] = filters.distanceRange.split('-').map(Number);
      matches = matches && place.distance >= min && place.distance <= max;
    }
    
    return matches;
  }) : [];

  return (
    <div className="places-screen">
      {loading && <div className="text-center">Loading places...</div>}
      {error && <div className="text-center text-danger">{error}</div>}
      {/* Hero Section */}
      <div className="hero-section" style={{
        backgroundImage: `url('https://res.cloudinary.com/dpblvtdry/image/upload/v1744517873/ChatGPT_Image_Apr_13_2025_10_02_56_AM_fjo14p.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}>
        <div className="overlay"></div>
        <Container className="hero-content text-center text-white">
          <h1 className="display-4">Our Places</h1>
          <p className="lead">Discover the beauty of Nepal</p>
        </Container>
      </div>

      <Container className="py-5">
        <div className="section-header text-center mb-5">
          <h2 className="display-5">Our Places</h2>
          <div className="header-line"></div>
          <p className="lead text-muted">Explore amazing places to visit</p>
          {filteredPlaces.length === 0 && !loading && (
            <p className="text-muted">No places found</p>
          )}
        </div>

        {/* Search and Filters */}
        <Row className="mb-4">
          <Col md={12} className="mb-3">
            <InputGroup>
              {searchQuery && (
                <Button 
                  variant="outline-secondary" 
                  onClick={() => setSearchQuery('')}
                >
                  Clear
                </Button>
              )}
            </InputGroup>
          </Col>
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
                <option>Popular Places</option>
                <option>Trekking Destination</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Distance Range (km)</Form.Label>
              <Form.Select
                name="distanceRange"
                value={filters.distanceRange}
                onChange={handleFilterChange}
              >
                <option>Any Distance</option>
                <option value="0-100">0 - 100 km</option>
                <option value="101-200">101 - 200 km</option>
                <option value="201-300">201 - 300 km</option>
                <option value="301-500">300 - 400 km</option>
                <option value="301-500">400+ km</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        {/* Places Grid */}
        <Row>
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : error ? (
            <div className="text-center py-5">
              <h3>Error fetching places</h3>
              <Button variant="primary" onClick={() => {
                const fetchPlaces = async () => {
                  try {
                    const { data } = await axios.get('http://localhost:5000/api/places');
                    setPlaces(data);
                  } catch (error) {
                    console.error('Error fetching places:', error);
                  }
                };

                fetchPlaces();
              }}>
                Try Again
              </Button>
            </div>
          ) : (
            filteredPlaces.map((place) => (
              <Col key={place._id} lg={4} md={6} className="mb-4">
                <Place place={place} />
              </Col>
            ))
          )}

          {!loading && !error && filteredPlaces.length === 0 && (
            <div className="text-center py-5">
              <h3>No places match your filters</h3>
              <Button 
                variant="primary" 
                onClick={() => {
                  setFilters({
                    placeType: 'All Types',
                    distanceRange: 'Any Distance'
                  });
                  setSearchQuery('');
                }}
              >
                Clear All Filters
              </Button>
            </div>
          )}
        </Row>
      </Container>
    </div>
  );
}

export default PlacesScreen; 