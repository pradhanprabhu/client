import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Auth.css';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false
  });
  const [message, setMessage] = useState({ text: '', type: '' });

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setMessage({
        text: 'Passwords do not match',
        type: 'error'
      });
      return;
    }
    try {
      const response = await fetch('http://localhost:5000/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
          createdAt: new Date().toISOString()
        }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setMessage({
          text: `Registration successful! You joined on ${new Date().toLocaleDateString()}`,
          type: 'success',
        });
        // Redirect to login page after 2 seconds
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        setMessage({
          text: data.message || 'Registration failed',
          type: 'error',
        });
      }
    } catch (error) {
      setMessage({
        text: error.message || 'Registration failed',
        type: 'error',
      });
    }
  };
  const handleGoogleSignIn = async () => {
    try {
      // TODO: Implement Google Sign-in logic here
      console.log('Google Sign-in clicked');
    } catch (error) {
      setMessage({
        text: error.message || 'Google Sign-in failed',
        type: 'error'
      });
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-content">
        {/* Left side - Image */}
        <div className="auth-image">
          <div className="image-content">
            <h1>Join Us</h1>
            <p>Create an account to start earning points and enjoying exclusive benefits at Nepalese Hotel.</p>
          </div>
        </div>

        {/* Right side - Form */}
        <div className="auth-form">
          <div className="form-header">
            <img
              src="https://files.oaiusercontent.com/file-W75EZNP9Lp4WAJm4k8fvTt?se=2025-03-19T05%3A55%3A59Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3Dc8944be5-891b-4661-a6cd-65027249af6d.webp&sig=GHZ6agJh2imEJ7uTHMBCb0v7ofX34svFvmzf6BsWSqY%3D"
              alt="Logo"
              className="auth-logo"
            />
            <h1>Create Account</h1>
            <p>Enter your details to sign up</p>
          </div>

          {message.text && (
            <div className={`alert alert-${message.type === 'success' ? 'success' : 'danger'}`}>
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Full Name<span className="required">*</span></label>
              <input
                type="text"
                id="name"
                className="form-control"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email<span className="required">*</span></label>
              <input
                type="email"
                id="email"
                className="form-control"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone Number<span className="required">*</span></label>
              <input
                type="tel"
                id="phone"
                className="form-control"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password<span className="required">*</span></label>
              <input
                type="password"
                id="password"
                className="form-control"
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
                required
                minLength="6"
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password<span className="required">*</span></label>
              <input
                type="password"
                id="confirmPassword"
                className="form-control"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                minLength="6"
              />
            </div>

            <div className="form-group">
              <div className="remember-me">
                <input
                  type="checkbox"
                  id="acceptTerms"
                  checked={formData.acceptTerms}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="acceptTerms">
                  I agree to the <Link to="/terms">Terms & Conditions</Link>
                </label>
              </div>
            </div>

            <button type="submit" className="submit-btn">
              Create Account
            </button>

            <p style={{ textAlign: 'center', marginTop: '20px' }}>
              Already have an account? <Link to="/login" style={{ color: '#ffc107' }}>Sign In</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register; 