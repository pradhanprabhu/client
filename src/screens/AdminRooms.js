import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Table, Button, Modal, Form, Row, Col, Badge } from 'react-bootstrap';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import './AdminRooms.css';

const AdminRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingRoom, setEditingRoom] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    description: '',
    price: '',
    capacity: '',
    amenities: '',
    images: '',
    availability: true
  });

  const [errors, setErrors] = useState({
    price: '',
    capacity: '',
    images: '',
    amenities: ''
  });

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const { data } = await axios.get('/api/rooms');
      setRooms(data);
    } catch (error) {
      console.error('Error fetching rooms:', error);
    }
  };

  const handleEdit = (room) => {
    setEditingRoom(room);
    setFormData({
      name: room.name,
      type: room.type,
      description: room.description,
      price: room.price,
      capacity: room.capacity,
      amenities: room.amenities,
      images: room.images.join(', '),
      availability: room.availability
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this room?')) {
      try {
        await axios.delete(`/api/rooms/${id}`);
        fetchRooms();
      } catch (error) {
        console.error('Error deleting room:', error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const price = Number(formData.price);
    const capacity = Number(formData.capacity);

    // Reset errors
    setErrors({
      price: '',
      capacity: '',
      images: '',
      amenities: ''
    });

    let valid = true;

    // Price validation: must be between ₹1000 and ₹50000
    if (price < 1000 || price > 50000) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        price: "Price must be between ₹1000 and ₹50000."
      }));
      valid = false;
    }

    // Capacity validation: must be between 1 and 10
    if (capacity < 1 || capacity > 10) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        capacity: "Capacity must be between 1 and 10."
      }));
      valid = false;
    }

    // Image validation: must not be empty and should be a valid URL
    if (!formData.images || !isValidUrl(formData.images)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        images: "Please enter a valid image URL."
      }));
      valid = false;
    }

    // Amenities validation: should not be empty
    if (!formData.amenities || formData.amenities.trim() === '') {
      setErrors((prevErrors) => ({
        ...prevErrors,
        amenities: "Amenities field cannot be empty."
      }));
      valid = false;
    }

    if (!valid) {
      return;
    }

    try {
      const updatedData = {
        ...formData,
        price,
        capacity
      };

      if (editingRoom) {
        await axios.put(`/api/rooms/${editingRoom._id}`, updatedData);
      } else {
        await axios.post('/api/rooms', updatedData);
      }

      setShowModal(false);
      setFormData({
        name: '',
        type: '',
        description: '',
        price: '',
        capacity: '',
        amenities: '',
        images: '',
        availability: true
      });
      fetchRooms();
    } catch (error) {
      console.error('Error saving room:', error);
      alert(error.response?.data?.message || "Something went wrong.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'images') {
      const imageArray = value.split(',').map(url => url.trim()).filter(url => url !== '');
      setFormData({ ...formData, [name]: imageArray.join(', ') });
    } else if (name === 'availability') {
      setFormData({ ...formData, [name]: value === 'true' });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleAddRoom = () => {
    setEditingRoom(null);
    setFormData({
      name: '',
      type: '',
      description: '',
      price: '',
      capacity: '',
      amenities: '',
      images: '',
      availability: true
    });
    setShowModal(true);
  };

  const isValidUrl = (url) => {
    const pattern = new RegExp('https?://[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)+(/.*)?');
    return pattern.test(url);
  };

  return (
    <Container className="admin-rooms-container">
      <div className="admin-rooms-header">
        <div className="d-flex justify-content-between align-items-center">
          <h1>Manage Rooms</h1>
          <Button variant="primary" onClick={handleAddRoom} className="add-room-btn">
            <FaPlus className="me-2" /> Add New Room
          </Button>
        </div>
      </div>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Price</th>
            <th>Capacity</th>
            <th>Description</th>
            <th>Amenities</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rooms.map(room => (
            <tr key={room._id}>
              <td>{room.name}</td>
              <td>{room.type}</td>
              <td>₹{room.price}</td>
              <td>{room.capacity} people</td>
              <td>{room.description}</td>
              <td>{room.amenities}</td>
              <td>
                {room.availability ? (
                  <Badge bg="success">Available</Badge>
                ) : (
                  <Badge bg="danger">Unavailable</Badge>
                )}
              </td>
              <td>
                <Button
                  variant="outline-primary"
                  size="sm"
                  className="me-2"
                  onClick={() => handleEdit(room)}
                >
                  <FaEdit /> Edit
                </Button>
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => handleDelete(room._id)}
                >
                  <FaTrash /> Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{editingRoom ? 'Edit Room' : 'Add New Room'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Room Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Room Type</Form.Label>
                  <Form.Control
                    type="text"
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Price per Night (₹)</Form.Label>
                  <Form.Control
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    min={1000}
                    max={50000}
                    required
                  />
                  {errors.price && <div className="text-danger">{errors.price}</div>}
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Capacity</Form.Label>
                  <Form.Control
                    type="number"
                    min="1"
                    max="10"
                    name="capacity"
                    value={formData.capacity}
                    onChange={handleInputChange}
                    required
                  />
                  {errors.capacity && <div className="text-danger">{errors.capacity}</div>}
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Amenities (comma separated)</Form.Label>
              <Form.Control
                type="text"
                name="amenities"
                value={formData.amenities}
                onChange={handleInputChange}
                required
              />
              {errors.amenities && <div className="text-danger">{errors.amenities}</div>}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Image URLs (comma separated)</Form.Label>
              <Form.Control
                type="text"
                name="images"
                value={formData.images}
                onChange={handleInputChange}
                required
              />
              {errors.images && <div className="text-danger">{errors.images}</div>}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Availability</Form.Label>
              <Form.Select
                name="availability"
                value={formData.availability}
                onChange={handleInputChange}
              >
                <option value={true}>Available</option>
                <option value={false}>Unavailable</option>
              </Form.Select>
            </Form.Group>
            <div className="modal-actions">
              <Button variant="secondary" onClick={() => setShowModal(false)}>
                Cancel
              </Button>
              <Button variant="primary" type="submit">
                {editingRoom ? 'Update Room' : 'Add Room'}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default AdminRooms;
