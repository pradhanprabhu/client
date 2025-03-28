import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Modal } from 'react-bootstrap';
import './SignupScreen.css';


const SignupScreen = () => {
  const navigate = useNavigate();
  const [showTerms, setShowTerms] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle signup logic here
    navigate('/login');
  };

  return (
    <div className="signup-container">
      <Container>
        <Row className="justify-content-center">
          <Col md={6}>
            <div className="signup-form-container">
              <h2 className="text-center mb-4">Create Account</h2>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control type="text" placeholder="Enter your full name" required />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" placeholder="Enter your email" required />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control type="tel" placeholder="Enter your phone number" required />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Create a password" required />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control type="password" placeholder="Confirm your password" required />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Check
                    type="checkbox"
                    label={
                      <span>
                        I agree to the{' '}
                        <span 
                          className="terms-link" 
                          onClick={(e) => {
                            e.preventDefault();
                            setShowTerms(true);
                          }}
                        >
                          Terms and Conditions
                        </span>
                      </span>
                    }
                    required
                  />
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100">
                  Sign Up
                </Button>
              </Form>

              <p className="text-center mt-3">
                Already have an account? <Link to="/login">Login here</Link>
              </p>
            </div>
          </Col>
        </Row>
      </Container>

      {/* Terms and Conditions Modal */}
      <Modal show={showTerms} onHide={() => setShowTerms(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Terms and Conditions</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="terms-content">
            <h4>1. Acceptance of Terms</h4>
            <p>By accessing and using this website, you accept and agree to be bound by the terms and conditions of this agreement.</p>

            <h4>2. Use License</h4>
            <p>Permission is granted to temporarily download one copy of the materials (information or software) on Nepalese Hotel's website for personal, non-commercial transitory viewing only.</p>

            <h4>3. Disclaimer</h4>
            <p>The materials on Nepalese Hotel's website are provided on an 'as is' basis. Nepalese Hotel makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>

            <h4>4. Limitations</h4>
            <p>In no event shall Nepalese Hotel or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Nepalese Hotel's website.</p>

            <h4>5. Accuracy of Materials</h4>
            <p>The materials appearing on Nepalese Hotel's website could include technical, typographical, or photographic errors. Nepalese Hotel does not warrant that any of the materials on its website are accurate, complete or current.</p>

            <h4>6. Links</h4>
            <p>Nepalese Hotel has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by Nepalese Hotel of the site.</p>

            <h4>7. Modifications</h4>
            <p>Nepalese Hotel may revise these terms of service for its website at any time without notice. By using this website you are agreeing to be bound by the then current version of these terms of service.</p>

            <h4>8. Governing Law</h4>
            <p>These terms and conditions are governed by and construed in accordance with the laws of Nepal and you irrevocably submit to the exclusive jurisdiction of the courts in that location.</p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowTerms(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default SignupScreen; 