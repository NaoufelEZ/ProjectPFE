import  { useState } from "react";
import { Nav } from "react-bootstrap";
import { AiFillDashboard } from "react-icons/ai";
import "./leftBar.css";
import {
  FaBoxOpen, FaUsers,FaShoppingCart
} from 'react-icons/fa';
import { RiAdminFill,RiMenuUnfold4Fill } from "react-icons/ri";
import { IoSettingsSharp } from "react-icons/io5";
import useUser from '../../Hooks/useUser';
import { CiLogout } from "react-icons/ci";
import { MdManageAccounts } from "react-icons/md";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ApiKey,APIURL } from "../../Api/Api";




const LefBar = () => {
  const [isClick,setIsClick] = useState(false);
  const user = useUser();

  const cookie = new Cookies();
  const token = cookie.get("auth"); 
  const navigate = useNavigate();

  const handleLogout = () => {
    axios.get(`${APIURL}/logout`,{
      headers:{
        Authorization: `Bearer ${token}`,
        "x-api-key":ApiKey,
      }
  })
.then(()=>cookie.remove("auth",{path:"/dashboard"}))
.finally(()=>{navigate("/")});
  }
  return (
    <div className="sidebar">
      <div className="d-flex justify-content-between align-items-center">
        <h5 className="text-white">dashboard</h5>
        <RiMenuUnfold4Fill onClick={()=>setIsClick(prev => !prev)} role="button" className="text-white h5" /> 
      </div>
      <hr/>
      <div className="d-flex align-items-center">
      {
        user && user.role === "Admin" ? 
          <RiAdminFill className="mb-0 h4 text-white me-3" />
          :
          <MdManageAccounts className="mb-0 h4 text-white me-3"  />
      }
      {
        !isClick &&
      <div className="d-flex flex-column">
      <span className="text-white text-capitalize">{user && user.first_name +" " + user.last_name}</span>
      <span className="text-muted text-capitalize">{user && user.role}</span>
      </div>
      }
      </div>
      <hr/>
      <Nav defaultActiveKey="overview" className="flex-column">
      <div className="mb-3">
        <span style={{fontSize:"12px"}} className="text-uppercase text-secondary mb-1 fw-bold">dashboard</span>
        <Nav.Item className="d-flex align-items-center ms-2 px-2">
        <AiFillDashboard className="h4 text-white mb-0" />
        <Nav.Link href="overview" className="text-white">Overview</Nav.Link>
        </Nav.Item>
        </div>
        { user && user.role === "Admin" ?
        <>
        <span style={{fontSize:"12px"}} className="text-uppercase text-secondary mb-1 fw-bold">management</span>
        <Nav.Item className="d-flex align-items-center ms-2 px-2">
          <FaUsers className="h4 text-white mb-0" />
          <Nav.Link href="/dashboard/users" className="text-white">Users</Nav.Link>
        </Nav.Item>
        <Nav.Item className="d-flex align-items-center ms-2 px-2">
          <FaShoppingCart className="h4 text-white mb-0" />
          <Nav.Link href="/dashboard/orders" className="text-white">Orders</Nav.Link>
        </Nav.Item>
        <Nav.Item className="d-flex align-items-center ms-2 px-2">
          <FaBoxOpen className="h4 text-white mb-0" />
          <Nav.Link href="/dashboard/inventory" className="text-white">Inventory</Nav.Link>
        </Nav.Item>
        </>
        :
        <>
        <span style={{fontSize:"12px"}} className="text-uppercase text-secondary mb-1 fw-bold">Products</span>
        <Nav.Item className="d-flex align-items-center ms-2 px-2">
          <FaBoxOpen className="h4 text-white mb-0" />
          <Nav.Link href="/dashboard/inventory" className="text-white">Inventory</Nav.Link>
        </Nav.Item>
        <Nav.Item className="d-flex align-items-center ms-2 px-2">
          <FaShoppingCart className="h4 text-white mb-0" />
          <Nav.Link href="/dashboard/product/add" className="text-white">Product Management</Nav.Link>
        </Nav.Item>
        <Nav.Item className="d-flex align-items-center ms-2 px-2">
          <FaBoxOpen className="h4 text-white mb-0" />
          <Nav.Link href="/dashboard/category" className="text-white">Category</Nav.Link>
        </Nav.Item>
        </>
        }
        <hr/>
        <Nav.Item className="d-flex align-items-center ms-2 px-2">
          <IoSettingsSharp className="h4 me-3 text-white mb-0" />
          <Nav.Link href="/dashboard/admin/message" className="text-white">Setting</Nav.Link>
        </Nav.Item>
        <Nav.Item className="d-flex align-items-center ms-2 px-2">
          <CiLogout className="h4 text-white mb-0 me-4" />
          <span onClick={handleLogout} role="button" className="text-white p-2">Logout</span>
        </Nav.Item>
      </Nav>
    </div>
  );
};

export default LefBar;
