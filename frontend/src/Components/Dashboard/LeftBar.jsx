import React from "react";
import { Nav } from "react-bootstrap";
import { AiFillDashboard } from "react-icons/ai";
import "./leftBar.css";
import {
  FaBoxOpen, FaUsers,
  FaShoppingCart
} from 'react-icons/fa';
import { RiAdminFill } from "react-icons/ri";
import { IoSettingsSharp } from "react-icons/io5";
import useUser from '../../Hooks/useUser';
import { CiLogout } from "react-icons/ci";



const LefBar = () => {
  const user = useUser();
  return (
    <div className="sidebar">
      <h5 className="text-white">dashboard</h5>
      <hr/>
      <div className="d-flex align-items-center">
      <RiAdminFill className="mb-0 h4 text-white me-3" />
      <div className="d-flex flex-column">
      <span className="text-white text-capitalize">{user && user.first_name +" " + user.last_name}</span>
      <span className="text-muted text-capitalize">Admin</span>
      </div>
      </div>
      <hr/>
      <Nav defaultActiveKey="/overview" className="flex-column">
      <div className="mb-3">
        <span style={{fontSize:"12px"}} className="text-uppercase text-secondary mb-1 fw-bold">dashboard</span>
        <Nav.Item className="d-flex align-items-center ms-2 px-2">
        <AiFillDashboard className="h4 text-white mb-0" />
        <Nav.Link href="/dashboard/admin/overview" className="text-white">Overview</Nav.Link>
        </Nav.Item>
        </div>
        <span style={{fontSize:"12px"}} className="text-uppercase text-secondary mb-1 fw-bold">management</span>
        <Nav.Item className="d-flex align-items-center ms-2 px-2">
          <FaUsers className="h4 text-white mb-0" />
          <Nav.Link href="/dashboard/admin/message" className="text-white">Users</Nav.Link>
        </Nav.Item>
        <Nav.Item className="d-flex align-items-center ms-2 px-2">
          <FaShoppingCart className="h4 text-white mb-0" />
          <Nav.Link href="/dashboard/admin/message" className="text-white">Orders</Nav.Link>
        </Nav.Item>
        <Nav.Item className="d-flex align-items-center ms-2 px-2">
          <FaBoxOpen className="h4 text-white mb-0" />
          <Nav.Link href="/dashboard/admin/message" className="text-white">Inventory</Nav.Link>
        </Nav.Item>
        <hr/>
        <Nav.Item className="d-flex align-items-center ms-2 px-2">
          <IoSettingsSharp className="h4 me-3 text-white mb-0" />
          <Nav.Link href="/dashboard/admin/message" className="text-white">Setting</Nav.Link>
        </Nav.Item>
        <Nav.Item className="d-flex align-items-center ms-2 px-2">
          <CiLogout className="h4 text-white mb-0 me-4" />
          <span role="button" className="text-white p-2">Logout</span>
        </Nav.Item>
      </Nav>
    </div>
  );
};

export default LefBar;
