import React from "react";
import { Col } from "react-bootstrap";
import { Facebook, Instagram } from "lucide-react";
import { FaTiktok } from "react-icons/fa";

const FooterSocial = () => (
  <Col md={3} sm={6}>
    <h5 className="text-uppercase fw-bold mb-3" style={{ letterSpacing: "1px" }}>Follow Us</h5>
    <div className="d-flex gap-3">
      <a href="https://www.facebook.com/people/Nalouti-Store/61566938489773/?_rdr" target="_blank" rel="noopener noreferrer" className="text-dark hover-scale">
        <Facebook size={22} />
      </a>
      <a href="https://www.instagram.com/nalouti_store/" target="_blank" rel="noopener noreferrer" className="text-dark hover-scale">
        <Instagram size={22} />
      </a>
      <a href="https://www.tiktok.com/@naloutistore" target="_blank" rel="noopener noreferrer" className="text-dark hover-scale">
        <FaTiktok size={22} />
      </a>
    </div>
  </Col>
);

export default FooterSocial;
