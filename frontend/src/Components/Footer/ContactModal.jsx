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
    <Modal
      show={show}
      onHide={handleClose}
      centered
      size="md"
      dialogClassName="border-0"
      contentClassName="rounded-3"
    >
      <Modal.Body className="p-4">
        <h5 className="text-center fw-bold mb-3">Contact us</h5>
        <p className="text-center text-muted" style={{ fontSize: "14px" }}>
          We answer all your questions about our online sales service
        </p>
        <Form ref={formRef} onSubmit={sendEmail}>
          <Form.Group className="mb-3">
            <Form.Control
              name="name"
              value={name}
              type="text"
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
              required
              className="rounded-1 py-2"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              name="surname"
              type="text"
              placeholder="Surname"
              required
              className="rounded-1 py-2"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              name="email"
              value={email}
              type="email"
              placeholder="E-mail"
              onChange={(e) => setEmail(e.target.value)}
              required
              className="rounded-1 py-2"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              name="phone_number"
              type="tel"
              pattern="\+216[0-9]{8}"
              placeholder="+216 Phone"
              required
              className="rounded-1 py-2"
            />
            <Form.Text muted className="ms-1">Format: +216XXXXXXXX</Form.Text>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Select name="topic" required className="rounded-1 py-2">
              <option value="">Select topic</option>
              <option value="order">Order</option>
              <option value="return">Return</option>
              <option value="technical">Technical Issue</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              as="textarea"
              rows={3}
              name="message"
              value={message}
              placeholder="Comment"
              onChange={(e) => setMessage(e.target.value)}
              required
              className="rounded-1"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Check
              required
              label={
                <>
                  I have read and accept the{" "}
                  <a href="#" className="text-decoration-underline">
                    Privacy Policy
                  </a>
                </>
              }
            />
          </Form.Group>
          <div className="d-grid">
            <Button variant="dark" type="submit" className="rounded-1 py-2">
              SEND
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ContactModal;
