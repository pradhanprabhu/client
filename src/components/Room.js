import React, { useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import RoomDetailsModal from './RoomDetailsModal';
import './Room.css';

function Room({ room }) {
  const [showModal, setShowModal] = useState(false);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  return (
    <>
      <Card className="room-card mb-4">
        <Card.Img 
          variant="top" 
          src={room.imageurls[0]} 
          className="card-img"
          alt={room.name}
        />
        <Card.Body>
          <Card.Title>{room.name}</Card.Title>
          <div className="d-flex justify-content-between">
            <Button variant="primary" onClick={handleShow}>
              View Details
            </Button>
            <Button variant="success">
              Book Now
            </Button>
          </div>
        </Card.Body>
      </Card>

      <RoomDetailsModal 
        show={showModal} 
        handleClose={handleClose} 
        room={room}
      />
    </>
  );
}

export default Room;


