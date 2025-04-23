import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './VerificationScreen.css';

export default function VerificationScreen() {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [status, setStatus] = useState(''); // Success or failure message
  const [resendStatus, setResendStatus] = useState(''); // Resend message
  const navigate = useNavigate();
  const email = localStorage.getItem('tempEmail');

  // Handle verification code submission
  async function handleVerification(e) {
    e.preventDefault();
    try {
      await axios.post('/api/users/verify', { email, code });
      localStorage.removeItem('tempEmail');
      setStatus('success');
      setError('');
      setTimeout(() => navigate('/login'), 2000); // Redirect after 2 seconds
    } catch (err) {
      setStatus('failed');
      setError('Invalid or expired code');
    }
  }

  // Handle resend verification code
  async function handleResendVerification() {
    try {
      setResendStatus('Resending...');
      await axios.post('/api/users/resend-verification', { email });
      setResendStatus('Verification code resent. Please check your email.');
    } catch (err) {
      setResendStatus('Failed to resend. Please try again.');
    }
  }

  return (
    <div className="verification-container">
      <div className="verification-card">
        <h1 className="verification-title">Verify Email</h1>
        <p className="verification-subtext">
          Enter the code sent to <span className="email">{email}</span>
        </p>

        <form className="verification-form" onSubmit={handleVerification}>
          <input
            type="text"
            placeholder="Enter verification code"
            value={code}
            onChange={e => setCode(e.target.value)}
            className="verification-input"
          />
          {error && <div className="verification-error">{error}</div>}
          <button className="verification-button">Verify</button>
        </form>

        {status === 'success' && (
          <div className="verification-success">✅ Email verified successfully!</div>
        )}
        {status === 'failed' && (
          <div className="verification-failure">❌ Verification failed. Please try again.</div>
        )}
      </div>
    </div>
  );
}
