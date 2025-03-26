import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Room from '../components/Room';
import './RoomsScreen.css';

function RoomsScreen() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

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
            rooms.map((room) => (
              <Col key={room._id} lg={4} md={6} className="mb-4">
                <Room room={room} />
              </Col>
            ))
          )}
          
          {!loading && !error && rooms.length === 0 && (
            <div className="text-center py-5">
              <h3>No rooms available</h3>
            </div>
          )}
        </Row>
      </Container>
    </div>
  );
}

export default RoomsScreen; 