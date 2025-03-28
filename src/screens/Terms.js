import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './Terms.css';

const Terms = () => {
  return (
    <div className="terms-page">
      <div className="hero-section" style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}>
        <div className="overlay"></div>
        <Container className="hero-content text-center text-white">
          <h1 className="display-4">Terms & Conditions</h1>
          <p className="lead">Please read our terms and conditions carefully</p>
        </Container>
      </div>

      <Container className="terms-container">
        <Row>
          <Col lg={10} className="mx-auto">
            <div className="terms-content">
              <section>
                <h2>1. Acceptance of Terms</h2>
                <p>By accessing and using Nepalese Hotel's services, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, please do not use our services.</p>
              </section>

              <section>
                <h2>2. Booking and Reservations</h2>
                <p>All bookings are subject to availability and confirmation. We reserve the right to refuse service to anyone for any reason at any time. A valid credit card is required to secure your reservation.</p>
              </section>

              <section>
                <h2>3. Check-in and Check-out</h2>
                <p>Check-in time is 2:00 PM and check-out time is 12:00 PM. Early check-in and late check-out are subject to availability and may incur additional charges. Valid identification is required at check-in.</p>
              </section>

              <section>
                <h2>4. Payment Terms</h2>
                <p>Full payment is required at check-in unless otherwise arranged. We accept major credit cards, cash, and bank transfers. All prices are subject to applicable taxes and service charges.</p>
              </section>

              <section>
                <h2>5. Cancellation Policy</h2>
                <p>Cancellations must be made at least 24 hours before check-in time to avoid a one-night charge. No-shows will be charged for the full duration of the reservation.</p>
              </section>

              <section>
                <h2>6. Room Occupancy</h2>
                <p>Room rates are based on double occupancy. Additional guests may incur extra charges. Maximum occupancy limits must be strictly adhered to.</p>
              </section>

              <section>
                <h2>7. Hotel Facilities</h2>
                <p>Use of hotel facilities is subject to availability and may require advance booking. Some facilities may have age restrictions or require additional fees.</p>
              </section>

              <section>
                <h2>8. Guest Conduct</h2>
                <p>Guests are expected to conduct themselves in a manner that does not disturb other guests or staff. The hotel reserves the right to evict guests who violate this policy.</p>
              </section>

              <section>
                <h2>9. Privacy Policy</h2>
                <p>We collect and process personal data in accordance with our privacy policy. By making a reservation, you agree to our data processing practices.</p>
              </section>

              <section>
                <h2>10. Changes to Terms</h2>
                <p>We reserve the right to modify these terms and conditions at any time. Continued use of our services constitutes acceptance of any changes.</p>
              </section>
            </div>

            <div className="terms-footer">
              <p>Last updated: March 2024</p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Terms; 