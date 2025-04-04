import React, { useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import RoomDetailsModal from './RoomDetailsModal';
import './Room.css';

function Room({ room }) {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const handleBookNow = () => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (!userInfo) {
      alert('Please login to book a room');
      navigate('/login');
      return;
    }
    navigate('/booking-confirmation', { state: { room } });
  };

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
          <div className="room-info">
            <p><strong>Type:</strong> {room.type}</p>
            <p><strong>Max Capacity:</strong> {room.maxcount} persons</p>
            <p><strong>Price:</strong> ${room.rentperday} per night</p>
          </div>
          <div className="d-flex gap-2">
            <Button variant="primary" onClick={handleShow}>
              View Details
            </Button>
            <Button variant="success" onClick={handleBookNow}>
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


