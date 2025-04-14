import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Table, Button, Modal, Form } from 'react-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';
import moment from 'moment';

const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingBooking, setEditingBooking] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    checkIn: '',
    checkOut: '',
    guests: 1,
    status: 'pending'
  });

  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      setError('');
      console.log('Fetching bookings...');
      const { data } = await axios.get('/api/bookings/admin', {
        headers: {
          'Authorization': `Bearer ${userInfo.token}`
        }
      });
      console.log('Received bookings:', data);
      setBookings(data);
    } catch (error) {
      setError(error.response?.data?.message || 'Error fetching bookings');
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (booking) => {
    setEditingBooking(booking);
    setFormData({
      checkIn: moment(booking.checkIn).format('YYYY-MM-DD'),
      checkOut: moment(booking.checkOut).format('YYYY-MM-DD'),
      guests: booking.guests,
      status: booking.status
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this booking?')) {
      try {
        await axios.delete(`/api/bookings/${id}`, {
          headers: {
            'Authorization': `Bearer ${userInfo.token}`
          }
        });
        fetchBookings();
      } catch (error) {
        setError(error.response?.data?.message || 'Error deleting booking');
        console.error('Error deleting booking:', error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError('');
      await axios.put(`/api/bookings/${editingBooking._id}`, formData, {
        headers: {
          'Authorization': `Bearer ${userInfo.token}`
        }
      });
      setShowModal(false);
      fetchBookings();
    } catch (error) {
      setError(error.response?.data?.message || 'Error updating booking');
      console.error('Error updating booking:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (!userInfo || !userInfo.isAdmin) {
    return (
      <Container className="py-5">
        <div className="text-center">
          <h2>Access Denied</h2>
          <p>You must be an admin to view this page.</p>
        </div>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      
      <h2>Manage Bookings</h2>
      
      {loading ? (
        <div className="text-center mt-4">
          <h3>Loading bookings...</h3>
        </div>
      ) : (
        <>
          <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Room</th>
            <th>Guest</th>
            <th>Check In</th>
            <th>Check Out</th>
            <th>Guests</th>
            <th>Total Amount</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking._id}>
              <td>{booking.room?.name || 'N/A'}</td>
              <td>{booking.user?.name || 'N/A'}</td>
              <td>{moment(booking.checkIn).format('YYYY-MM-DD')}</td>
              <td>{moment(booking.checkOut).format('YYYY-MM-DD')}</td>
              <td>{booking.guests || 'N/A'}</td>
              <td>Rs. {booking.totalAmount}</td>
              <td>
                <span className={`badge ${booking.status === 'confirmed' ? 'bg-success' : 'bg-danger'}`}>
                  {booking.status === 'confirmed' ? 'PAID' : 'PENDING'}
                </span>
              </td>
              <td>
                <Button
                  variant="info"
                  size="sm"
                  className="me-2"
                  onClick={() => handleEdit(booking)}
                >
                  <FaEdit />
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(booking._id)}
                >
                  <FaTrash />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Booking</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Check In Date</Form.Label>
              <Form.Control
                type="date"
                name="checkIn"
                value={formData.checkIn}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Check Out Date</Form.Label>
              <Form.Control
                type="date"
                name="checkOut"
                value={formData.checkOut}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Number of Guests</Form.Label>
              <Form.Control
                type="number"
                name="guests"
                value={formData.guests}
                onChange={handleInputChange}
                min={1}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                required
              >
                <option value="pending">Pending</option>
                <option value="confirmed">Paid</option>
              </Form.Select>
            </Form.Group>

            <Button variant="primary" type="submit" className="mt-3">
              Save Changes
            </Button>
          </Form>
        </Modal.Body>
          </Modal>
        </>
      )}
    </Container>
  );
};

export default AdminBookings; 