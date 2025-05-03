import React, { useState, useEffect, useRef } from "react";
import { Col, Modal, Button, Form, Alert, Spinner } from "react-bootstrap";
import emailjs from "@emailjs/browser";
import { FiMail } from "react-icons/fi";
import 'bootstrap/dist/css/bootstrap.min.css';

const FooterCompany = () => {
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState({ show: false, variant: '', message: '' });
  const [gapiReady, setGapiReady] = useState(false);
  const formRef = useRef();

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://apis.google.com/js/api.js';
    script.async = true;
    script.defer = true;
    script.onload = () => {
      window.gapi.load('client:auth2', initGapi);
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const initGapi = () => {
    window.gapi.client.init({
      apiKey: "-",
      clientId: "",
      discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest'],
      scope: [
        'https://www.googleapis.com/auth/gmail.send',
        'https://www.googleapis.com/auth/gmail.compose',
        'https://www.googleapis.com/auth/gmail.modify'
      ].join(' ')
    }).then(() => {
      setGapiReady(true);
    }).catch(err => {
      console.error('GAPI init error:', err);
    });
  };

  const handleClose = () => {
    setShowModal(false);
    setAlert({ show: false, variant: '', message: '' });
  };

  const handleShow = () => setShowModal(true);

  const handleGoogleAuth = async () => {
    try {
      const authInstance = window.gapi.auth2.getAuthInstance();
      const currentUser = authInstance.currentUser.get();
      
      const requiredScopes = [
        'https://www.googleapis.com/auth/gmail.send',
        'https://www.googleapis.com/auth/gmail.compose'
      ];
      
      const hasAllScopes = requiredScopes.every(scope => 
        currentUser.hasGrantedScopes(scope)
      );
      
      if (!hasAllScopes) {
        await currentUser.grant({
          scope: requiredScopes.join(' '),
          prompt: 'consent'
        });
      }
      
      return true;
    } catch (error) {
      console.error('Google auth error:', error);
      setAlert({
        show: true,
        variant: 'danger',
        message: 'Google authentication failed. Please try again.'
      });
      return false;
    }
  };

  const sendEmail = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (gapiReady) {
        const isAuthenticated = await handleGoogleAuth();
        if (!isAuthenticated) return;
      }

      const result = await emailjs.sendForm(
      "",    // Replace with your EmailJS service ID
      "",   // Replace with your EmailJS template ID
      formRef.current,
      ""   
      );

      setAlert({
        show: true,
        variant: 'success',
        message: 'Message sent successfully!'
      });

      formRef.current.reset();

      setTimeout(() => {
        handleClose();
      }, 2000);
    } catch (error) {
      console.error('Email sending failed:', error);
      setAlert({
        show: true,
        variant: 'danger',
        message: error.message || 'Failed to send message. Please try again later.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Col md={3} sm={6}>
      <h5 className="text-uppercase fw-bold mb-3" style={{ letterSpacing: "1px" }}>Company</h5>
      <ul className="list-unstyled">
        <li>
          <button 
            onClick={handleShow} 
            className="btn btn-link text-dark text-decoration-none p-0"
            aria-label="Send email"
          >
            <FiMail style={{ marginRight: "8px" }} />
            Send email
          </button>
        </li>
      </ul>

      <Modal show={showModal} onHide={handleClose} centered>
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
            <Button variant="secondary" onClick={handleClose} disabled={isLoading}>
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