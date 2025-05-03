import React from "react";
import { Container, Row } from "react-bootstrap";
import FooterHelp from "./FooterHelp";
import FooterCompany from "./FooterCompany";
import FooterLegal from "./FooterLegal";
import FooterSocial from "./FooterSocial";
import FooterBottom from "./FooterBottom";


const Footer = () => (
  <footer className="footer bg-white text-dark py-4 border-top position-relative z-1">
    <Container>
      <Row className="g-4">
        <FooterHelp />
        <FooterCompany />
        <FooterLegal />
        <FooterSocial />
      </Row>
      <FooterBottom />
    </Container>
  </footer>
);

export default Footer;
