import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Table, Button, Modal, Form, Row, Col } from 'react-bootstrap';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import './AdminPlaces.css';

const AdminPlaces = () => {
  const [places, setPlaces] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingPlace, setEditingPlace] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    location: '',
    category: '',
    distance: '',
    bestTime: '',
    images: [],
    availability: true
  });

  useEffect(() => {
    fetchPlaces();
  }, []);

  const fetchPlaces = async () => {
    try {
      const { data } = await axios.get('/api/places');
      setPlaces(data);
    } catch (error) {
      console.error('Error fetching places:', error);
    }
  };

  const handleEdit = (place) => {
    setEditingPlace(place);
    setFormData({
      name: place.name,
      description: place.description,
      location: place.location,
      category: place.category,
      distance: place.distance,
      bestTime: place.bestTime,
      images: place.images || [],
      availability: place.availability
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this place?')) {
      const token = localStorage.getItem('token');
      try {
        await axios.delete(`/api/places/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        fetchPlaces();
      } catch (error) {
        console.error('Error deleting place:', error);
      }
    }
  };

  const isFormValid = () => {
    const { name, description, location, category, distance, bestTime, images } = formData;

    if (
      !name.trim() ||
      !description.trim() ||
      !location.trim() ||
      !category.trim() ||
      !bestTime.trim() ||
      distance === '' ||
      isNaN(distance) ||
      parseFloat(distance) < 0 ||
      images.length === 0
    ) {
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isFormValid()) {
      alert("Please fill all fields correctly. No field should be empty or contain only whitespace, and distance must be ≥ 0.");
      return;
    }

    try {
      if (editingPlace) {
        await axios.put(`/api/places/${editingPlace._id}`, formData);
      } else {
        await axios.post('/api/places', formData);
      }
      setShowModal(false);
      fetchPlaces();
    } catch (error) {
      console.error('Error saving place:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === 'images') {
      const imageArray = value
        .split(',')
        .map(url => url.trim())
        .filter(url => url !== '');
      setFormData({ ...formData, [name]: imageArray });
    } else if (name === 'distance') {
      const num = parseFloat(value);
      setFormData({ ...formData, [name]: isNaN(num) || num < 0 ? '' : num });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleAddNew = () => {
    setEditingPlace(null);
    setFormData({
      name: '',
      description: '',
      location: '',
      category: '',
      distance: '',
      bestTime: '',
      images: [],
      availability: true
    });
    setShowModal(true);
  };

  return (
    <Container className="admin-places-container">
      <div className="admin-places-header">
        <div className="d-flex justify-content-between align-items-center">
          <h1>Manage Places</h1>
          <Button variant="primary" onClick={handleAddNew} className="add-place-btn">
            <FaPlus className="me-2" /> Add New Place
          </Button>
        </div>
      </div>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Location</th>
            <th>Distance</th>
            <th>Best Time</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {places.map(place => (
            <tr key={place._id}>
              <td>{place.name}</td>
              <td>{place.category}</td>
              <td>{place.location}</td>
              <td>{place.distance} km</td>
              <td>{place.bestTime}</td>
              <td>{place.description.substring(0, 50)}...</td>
              <td>
                <Button
                  variant="outline-primary"
                  size="sm"
                  className="me-2"
                  onClick={() => handleEdit(place)}
                >
                  <FaEdit /> Edit
                </Button>
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => handleDelete(place._id)}
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
          <Modal.Title>{editingPlace ? 'Edit Place' : 'Add New Place'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Place Name</Form.Label>
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
                  <Form.Label>Category</Form.Label>
                  <Form.Control
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g., Historical, Nature, Cultural"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Location</Form.Label>
                  <Form.Control
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Distance (in km)</Form.Label>
                  <Form.Control
                    type="number"
                    name="distance"
                    value={formData.distance}
                    onChange={handleInputChange}
                    required
                    step="0.1"
                    min="0"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Best Time to Visit</Form.Label>
              <Form.Control
                type="text"
                name="bestTime"
                value={formData.bestTime}
                onChange={handleInputChange}
                required
                placeholder="e.g., March-May, Morning 6-10 AM"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Image URLs (comma separated)</Form.Label>
              <Form.Control
                type="text"
                name="images"
                value={Array.isArray(formData.images) ? formData.images.join(', ') : ''}
                onChange={handleInputChange}
                placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
              />
            </Form.Group>

            <div className="modal-actions mt-4">
              <Button variant="secondary" onClick={() => setShowModal(false)} className="me-2">
                Cancel
              </Button>
              <Button variant="primary" type="submit">
                {editingPlace ? 'Update Place' : 'Add Place'}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default AdminPlaces;
