import React, { useState, useEffect, useRef } from "react";
import { Col, Modal, Button, Form, Alert, Spinner } from "react-bootstrap";
import emailjs from "@emailjs/browser";
import { FiMail } from "react-icons/fi";
import 'bootstrap/dist/css/bootstrap.min.css';

const FooterCompany = () => {
  const [showModal, setShowModal] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState({ show: false, variant: '', message: '' });
  const formRef = useRef();


  const sendEmail = async (e) => {
    e.preventDefault();
    setIsLoading(true);

      const result = await emailjs.sendForm(
      "",    // Replace with your EmailJS service ID
      "",   // Replace with your EmailJS template ID
      formRef.current,
      ""   
      );
      showModal(true)

  };

  return (
    <Col md={3} sm={6}>
      <h5 className="text-uppercase fw-bold mb-3" style={{ letterSpacing: "1px" }}>Company</h5>
      <ul className="list-unstyled">
        <li>
          <button 
            onClick={setShowModal(true)} 
            className="btn btn-link text-dark text-decoration-none p-0"
            aria-label="Send email"
          >
            <FiMail style={{ marginRight: "8px" }} />
            Send email
          </button>
        </li>
      </ul>

      <Modal show={showModal} onHide={showModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Contact us</Modal.Title>
        </Modal.Header>
        <Form ref={formRef} onSubmit={sendEmail}>
          <Modal.Body>
            {alert.show && (
              <Alert variant={alert.variant} onClose={() => setAlert({...alert, show: false})} dismissible>
                {alert.message}
              </Alert>
            )}
            
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" name="from_name" required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" name="from_email" required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Message</Form.Label>
              <Form.Control as="textarea" rows={3} name="message" required />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={()=>setShowModal(true)} disabled={isLoading}>
              Cancel
            </Button>
            <Button variant="dark" type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                  <span className="ms-2">Sending...</span>
                </>
              ) : 'Send'}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Col>
  );
};

export default FooterCompany;