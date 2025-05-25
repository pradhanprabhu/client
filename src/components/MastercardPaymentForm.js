import React, { useState } from 'react';
import { Form, Button, Alert, Card } from 'react-bootstrap';

function MastercardPaymentForm({ amount, onSuccess, onError, loading }) {
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: ''
  });
  const [errors, setErrors] = useState({});
  const [testMode, setTestMode] = useState(true);

  // Dummy test data for Mastercard only
  const testCard = {
    type: 'Mastercard',
    number: '5555 5555 5555 4444',
    holder: 'Prabhu Pradhan',
    expiry: '12/25',
    cvv: '123'
  };

  const fillTestData = () => {
    setFormData({
      cardNumber: testCard.number,
      cardHolder: testCard.holder,
      expiryDate: testCard.expiry,
      cvv: testCard.cvv
    });
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Card number validation (16 digits)
    if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ''))) {
      newErrors.cardNumber = 'Card number must be 16 digits';
    }

    // Card holder validation
    if (!formData.cardHolder.trim()) {
      newErrors.cardHolder = 'Card holder name is required';
    }

    // Expiry date validation (MM/YY format)
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.expiryDate)) {
      newErrors.expiryDate = 'Expiry date must be in MM/YY format';
    } else {
      // Check if the expiry date is in the past
      const [month, year] = formData.expiryDate.split('/');
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear() % 100; // Get last 2 digits of year
      const currentMonth = currentDate.getMonth() + 1; // getMonth() returns 0-11

      if (parseInt(year) < currentYear || 
          (parseInt(year) === currentYear && parseInt(month) < currentMonth)) {
        newErrors.expiryDate = 'Card has expired';
      }
    }

    // CVV validation (3-4 digits)
    if (!/^\d{3,4}$/.test(formData.cvv)) {
      newErrors.cvv = 'CVV must be 3 or 4 digits';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      // Here you would typically integrate with a payment gateway
      // For now, we'll simulate a successful payment
      const paymentDetails = {
        cardNumber: formData.cardNumber.slice(-4), // Only store last 4 digits
        cardHolder: formData.cardHolder,
        expiryDate: formData.expiryDate,
        amount: amount,
        paymentMethod: 'mastercard'
      };

      onSuccess(paymentDetails);
    } catch (error) {
      onError(error.message || 'Payment failed. Please try again.');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    // Format card number with spaces
    if (name === 'cardNumber') {
      formattedValue = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
    }

    // Format expiry date
    if (name === 'expiryDate') {
      formattedValue = value
        .replace(/\D/g, '')
        .replace(/(\d{2})(\d{0,2})/, (match, month, year) => {
          // Validate month is between 01-12
          const monthNum = parseInt(month);
          if (monthNum > 12) {
            month = '12';
          } else if (monthNum < 1) {
            month = '01';
          } else {
            month = month.padStart(2, '0');
          }
          return `${month}/${year}`;
        })
        .substring(0, 5);
    }

    setFormData(prev => ({
      ...prev,
      [name]: formattedValue
    }));
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Card Number</Form.Label>
          <Form.Control
            type="text"
            name="cardNumber"
            value={formData.cardNumber}
            onChange={handleInputChange}
            placeholder="5555 5555 5555 4444"
            maxLength="19"
            isInvalid={!!errors.cardNumber}
          />
          <Form.Control.Feedback type="invalid">
            {errors.cardNumber}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Card Holder Name</Form.Label>
          <Form.Control
            type="text"
            name="cardHolder"
            value={formData.cardHolder}
            onChange={handleInputChange}
            placeholder="Prabhu Pradhan"
            isInvalid={!!errors.cardHolder}
          />
          <Form.Control.Feedback type="invalid">
            {errors.cardHolder}
          </Form.Control.Feedback>
        </Form.Group>

        <div className="row">
          <div className="col-md-6">
            <Form.Group className="mb-3">
              <Form.Label>Expiry Date</Form.Label>
              <Form.Control
                type="text"
                name="expiryDate"
                value={formData.expiryDate}
                onChange={handleInputChange}
                placeholder="MM/YY"
                maxLength="5"
                isInvalid={!!errors.expiryDate}
              />
              <Form.Control.Feedback type="invalid">
                {errors.expiryDate}
              </Form.Control.Feedback>
            </Form.Group>
          </div>
          <div className="col-md-6">
            <Form.Group className="mb-3">
              <Form.Label>CVV</Form.Label>
              <Form.Control
                type="password"
                name="cvv"
                value={formData.cvv}
                onChange={handleInputChange}
                placeholder="123"
                maxLength="4"
                isInvalid={!!errors.cvv}
              />
              <Form.Control.Feedback type="invalid">
                {errors.cvv}
              </Form.Control.Feedback>
            </Form.Group>
          </div>
        </div>

        <Button 
          variant="primary" 
          type="submit" 
          className="w-100"
          disabled={loading}
        >
          {loading ? 'Processing...' : `Pay Rs. ${amount}`}
        </Button>
      </Form>
    </div>
  );
}

export default MastercardPaymentForm; 