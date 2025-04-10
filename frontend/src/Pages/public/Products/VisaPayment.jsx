import React, { useState } from 'react';
import { Container, Form, Button, Card, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaCcVisa, FaLock, FaCreditCard } from 'react-icons/fa';

const VisaPayment = () => {
  const navigate = useNavigate();
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardholderName, setCardholderName] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would send payment information to a payment processor
    // For this demo, we'll just navigate to the confirmation page
    navigate('/order-confirmation/visa');
  };
  
  return (
    <Container className="py-4">
      <h1 className="text-center text-md-start mb-4">
        <FaCcVisa className="me-2 text-primary" size={32} />
        PAYMENT DETAILS
      </h1>
      
      <Card className="border-0 shadow-sm">
        <Card.Body className="p-4">
          <div className="text-center mb-4">
            <FaCreditCard size={40} className="mb-2" />
            <h5>Secure Payment</h5>
            <p className="small text-muted">Please enter your card details below</p>
          </div>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Cardholder Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={cardholderName}
                    onChange={(e) => setCardholderName(e.target.value)}
                    placeholder="Name on card"
                    required
                  />
                </Form.Group>
              </Col>
              
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Card Number</Form.Label>
                  <Form.Control
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Expiry Date</Form.Label>
                  <Form.Control
                    type="text"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                    placeholder="MM/YY"
                    maxLength={5}
                    required
                  />
                </Form.Group>
              </Col>
              
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>CVV</Form.Label>
                  <Form.Control
                    type="text"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                    placeholder="123"
                    maxLength={3}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            
            <div className="d-flex flex-column flex-md-row justify-content-between mt-4">
              <Button 
                variant="outline-secondary" 
                className="mb-3 mb-md-0"
                onClick={() => navigate('/checkout')}
              >
                BACK TO CHECKOUT
              </Button>
              
              <Button 
                type="submit" 
                variant="dark" 
                className="btn-black"
              >
                COMPLETE PAYMENT
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
      
      <div className="text-center mt-4">
        <p className="small text-muted">
          <FaLock className="me-1" /> Your payment information is secure. We don't store your full card details.
        </p>
      </div>
    </Container>
  );
};

export default VisaPayment;