import React from "react";
import { Accordion, Nav } from "react-bootstrap";
import { AiFillDashboard } from "react-icons/ai";
import { FaUsers } from "react-icons/fa";
import { TiMessages } from "react-icons/ti";
import "./leftBar.css"; // Import custom CSS file

const LefBar = () => {
  return (
    <div className="sidebar">
      <Nav defaultActiveKey="/overview" className="flex-column">
        <Nav.Item className="d-flex align-items-center">
        <AiFillDashboard className="h4 text-white mb-0" />
        <Nav.Link href="/dashboard/admin/overview" className="text-white">Overview</Nav.Link>
        </Nav.Item>
        <Accordion className="custom-accordion">
          <Accordion.Item eventKey="0">
            <Accordion.Header>
            <FaUsers className="h4 text-white mb-0 me-3" />
            Users
            </Accordion.Header>
            <Accordion.Body>
              <Nav.Link href="users/client" className="text-white">Clients</Nav.Link>
              <Nav.Link href="users/employers" className="text-white">Employers</Nav.Link>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
        <Nav.Item className="d-flex align-items-center">
          <TiMessages className="h4 text-white mb-0" />
          <Nav.Link href="/dashboard/admin/message" className="text-white">Message</Nav.Link>
        </Nav.Item>
      </Nav>
    </div>
  );
};

export default LefBar;
