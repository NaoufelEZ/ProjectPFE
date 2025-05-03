import React from "react";
import { Col, Row } from "react-bootstrap";

const FooterBottom = () => (
  <Row className="mt-4 pt-3 border-top">
    <Col className="text-center">
      <p className="mb-0 small text-muted">
        &copy; {new Date().getFullYear()} Nalouti Store. All rights reserved.
      </p>
    </Col>
  </Row>
);

export default FooterBottom;
