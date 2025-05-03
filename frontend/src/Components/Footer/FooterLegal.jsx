import React from "react";
import { Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const FooterLegal = () => (
  <Col md={3} sm={6}>
    <h5 className="text-uppercase fw-bold mb-3" style={{ letterSpacing: "1px" }}>Legal</h5>
    <ul className="list-unstyled">
      <li className="mb-2"><Link to="/privacy-policy" className="text-dark text-decoration-none hover-underline">Privacy Policy</Link></li>
      <li className="mb-2"><Link to="/terms" className="text-dark text-decoration-none hover-underline">Terms & Conditions</Link></li>
      <li><Link to="/cookies-policy" className="text-dark text-decoration-none hover-underline">Cookies Policy</Link></li>
    </ul>
  </Col>
);

export default FooterLegal;
