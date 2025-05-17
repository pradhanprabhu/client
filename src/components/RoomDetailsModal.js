import React, { useState, useEffect, useMemo } from 'react';
import { Modal, Carousel, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './RoomDetailsModal.css';

const RoomDetailsModal = ({ show, handleClose, room }) => {
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();

  const handleBookNow = () => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (!userInfo) {
      // Store the current room ID in localStorage to redirect back after login
      localStorage.setItem('bookingRoomId', room._id);
      navigate('/login');
    } else {
      // If user is logged in, navigate directly to booking page with room data
      navigate(`/book/${room._id}`, { state: { room } });
    }
  };

  const carouselItems = useMemo(() => 
    room?.images?.map((url, idx) => (
      <Carousel.Item key={idx}>
        <img
          className="d-block w-100 carousel-image"
          src={url}
          alt={`Room ${idx + 1}`}
        />
      </Carousel.Item>
    )) || [], [room?.imageurls]
  );

  // Auto slide images every 3 seconds
  useEffect(() => {
    if (!show) return;

    const timer = setInterval(() => {
      setIndex((prevIndex) => 
        prevIndex === (room?.images?.length || 1) - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(timer);
  }, [show, room?.imageurls?.length]);

  if (!room) return null;

  // Map facility names to appropriate Font Awesome icons
  const getFacilityIcon = (facility) => {
    const facilityIcons = {
      'wifi': 'fa-wifi',
      'ac': 'fa-snowflake',
      'tv': 'fa-tv',
      'breakfast': 'fa-utensils',
      'parking': 'fa-parking',
      'laundry': 'fa-tshirt',
      'minibar': 'fa-glass-martini-alt',
      'room service': 'fa-concierge-bell',
      'gym': 'fa-dumbbell',
      'spa': 'fa-spa',
      'pool': 'fa-swimming-pool',
      'restaurant': 'fa-utensils',
      'bar': 'fa-glass-cheers',
      'security': 'fa-shield-alt',
      'housekeeping': 'fa-broom',
    };

    // Convert facility to lowercase and find matching icon
    const facilityLower = facility.toLowerCase();
    const iconClass = facilityIcons[facilityLower] || 'fa-check';
    return iconClass;
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>{room.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Carousel activeIndex={index} onSelect={setIndex} interval={null}>
          {carouselItems}
        </Carousel>

        <div className="room-details mt-4">
          <h4>Room Details</h4>
          <div className="details-grid">
            <div className="detail-item">
              <strong><i className="fas fa-bed"></i> Type:</strong> {room.type}
            </div>
            <div className="detail-item">
              <strong><i class="fa-solid fa-indian-rupee-sign"></i> Rent per day:</strong> ₹{room.price}
            </div>
            <div className="detail-item">
              <strong><i className="fas fa-users"></i> Max Count:</strong> {room.capacity} persons
            </div>
          </div>

          <h4 className="mt-4">Description</h4>
          <p>{room.description}</p>

          {room.amenities && room.amenities.length > 0 && (
            <div className="facilities-section">
              <h3 className="section-title">
                <i className="fas fa-concierge-bell"></i>
                Available Amenities
              </h3>
              <div className="facilities-grid">
                {(Array.isArray(room.amenities) ? room.amenities : room.amenities.split(',')).map((facility, idx) => (
                  <div key={idx} className="facility-item">
                    <div className="facility-icon">
                      <i className={`fas ${getFacilityIcon(facility.trim())}`}></i>
                    </div>
                    <span className="facility-name">{facility.trim()}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button 
          variant="success" 
          onClick={handleBookNow}
          disabled={!room?.availability}
        >
          {room?.availability ? 'Book Now' : 'Not Available'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RoomDetailsModal; 