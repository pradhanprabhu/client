import React, { useState, useEffect, useMemo } from 'react';
import { Modal, Carousel } from 'react-bootstrap';
import './RoomDetailsModal.css';

const RoomDetailsModal = ({ show, handleClose, room }) => {
  const [index, setIndex] = useState(0);

  const carouselItems = useMemo(() => 
    room?.imageurls?.map((url, idx) => (
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
        prevIndex === (room?.imageurls?.length || 1) - 1 ? 0 : prevIndex + 1
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
              <strong><i className="fas fa-rupee-sign"></i> Rent per day:</strong> ₹{room.rentperday}
            </div>
            <div className="detail-item">
              <strong><i className="fas fa-users"></i> Max Count:</strong> {room.maxcount} persons
            </div>
            <div className="detail-item">
              <strong><i className="fas fa-phone"></i> Phone:</strong> {room.phonenumber}
            </div>
          </div>

          <h4 className="mt-4">Description</h4>
          <p>{room.description}</p>

          {room.facilities && (
            <>
              <h4 className="mt-4">Room Amenities</h4>
              <div className="facilities-grid">
                {typeof room.facilities === 'string' 
                  ? room.facilities.split(/[,\s]+/).filter(f => f.trim()).map((facility, idx) => (
                      <div key={idx} className="facility-item">
                        <i className={`fas ${getFacilityIcon(facility.trim())}`}></i>
                        <span>{facility.trim()}</span>
                      </div>
                    ))
                  : room.facilities.map((facility, idx) => (
                      <div key={idx} className="facility-item">
                        <i className={`fas ${getFacilityIcon(facility.trim())}`}></i>
                        <span>{facility.trim()}</span>
                      </div>
                    ))
                }
              </div>
            </>
          )}
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default RoomDetailsModal; 