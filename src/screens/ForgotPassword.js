import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState({ text: '', type: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // TODO: Implement password reset logic here
      setMessage({
        text: 'Password reset link has been sent to your email',
        type: 'success'
      });
    } catch (error) {
      setMessage({
        text: error.message || 'Failed to send reset link',
        type: 'error'
      });
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <div className="card bg-dark text-light">
            <div className="card-body p-5">
              <h2 className="text-center mb-4">Reset Password</h2>
              {message.text && (
                <div className={`alert alert-${message.type === 'success' ? 'success' : 'danger'} mb-4`}>
                  {message.text}
                </div>
              )}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email address</label>
                  <input
                    type="email"
                    className="form-control bg-dark text-light border-secondary"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="Enter your email"
                  />
                </div>
                <button 
                  type="submit" 
                  className="btn btn-warning w-100 mb-3"
                  style={{ backgroundColor: '#ffc107' }}
                >
                  Send Reset Link
                </button>
                <div className="text-center">
                  <Link to="/login" className="text-warning text-decoration-none">
                    Back to Login
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword; 