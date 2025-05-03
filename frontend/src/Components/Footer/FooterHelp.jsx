import React from "react";
import { Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const FooterHelp = () => (
  <Col md={3} sm={6}>
    <h5 className="text-uppercase fw-bold mb-3" style={{ letterSpacing: "1px" }}>Help</h5>
    <ul className="list-unstyled">
      <li className="mb-2"><Link to="/customer-service" className="text-dark text-decoration-none hover-underline">Customer Service</Link></li>
      <li className="mb-2"><Link to="/track-order" className="text-dark text-decoration-none hover-underline">Track Order</Link></li>
      <li className="mb-2"><Link to="/returns-exchanges" className="text-dark text-decoration-none hover-underline">Returns & Exchanges</Link></li>
      <li><Link to="/faqs" className="text-dark text-decoration-none hover-underline">FAQs</Link></li>
    </ul>
  </Col>
);

export default FooterHelp;
