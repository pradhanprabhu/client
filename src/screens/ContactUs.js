import React, { useState } from 'react';
import axios from 'axios';

const ContactUs = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/contact/send', {
        name,
        email,
        subject,
        message,
      });

      if (response.data.success) {
        alert('Message sent successfully!');
        setName('');
        setEmail('');
        setSubject('');
        setMessage('');
      }
    } catch (error) {
      alert('Failed to send message. Please try again.');
    }
  };

  return (
    <div className="container py-5">
      <h1 className="text-center mb-5">Contact Us</h1>

      <div className="row">
        {/* Contact Information */}
        <div className="col-md-6 mb-4">
          <div className="card h-100">
            <div className="card-body">
              <h3 className="card-title mb-4">Get in Touch</h3>
              <div className="mb-4">
                <h5>Address</h5>
                <p>📍 Thamel, Kathmandu, Nepal</p>
              </div>
              <div className="mb-4">
                <h5>Phone</h5>
                <p>📞 +977-123456789</p>
              </div>
              <div className="mb-4">
                <h5>Email</h5>
                <p>📧 prabhupradhan93@gmail.com</p>
              </div>
              <div className="mb-4">
                <h5>Business Hours</h5>
                <p>⏰ 24/7 Customer Support</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="col-md-6 mb-4">
          <div className="card h-100">
            <div className="card-body">
              <h3 className="card-title mb-4">Send us a Message</h3>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="subject" className="form-label">Subject</label>
                  <input
                    type="text"
                    className="form-control"
                    id="subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="message" className="form-label">Message</label>
                  <textarea
                    className="form-control"
                    id="message"
                    rows="5"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-primary">Send Message</button>
              </form>
            </div>
          </div>
        </div>

        {/* Map */}
        <div className="col-12">
          <div className="card">
            <div className="card-body p-0">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.456837428456!2d85.30924877645615!3d27.71715737678937!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb190a74aa1cd1%3A0x971b10f7ef9e6996!2sThamel%2C%20Kathmandu%2044600%2C%20Nepal!5e0!3m2!1sen!2s!4v1709654321!5m2!1sen!2s"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Nepalese Hotel Location"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;