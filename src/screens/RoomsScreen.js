import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Form, InputGroup } from 'react-bootstrap';
import axios from 'axios';
import Room from '../components/Room';
import './RoomsScreen.css';

function RoomsScreen() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    roomType: 'All Types',
    priceRange: 'All Prices',
    capacity: 'Any Capacity'
  });

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      setLoading(true);
      setError(false);
      const response = await axios.get('/api/rooms/getallrooms');
      setRooms(response.data);
    } catch (error) {
      setError(true);
      console.error('Error fetching rooms:', error);
    } finally {
      setLoading(false);
    }
  };

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

  const filteredRooms = rooms.filter(room => {
    let matches = true;

    // Apply search filter
    if (searchQuery) {
      matches = matches && (
        room.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        room.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        room.type.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    if (filters.roomType !== 'All Types') {
      matches = matches && room.type === filters.roomType;
    }
    
    if (filters.priceRange !== 'All Prices') {
      const [min, max] = filters.priceRange.split('-').map(Number);
      matches = matches && room.rentperday >= min && room.rentperday <= max;
    }
    
    if (filters.capacity !== 'Any Capacity') {
      matches = matches && room.maxcount === parseInt(filters.capacity);
    }
    
    return matches;
  });

  return (
    <div className="rooms-screen">
      {/* Hero Section */}
      <div className="hero-section" style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}>
        <div className="overlay"></div>
        <Container className="hero-content text-center text-white">
          <h1 className="display-4">Our Rooms</h1>
          <p className="lead">A Legacy of Comfort Since 1990</p>
        </Container>
      </div>

      <Container className="py-5">
        {/* Section Header */}
        <div className="section-header text-center mb-5">
          <h2 className="display-5">Our Rooms</h2>
          <div className="header-line"></div>
          <p className="lead text-muted">Experience luxury and comfort in every stay</p>
        </div>

        {/* Search and Filters */}
        <Row className="mb-4">
          <Col md={12} className="mb-3">
            <InputGroup>
              <Form.Control
                placeholder="Search rooms by name, description, or type..."
                value={searchQuery}
                onChange={handleSearchChange}
              />
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
          <Col md={4}>
            <Form.Group>
              <Form.Label>Room Type</Form.Label>
              <Form.Select
                name="roomType"
                value={filters.roomType}
                onChange={handleFilterChange}
              >
                <option>All Types</option>
                <option>Deluxe</option>
                <option>Standard</option>
                <option>Suite</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group>
              <Form.Label>Price Range</Form.Label>
              <Form.Select
                name="priceRange"
                value={filters.priceRange}
                onChange={handleFilterChange}
              >
                <option>All Prices</option>
                <option value="0-1000">$0 - $1000</option>
                <option value="1001-2000">$1001 - $2000</option>
                <option value="2001-3000">$2001 - $3000</option>
                <option value="3001-5000">$3001+</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group>
              <Form.Label>Capacity</Form.Label>
              <Form.Select
                name="capacity"
                value={filters.capacity}
                onChange={handleFilterChange}
              >
                <option>Any Capacity</option>
                <option value="1">1 Person</option>
                <option value="2">2 People</option>
                <option value="4">4 People</option>
                <option value="6">6 People</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        {/* Rooms Grid */}
        <Row>
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : error ? (
            <div className="text-center py-5">
              <h3>Error fetching rooms</h3>
              <Button variant="primary" onClick={fetchRooms}>
                Try Again
              </Button>
            </div>
          ) : (
            filteredRooms.map((room) => (
              <Col key={room._id} lg={4} md={6} className="mb-4">
                <Room room={room} />
              </Col>
            ))
          )}

          {!loading && !error && filteredRooms.length === 0 && (
            <div className="text-center py-5">
              <h3>No rooms match your filters</h3>
              <Button 
                variant="primary" 
                onClick={() => {
                  setFilters({
                    roomType: 'All Types',
                    priceRange: 'All Prices',
                    capacity: 'Any Capacity'
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

export default RoomsScreen; 