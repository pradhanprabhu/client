import React, { useState } from 'react';
import { Card, Button, Modal, Carousel } from 'react-bootstrap';
import './Place.css';

function Place({ place }) {
  if (!place) {
    return null; // Don't render anything if place is undefined
  }
  const [showModal, setShowModal] = useState(false);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  return (
    <>
      <Card className="place-card">
        <Card.Img 
          variant="top" 
          src={place.images && place.images.length > 0 ? place.images[0] : '/images/default-place.jpg'} 
          alt={place.name || 'Place Image'}
        />
        <Card.Body>
          <Card.Title>{place.name || 'Unnamed Place'}</Card.Title>
          <Card.Text>{(place.description || '').substring(0, 100)}...</Card.Text>
          <Card.Text className="text-muted">
            <i className="fas fa-map-marker-alt"></i> {place.distance || 0} km from Kathmandu
          </Card.Text>
          <Button variant="primary" onClick={handleShow}>View Details</Button>
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{place.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Carousel>
            {place.images && place.images.map((url, index) => (
              <Carousel.Item key={index}>
                <img
                  className="d-block w-100"
                  src={url}
                  alt={`${place.name} - Image ${index + 1}`}
                  style={{ height: '400px', objectFit: 'cover' }}
                />
              </Carousel.Item>
            ))}
          </Carousel>
          <div className="mt-3">
            <p>{place.description || 'No description available.'}</p>
            <p><strong>Location:</strong> {place.location || 'Location not specified'}</p>
            <p><strong>Distance:</strong> {place.distance || 0} km from Kathmandu</p>
            <p><strong>Best Time to Visit:</strong> {place.bestTime || 'Not specified'}</p>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Place; 