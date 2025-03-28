import { Container, Row, Col } from "react-bootstrap";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-light text-dark py-4 border-top position-relative z-1">
      <div className="p-4">
        <Row>
          {/* Navigation Links */}
          <Col md={3} sm={6} className="mb-3">
            <h5>Help</h5>
            <ul className="list-unstyled">
              <li>Customer Service</li>
              <li>Track Order</li>
              <li>Returns & Exchanges</li>
              <li>FAQs</li>
            </ul>
          </Col>
          <Col md={3} sm={6} className="mb-3">
            <h5>Company</h5>
            <ul className="list-unstyled">
              <li>About Us</li>
            </ul>
          </Col>
          <Col md={3} sm={6} className="mb-3">
            <h5>Legal</h5>
            <ul className="list-unstyled">
              <li>Privacy Policy</li>
              <li>Terms & Conditions</li>
              <li>Cookies Policy</li>
            </ul>
          </Col>
          
          {/* Social Media */}
          <Col md={3} sm={6} className="mb-3">
            <h5>Follow Us</h5>
            <div className="d-flex gap-3">
              <Facebook size={24} />
              <Instagram size={24} />
            </div>
          </Col>
        </Row>
        
        {/* Bottom Section */}
        <Row className="mt-4 border-top pt-3 text-center">
          <Col>
            <p className="mb-0">&copy; {new Date().getFullYear()} Nalouti Store. All rights reserved.</p>
          </Col>
        </Row>
      </div>
    </footer>
  );
}