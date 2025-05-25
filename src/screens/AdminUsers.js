import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Table, Badge, Button, Modal, Form } from 'react-bootstrap';
import { FaTrash, FaEdit } from 'react-icons/fa';
import './AdminUsers.css';
import { useNavigate } from 'react-router-dom';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    isAdmin: false
  });
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const [searchName, setSearchName] = useState("");

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      navigate('/login');
    }
  }, [userInfo, navigate]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Please log in to view users');
        return;
      }

      const { data } = await axios.get('/api/users', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
      setError(error.response?.data?.message || 'Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      phone: user.phone || '',
      isAdmin: user.isAdmin
    });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Please log in to update users');
        return;
      }

      // Prevent removing the last admin
      if (editingUser.isAdmin && !formData.isAdmin) {
        const adminCount = users.filter(u => u.isAdmin).length;
        if (adminCount <= 1) {
          setError('Cannot remove the last admin user');
          return;
        }
      }

      await axios.put(`/api/users/${editingUser._id}/toggle-admin`, 
        { isAdmin: formData.isAdmin },
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      // Update user's name and phone if changed
      if (formData.name !== editingUser.name || formData.phone !== editingUser.phone) {
        await axios.put(`/api/users/profile/${editingUser._id}`,
          {
            name: formData.name,
            phone: formData.phone
          },
          {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          }
        );
      }

      setShowModal(false);
      fetchUsers();
    } catch (error) {
      console.error('Error updating user:', error);
      setError(error.response?.data?.message || 'Failed to update user');
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleDelete = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('Please log in to delete users');
          return;
        }

        await axios.delete(`/api/users/${userId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        fetchUsers();
      } catch (error) {
        console.error('Error deleting user:', error);
        setError(error.response?.data?.message || 'Failed to delete user');
      }
    }
  };

  const getBadgeVariant = (isAdmin) => {
    return isAdmin ? 'danger' : 'primary';
  };

  // Filter users by name
  const filteredUsers = users.filter(user =>
    user.name?.toLowerCase().includes(searchName.toLowerCase())
  );

  if (loading) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-5 text-danger">{error}</div>;
  }

  return (
    <div className="admin-users-container">
      <div className="admin-users-header">
        <h1>Manage Users</h1>
      </div>
      <div className="mb-3 d-flex gap-2 align-items-center">
        <input
          type="text"
          className="form-control"
          placeholder="Search by name"
          value={searchName}
          onChange={e => setSearchName(e.target.value)}
          style={{ maxWidth: 200 }}
        />
      </div>
      <div className="table-container">
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Role</th>
              <th>Email Verified</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone || 'N/A'}</td>
                <td>
                  <Badge bg={getBadgeVariant(user.isAdmin)}>
                    {user.isAdmin ? 'Admin' : 'User'}
                  </Badge>
                </td>
                <td>
                  <Badge bg={user.isVerified ? 'success' : 'secondary'}>
                    {user.isVerified ? 'Yes' : 'No'}
                  </Badge>
                </td>
                <td>
                  <Button
                    variant="outline-primary"
                    size="sm"
                    className="me-2"
                    onClick={() => handleEdit(user)}
                  >
                    <FaEdit /> Edit
                  </Button>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => handleDelete(user._id)}
                    disabled={user.isAdmin && users.filter(u => u.isAdmin).length <= 1}
                  >
                    <FaTrash /> Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={formData.email}
                disabled
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                label="Admin User"
                name="isAdmin"
                checked={formData.isAdmin}
                onChange={handleInputChange}
                disabled={editingUser?._id === userInfo?._id}
              />
            </Form.Group>
            <div className="modal-actions">
              <Button variant="secondary" onClick={() => setShowModal(false)}>
                Cancel
              </Button>
              <Button variant="primary" type="submit" className="ms-2">
                Save Changes
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AdminUsers; 