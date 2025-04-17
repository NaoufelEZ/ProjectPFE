import React from 'react';
import Header from "../../../Components/Header";
import { Outlet } from 'react-router-dom';
import LeftBar from '../../../Components/LeftBar';
import { Container } from 'react-bootstrap';
import './Setting.css'; // For custom styles

const Setting = () => {
  return (
    <>
      <Header />
      <Container fluid className="settings-container">
        <div className="settings-wrapper">
          <div className="settings-sidebar">
            <LeftBar />
          </div>
          <div className="settings-content">
            <Outlet />
          </div>
        </div>
      </Container>
    </>
  );
};

export default Setting;