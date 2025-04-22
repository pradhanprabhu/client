import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Table, Button, Badge } from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';
import './AdminUsers.css';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const { data } = await axios.get('http://localhost:5000/api/users');
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
      setError('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        setLoading(true);
        await axios.delete(`http://localhost:5000/api/users/${id}`);
        await fetchUsers();
      } catch (error) {
        console.error('Error deleting user:', error);
        alert('Failed to delete user');
      } finally {
        setLoading(false);
      }
    }
  };

  const getBadgeVariant = (isAdmin) => {
    return isAdmin ? 'danger' : 'primary';
  };

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
      <div className="table-container">
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <Badge bg={getBadgeVariant(user.isAdmin)}>
                    {user.isAdmin ? 'Admin' : 'User'}
                  </Badge>
                </td>
                <td>
                  <Button 
                    variant="outline-danger" 
                    onClick={() => !loading && handleDelete(user._id)}
                    disabled={loading}
                  >
                    <FaTrash /> Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default AdminUsers; 