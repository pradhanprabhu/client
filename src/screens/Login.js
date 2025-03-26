
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Auth.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
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
    try {
      // TODO: Implement login logic here
      console.log('Login data:', formData);
    } catch (error) {
      setMessage({
        text: error.message || 'Login failed',
        type: 'error'
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
            <h1>Redeem</h1>
            <p>Redeem your accumulated points for vouchers and enjoy discounts on your bill settlements.</p>
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
            <h1>Welcome To Nepalese Hotel</h1>
            <p>Enter your details to sign in</p>
          </div>

          {message.text && (
            <div className={`alert alert-${message.type === 'success' ? 'success' : 'danger'}`}>
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email<span className="required">*</span></label>
              <input
                type="email"
                id="email"
                className="form-control"
                placeholder="Enter your mail"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Enter your Password<span className="required">*</span></label>
              <input
                type="password"
                id="password"
                className="form-control"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="submit-btn">
              Sign In
            </button>

            <div className="form-options">
              <div className="remember-me">
                <input
                  type="checkbox"
                  id="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                />
                <label htmlFor="rememberMe">Remember Me</label>
              </div>
              <Link to="/forgot-password" className="forgot-password">
                Forgot Password?
              </Link>
            </div>

            <p style={{ textAlign: 'center', marginTop: '20px' }}>
              Don't have an account? <Link to="/register" style={{ color: '#ffc107' }}>Sign Up</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login; 