import React, { useRef, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import emailjs from "@emailjs/browser";

const ContactModal = ({ show, handleClose }) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const formRef = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm("service_N1lout1", "template_h9w1vzo", formRef.current, "ywHoL7JI3TJ9Q8CqY")
      .then(() => {
        alert("Email sent successfully!");
        handleClose();
      })
      .catch((err) => console.error(err));
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Contact us</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form ref={formRef} onSubmit={sendEmail}>
          <Form.Group className="mb-2">
            <Form.Label>Name</Form.Label>
            <Form.Control name="name" value={name} type="text" onChange={(e) => setName(e.target.value)} required />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Surname</Form.Label>
            <Form.Control name="surname" type="text" required />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Email address</Form.Label>
            <Form.Control name="email" value={email} type="email" required onChange={(e) => setEmail(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control name="phone_number" type="tel" pattern="\+216[0-9]{8}" required />
            <Form.Text muted>Format: +216XXXXXXXX</Form.Text>
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Topic</Form.Label>
            <Form.Select name="topic" required>
              <option value="">Select topic</option>
              <option value="order">Order</option>
              <option value="return">Return</option>
              <option value="technical">Technical Issue</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Comment</Form.Label>
            <Form.Control as="textarea" value={message} rows={3} name="message" required onChange={(e) => setMessage(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Check required label="I have read and accept the Privacy Policy" />
          </Form.Group>
          <Button variant="dark" type="submit">SEND</Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ContactModal;
