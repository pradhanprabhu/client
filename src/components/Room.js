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
      // Store the current room ID in localStorage to redirect back after login
      localStorage.setItem('bookingRoomId', room._id);
      navigate('/login');
    } else {
      // If user is logged in, navigate directly to booking page with room data
      navigate(`/book/${room._id}`, { state: { room } });
    }
  };

  // Default image if no images are available
  const defaultImage = 'https://picsum.photos/300/200';

  return (
    <>
      <Card className="room-card mb-4">
        <Card.Img 
          variant="top" 
          src={room?.images?.length > 0 ? room.images[0] : defaultImage} 
          className="card-img"
          alt={room?.name || 'Room Image'}
          onError={(e) => {
            e.target.onerror = null; // Prevent infinite loop
            e.target.src = defaultImage;
          }}
        />
        <Card.Body>
          <Card.Title>{room?.name || 'Room Name Not Available'}</Card.Title>
          <div className="room-info">
            <p><strong>Type:</strong> {room?.type || 'Not Specified'}</p>
            <p><strong>Max Capacity:</strong> {room?.capacity || 0} persons</p>
            <p><strong>Price:</strong> ₹{room?.price || 0} per night</p>
          </div>
          <div className="d-flex gap-2">
            <Button variant="primary" onClick={handleShow}>
              View Details
            </Button>
            <Button 
              variant="success" 
              onClick={handleBookNow}
              disabled={!room?.availability}
            >
              {room?.availability ? 'Book Now' : 'Not Available'}
            </Button>
          </div>
        </Card.Body>
      </Card>

      {room && (
        <RoomDetailsModal 
          show={showModal} 
          handleClose={handleClose} 
          room={room}
        />
      )}
    </>
  );
}

export default Room;