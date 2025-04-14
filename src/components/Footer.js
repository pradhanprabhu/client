import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col md={4}>
            <h5>About Us</h5>
            <p>
              The Nepalese Hotel offers luxury accommodations with authentic Nepalese hospitality.
              Experience the perfect blend of tradition and modern comfort.
            </p>
            <div className="social-links">
              <a href="https://www.facebook.com/prabhu.pradhan.98" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="https://www.instagram.com/prabhupradhan_/" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="https://www.tiktok.com/@pradhan_prabhu" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-tiktok"></i>
              </a>
            </div>
          </Col>
          <Col md={4}>
            <h5>Quick Links</h5>
            <ul className="footer-links">
              <li><Link to="/aboutus">About Us</Link></li>
              <li><Link to="/rooms">Rooms</Link></li>
              <li><Link to="/places">Places</Link></li>
              <li><Link to="/terms">Terms & Conditions</Link></li>
            </ul>
          </Col>
          <Col md={4}>
            <h5>Contact Info</h5>
            <ul className="footer-contact">
              <li>
                <i className="fas fa-map-marker-alt"></i>
                Thamel, Kathmandu, Nepal
              </li>
              <li>
                <i className="fas fa-phone"></i>
                +977-123456789
              </li>
              <li>
                <i className="fas fa-envelope"></i>
                prabhupradhan93@gmail.com
              </li>
              <li>
                <i className="fas fa-clock"></i>
                24/7 Customer Support
              </li>
            </ul>
          </Col>
        </Row>
        <Row>
          <Col className="text-center mt-4">
            <p className="mb-0">&copy; 2025 Nepalese Hotel. All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer; 