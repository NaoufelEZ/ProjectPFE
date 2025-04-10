import { Container, Row, Col } from "react-bootstrap";
import { Facebook, Instagram } from "lucide-react";
import { FaTiktok } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer bg-white text-dark py-4 border-top position-relative z-1">
      <Container>
        <Row className="g-4">
          {/* Navigation Links */}
          <Col md={3} sm={6}>
            <h5 className="text-uppercase fw-bold mb-3" style={{ letterSpacing: "1px" }}>Help</h5>
            <ul className="list-unstyled">
              <li className="mb-2"><Link to="/customer-service" className="text-dark text-decoration-none hover-underline">Customer Service</Link></li>
              <li className="mb-2"><Link to="/track-order" className="text-dark text-decoration-none hover-underline">Track Order</Link></li>
              <li className="mb-2"><Link to="/returns-exchanges" className="text-dark text-decoration-none hover-underline">Returns & Exchanges</Link></li>
              <li><Link to="/faqs" className="text-dark text-decoration-none hover-underline">FAQs</Link></li>
            </ul>
          </Col>
          
          <Col md={3} sm={6}>
            <h5 className="text-uppercase fw-bold mb-3" style={{ letterSpacing: "1px" }}>Company</h5>
            <ul className="list-unstyled">
              <li><Link to="/about" className="text-dark text-decoration-none hover-underline">About Us</Link></li>
            </ul>
          </Col>
          
          <Col md={3} sm={6}>
            <h5 className="text-uppercase fw-bold mb-3" style={{ letterSpacing: "1px" }}>Legal</h5>
            <ul className="list-unstyled">
              <li className="mb-2"><Link to="/privacy-policy" className="text-dark text-decoration-none hover-underline">Privacy Policy</Link></li>
              <li className="mb-2"><Link to="/terms" className="text-dark text-decoration-none hover-underline">Terms & Conditions</Link></li>
              <li><Link to="/cookies-policy" className="text-dark text-decoration-none hover-underline">Cookies Policy</Link></li>
            </ul>
          </Col>
          
          {/* Social Media */}
          <Col md={3} sm={6}>
            <h5 className="text-uppercase fw-bold mb-3" style={{ letterSpacing: "1px" }}>Follow Us</h5>
            <div className="d-flex gap-3">
              <a href="https://www.facebook.com/people/Nalouti-Store/61566938489773/?_rdr" 
                 target="_blank" 
                 rel="noopener noreferrer" 
                 className="text-dark hover-scale">
                <Facebook size={22} />
              </a>
              <a href="https://www.instagram.com/nalouti_store/" 
                 target="_blank" 
                 rel="noopener noreferrer" 
                 className="text-dark hover-scale">
                <Instagram size={22} />
              </a>
              <a href="https://www.tiktok.com/@naloutistore" 
                 target="_blank" 
                 rel="noopener noreferrer" 
                 className="text-dark hover-scale">
                <FaTiktok size={22} />
              </a>
            </div>
            
            {/* Newsletter Signup (Optional) */}
            <div className="mt-4">
              <p className="small mb-2">Subscribe to our newsletter</p>
              <div className="input-group">
                <input type="email" className="form-control form-control-sm" placeholder="Your email" />
                <button className="btn btn-dark btn-sm" type="button">Subscribe</button>
              </div>
            </div>
          </Col>
        </Row>
        
        {/* Bottom Section */}
        <Row className="mt-4 pt-3 border-top">
          <Col className="text-center">
            <p className="mb-0 small text-muted">
              &copy; {new Date().getFullYear()} Nalouti Store. All rights reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}