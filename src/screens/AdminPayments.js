import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Table, Button, Modal, Form, Badge } from 'react-bootstrap';
import { FaEye, FaCheck, FaTimes } from 'react-icons/fa';
import moment from 'moment';
import './AdminPayments.css';
import { useNavigate } from 'react-router-dom';

const AdminPayments = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [formData, setFormData] = useState({
    status: 'pending'
  });

  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      navigate('/login');
    }
  }, [userInfo, navigate]);

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      setLoading(true);
      setError(null);
      
      if (!userInfo || !userInfo.token) {
        setError('Please log in to view payments');
        return;
      }

      console.log('Fetching payments...');
      const { data } = await axios.get('http://localhost:5000/api/payments/admin', {
        headers: {
          'Authorization': `Bearer ${userInfo.token}`,
          'Content-Type': 'application/json'
        }
      });
      console.log('Received payments:', data);
      setPayments(data);
    } catch (error) {
      console.error('Error fetching payments:', error);
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        setError(error.response.data.message || 'Error fetching payments');
      } else if (error.request) {
        // The request was made but no response was received
        setError('No response from server. Please try again later.');
      } else {
        // Something happened in setting up the request that triggered an Error
        setError('Error setting up request. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = (payment) => {
    setSelectedPayment(payment);
    setFormData({
      status: payment.status
    });
    setShowModal(true);
  };

  const handleUpdateStatus = async (e) => {
    e.preventDefault();
    if (!userInfo || !userInfo.token) {
      navigate('/login');
      return;
    }
    try {
      setLoading(true);
      setError(null); // Clear any previous errors
      
      console.log('Updating payment status:', {
        paymentId: selectedPayment._id,
        status: formData.status
      });

      const response = await axios.put(
        `http://localhost:5000/api/payments/${selectedPayment._id}/status`,
        { status: formData.status },
        {
          headers: {
            'Authorization': `Bearer ${userInfo.token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data) {
        console.log('Payment status updated successfully:', response.data);
        // Update the local state with the new payment data
        setPayments(prevPayments => 
          prevPayments.map(payment => 
            payment._id === selectedPayment._id 
              ? { ...payment, status: response.data.status }
              : payment
          )
        );
        setShowModal(false);
      }
    } catch (error) {
      console.error('Error updating payment status:', error);
      if (error.response) {
        console.error('Error response:', error.response.data);
        setError(error.response.data.message || 'Failed to update payment status');
      } else if (error.request) {
        setError('No response from server. Please try again later.');
      } else {
        setError('Error setting up request. Please try again.');
      }
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

  const getStatusBadge = (status, paymentMethod) => {
    const variants = {
      'pending': 'warning',
      'completed': 'success',
      'failed': 'danger'
    };
    const statusText = {
      'pending': 'PENDING',
      'completed': 'PAID',
      'failed': 'CANCELLED'
    };
    return (
      <div>
        <Badge bg={variants[status] || 'secondary'} className="me-2">
          {statusText[status] || status}
        </Badge>
        <Badge bg="info">
          {paymentMethod.toUpperCase()}
        </Badge>
      </div>
    );
  };

  const handleDeletePayment = async () => {
    if (!userInfo || !userInfo.token) {
      navigate('/login');
      return;
    }
    if (window.confirm('Are you sure you want to delete this payment?')) {
      try {
        setLoading(true);
        setError(null); // Clear any previous errors
        
        const response = await axios.delete(`http://localhost:5000/api/payments/${selectedPayment._id}`, {
          headers: {
            'Authorization': `Bearer ${userInfo.token}`,
            'Content-Type': 'application/json'
          }
        });

        if (response.data) {
          setShowModal(false);
          await fetchPayments();
        }
      } catch (error) {
        console.error('Error deleting payment:', error);
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          setError(error.response.data.message || 'Failed to delete payment');
        } else if (error.request) {
          // The request was made but no response was received
          setError('No response from server. Please try again later.');
        } else {
          // Something happened in setting up the request that triggered an Error
          setError('Error setting up request. Please try again.');
        }
      } finally {
        setLoading(false);
      }
    }
  };

  if (loading) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  return (
    <Container className="mt-4">
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      
      <h2>Manage Payments</h2>
      
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Booking</th>
            <th>User</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment, index) => (
            <tr key={payment._id}>
              <td>{index + 1}</td>
              <td>{payment.booking?._id || 'N/A'}</td>
              <td>{payment.user?.name || 'N/A'}</td>
              <td>₹{payment.amount}</td>
              <td>{getStatusBadge(payment.status, payment.paymentMethod)}</td>
              <td>{moment(payment.createdAt).format('YYYY-MM-DD')}</td>
              <td>
                <Button
                  variant="info"
                  size="sm"
                  className="me-2"
                  onClick={() => handleViewDetails(payment)}
                >
                  <FaEye /> View
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Payment Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedPayment && (
            <div className="payment-details">
              <div className="row mb-4">
                <div className="col-md-6">
                  <p><strong>Payment ID:</strong> {selectedPayment._id}</p>
                  <p><strong>Booking ID:</strong> {selectedPayment.booking?._id || 'N/A'}</p>
                  <p><strong>User:</strong> {selectedPayment.user?.name || 'N/A'}</p>
                  <p><strong>Amount:</strong> ₹{selectedPayment.amount}</p>
                </div>
                <div className="col-md-6">
                  <p><strong>Payment Method:</strong> {selectedPayment.paymentMethod.toUpperCase()}</p>
                  <p><strong>Status:</strong> {getStatusBadge(selectedPayment.status, selectedPayment.paymentMethod)}</p>
                  <p><strong>Date:</strong> {moment(selectedPayment.createdAt).format('YYYY-MM-DD HH:mm')}</p>
                  {selectedPayment.paymentDetails && (
                    <>
                      <p><strong>Phone Number:</strong> {selectedPayment.paymentDetails.phoneNumber || 'N/A'}</p>
                      <p><strong>Transaction ID:</strong> {selectedPayment.paymentDetails.transactionId || 'N/A'}</p>
                    </>
                  )}
                </div>
              </div>

              <Form onSubmit={handleUpdateStatus}>
                <Form.Group className="mb-3">
                  <Form.Label>Status</Form.Label>
                  <Form.Select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                  >
                    <option value="pending">Pending</option>
                    <option value="completed">Paid</option>
                    <option value="failed">Cancelled</option>
                  </Form.Select>
                </Form.Group>
                <Button variant="primary" type="submit" disabled={loading}>
                  {loading ? 'Updating...' : 'Update Status'}
                </Button>
              </Form>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="danger" onClick={handleDeletePayment} disabled={loading}>
            Delete Payment
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default AdminPayments; 