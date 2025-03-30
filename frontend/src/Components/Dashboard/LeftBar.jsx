import  { useState } from "react";
import { Nav } from "react-bootstrap";
import { AiFillDashboard } from "react-icons/ai";
import { BiSolidCategory } from "react-icons/bi";
import { FaTruckFast } from "react-icons/fa6";
import {
  FaBoxOpen, FaUsers,FaShoppingCart,FaTags 
} from 'react-icons/fa';
import { RiAdminFill,RiMenuUnfold4Fill } from "react-icons/ri";
import { IoSettingsSharp } from "react-icons/io5";
import useUser from '../../Hooks/useUser';
import { CiLogout } from "react-icons/ci";
import { MdManageAccounts,MdCategory  } from "react-icons/md";
import Cookies from "universal-cookie";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { ApiKey,APIURL } from "../../Api/Api";
import "./leftBar.css";
import { ring } from 'ldrs'


const LefBar = () => {
  const [isClick,setIsClick] = useState(false);
  const user = useUser();
  const location = useLocation();
  const currentLocation = location.pathname.split("/")[2];

  const cookie = new Cookies();
  const token = cookie.get("auth"); 
  const navigate = useNavigate();

  ring.register()

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
      {user ?
      <>
      <div className="d-flex align-items-center">
      {
        user.role === "Admin" ? 
          <RiAdminFill className="mb-0 h4 text-white me-3" />
          :
          <MdManageAccounts className="mb-0 h4 text-white me-3"  />
      }
      {
        !isClick &&
      <div className="d-flex flex-column">
      <span className="text-white text-capitalize">{user.first_name +" " + user.last_name}</span>
      <span className="text-secondary text-capitalize">{user.role}</span>
      </div>
      }
      </div>
      <hr/>
      <Nav defaultActiveKey="overview" className="flex-column">
      <div className="mb-3">
        <span style={{fontSize:"12px"}} className="text-uppercase text-secondary mb-1 fw-bold">dashboard</span>
        <Nav.Item className={`d-flex align-items-center ms-2 px-2 ${currentLocation === "overview" && "bg-primary"}`}>
        <AiFillDashboard className="h4 text-white mb-0" />
        <Nav.Link href="/dashboard/overview" className="text-white">Overview</Nav.Link>
        </Nav.Item>
        </div>
        {user.role === "Admin" ?
        <>
        <span style={{fontSize:"12px"}} className="text-uppercase text-secondary mb-1 fw-bold">management</span>
        <Nav.Item role="button" className={`d-flex align-items-center ms-2 px-2 mb-1 ${currentLocation === "users" && "bg-primary rounded-3"}`}>
          <FaUsers className="h4 text-white mb-0" />
          <Nav.Link href="/dashboard/users" className="text-white">Users</Nav.Link>
        </Nav.Item>
        <Nav.Item role="button" className={`d-flex align-items-center ms-2 px-2 mb-1 ${currentLocation === "orders" && "bg-primary rounded-3"}`}>
          <FaShoppingCart className="h4 text-white mb-0" />
          <Nav.Link href="/dashboard/orders" className="text-white">Orders</Nav.Link>
        </Nav.Item>
        <Nav.Item role="button" className={`d-flex align-items-center ms-2 px-2 mb-1 ${currentLocation === "inventory" && "bg-primary rounded-3"}`}>
          <FaBoxOpen className="h4 text-white mb-0" />
          <Nav.Link href="/dashboard/inventory" className="text-white">Inventory</Nav.Link>
        </Nav.Item>
        <Nav.Item role="button" className={`d-flex align-items-center ms-2 px-2 ${currentLocation === "delivery-company" && "bg-primary rounded-3"}`}>
          <FaTruckFast className="h4 text-white mb-0" />
          <Nav.Link href="/dashboard/delivery-company" className="text-white">Delivery Company</Nav.Link>
        </Nav.Item>
        </>
        :
        <>
        <span style={{fontSize:"12px"}} className="text-uppercase text-secondary mb-1 fw-bold">Products</span>
        <Nav.Item role="button" className={`d-flex align-items-center ms-2 px-2 mb-1 ${currentLocation === "inventory" && "bg-primary rounded-3"}`}>
          <FaBoxOpen className="h4 text-white mb-0" />
          <Nav.Link href="/dashboard/inventory" className="text-white">Inventory</Nav.Link>
        </Nav.Item>
        <Nav.Item role="button" className={`d-flex align-items-center ms-2 px-2 mb-1 ${currentLocation === "product" && "bg-primary rounded-3"}`}>
          <FaShoppingCart className="h4 text-white mb-0" />
          <Nav.Link href="/dashboard/product/add" className="text-white">Product Management</Nav.Link>
        </Nav.Item>
        <Nav.Item role="button" className={`d-flex align-items-center ms-2 px-2 mb-1 ${currentLocation === "category" && "bg-primary rounded-3"}`}>
          <BiSolidCategory className="h4 text-white mb-0" />
          <Nav.Link href="/dashboard/category" className="text-white">Category</Nav.Link>
        </Nav.Item>
        <Nav.Item role="button" className={`d-flex align-items-center ms-2 px-2 mb-1 ${currentLocation === "subcategory" && "bg-primary rounded-3"}`}>
          <MdCategory  className="h4 text-white mb-0" />
          <Nav.Link href="/dashboard/subcategory" className="text-white">Subcategory</Nav.Link>
        </Nav.Item>
        <Nav.Item role="button" className={`d-flex align-items-center ms-2 px-2 mb-1 ${currentLocation === "category-details" && "bg-primary rounded-3"}`}>
          <FaTags  className="h4 text-white mb-0" />
          <Nav.Link href="/dashboard/category-details" className="text-white">Category Details</Nav.Link>
        </Nav.Item>
        </>
        }
        <hr/>
        <Nav.Item role="button" className={`d-flex align-items-center ms-2 px-2 mb-1 ${currentLocation === "setting" && "bg-primary rounded-3"}`}>
          <IoSettingsSharp className="h4 me-3 text-white mb-0" />
          <Nav.Link href="/dashboard/setting" className="text-white">Setting</Nav.Link>
        </Nav.Item>
        <Nav.Item className="d-flex align-items-center ms-2 px-2">
          <CiLogout className="h4 text-white mb-0 me-4" />
          <span onClick={handleLogout} role="button" className="text-white p-2">Logout</span>
        </Nav.Item>
      </Nav>
        </>
        :
        <div className="w-100 h-50 d-flex justify-content-center align-items-center">
        <l-ring
          size="40"
          stroke="5"
          bgOpacity="0"
          speed="2"
          color="white" 
        />
        </div>
      }
    </div>
  );
};

export default LefBar;
