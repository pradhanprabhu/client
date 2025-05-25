import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Table, Button, Modal, Form, Badge, Tabs, Tab } from 'react-bootstrap';
import { FaEye, FaCheck, FaTimes, FaEdit, FaTrash } from 'react-icons/fa';
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
  const [searchName, setSearchName] = useState("");
  const [searchDate, setSearchDate] = useState("");

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
      const { data } = await axios.get('http://localhost:5000/api/payments/admin', {
        headers: {
          'Authorization': `Bearer ${userInfo.token}`,
          'Content-Type': 'application/json'
        }
      });
      setPayments(data);
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message || 'Error fetching payments');
      } else if (error.request) {
        setError('No response from server. Please try again later.');
      } else {
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
      setError(null);
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
      if (error.response) {
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
    const paymentMethodColors = {
      'cash': 'secondary',
      'khalti': 'purple',
      'mastercard': 'dark-green'
    };
    return (
      <div>
        <Badge bg={variants[status] || 'secondary'} className="me-2">
          {statusText[status] || status}
        </Badge>
        <Badge bg={paymentMethodColors[paymentMethod?.toLowerCase()] || 'info'}>
          {paymentMethod?.toUpperCase()}
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
        setError(null);
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
        if (error.response) {
          setError(error.response.data.message || 'Failed to delete payment');
        } else if (error.request) {
          setError('No response from server. Please try again later.');
        } else {
          setError('Error setting up request. Please try again.');
        }
      } finally {
        setLoading(false);
      }
    }
  };

  // Filter payments by name and date
  const filteredPayments = payments.filter(payment => {
    const nameMatch = payment.user?.name?.toLowerCase().includes(searchName.toLowerCase());
    const dateMatch = searchDate ? moment(payment.createdAt).format('YYYY-MM-DD') === searchDate : true;
    return nameMatch && dateMatch;
  });

  // Tabs filtering
  const pendingPayments = filteredPayments.filter(payment => payment.status === 'pending');
  const paidPayments = filteredPayments.filter(payment => payment.status === 'completed');
  const cancelledPayments = filteredPayments.filter(payment => payment.status === 'failed');

  const renderPaymentTable = (filtered, tabType) => (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>User</th>
          <th>Amount</th>
          <th>Payment Method</th>
          <th>Status</th>
          <th>Date</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {filtered.map(payment => (
          <tr key={payment._id}>
            <td>{payment.user?.name || 'N/A'}</td>
            <td>Rs. {payment.amount}</td>
            <td>{payment.paymentMethod?.toUpperCase()}</td>
            <td>{getStatusBadge(payment.status, payment.paymentMethod)}</td>
            <td>{moment(payment.createdAt).format('YYYY-MM-DD')}</td>
            <td>
              {tabType === 'cancelled' ? (
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => { setSelectedPayment(payment); handleDeletePayment(); }}
                >
                  <FaTrash /> Delete
                </Button>
              ) : (
                <>
                  <Button
                    variant="info"
                    size="sm"
                    className="me-2"
                    onClick={() => handleViewDetails(payment)}
                  >
                    <FaEdit /> Edit
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => { setSelectedPayment(payment); handleDeletePayment(); }}
                  >
                    <FaTrash /> Delete
                  </Button>
                </>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );

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
      <div className="mb-3 d-flex gap-2 align-items-center">
        <input
          type="text"
          className="form-control"
          placeholder="Search by user name"
          value={searchName}
          onChange={e => setSearchName(e.target.value)}
          style={{ maxWidth: 200 }}
        />
        <input
          type="date"
          className="form-control"
          value={searchDate}
          onChange={e => setSearchDate(e.target.value)}
          style={{ maxWidth: 180 }}
        />
      </div>
      <Tabs defaultActiveKey="paid" className="mb-4 booking-tabs">
        <Tab eventKey="paid" title={<span style={{color: 'black', fontWeight: 'bold'}}>Paid ({paidPayments.length})</span>}>
          <div className="tab-content">
            <h3 className="tab-title">Paid Payments</h3>
            {renderPaymentTable(paidPayments, 'paid')}
          </div>
        </Tab>
        <Tab eventKey="pending" title={<span style={{color: 'black', fontWeight: 'bold'}}>Pending ({pendingPayments.length})</span>}>
          <div className="tab-content">
            <h3 className="tab-title">Pending Payments</h3>
            {renderPaymentTable(pendingPayments, 'pending')}
          </div>
        </Tab>
        <Tab eventKey="cancelled" title={<span style={{color: 'black', fontWeight: 'bold'}}>Cancelled ({cancelledPayments.length})</span>}>
          <div className="tab-content">
            <h3 className="tab-title">Cancelled Payments</h3>
            {renderPaymentTable(cancelledPayments, 'cancelled')}
          </div>
        </Tab>
      </Tabs>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Payment Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedPayment && (
              <Form onSubmit={handleUpdateStatus}>
                <Form.Group className="mb-3">
                  <Form.Label>Status</Form.Label>
                  <Form.Select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="pending">Pending</option>
                    <option value="completed">Paid</option>
                    {selectedPayment && selectedPayment.status === 'failed' && (
                      <option value="failed">Cancelled</option>
                    )}
                  </Form.Select>
                </Form.Group>
              <Button variant="primary" type="submit">
                Update Status
                </Button>
              </Form>
          )}
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default AdminPayments; 