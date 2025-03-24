import axios from "axios";
import { useEffect, useState } from "react"
import { ApiKey, APIURL, IMAGEURL } from "../../Api/Api";
import Cookies from "universal-cookie";
import { FaBars, FaBell, FaUser } from 'react-icons/fa';
import { Container, Dropdown, Form, InputGroup, Nav, Navbar } from "react-bootstrap";
import './topbar.css'

const TopBar = ({toggleSidebar}) => {
  const [user,setUser] = useState([]);
  const [click,setClick] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const cookie = new Cookies();
  const token = cookie.get("auth");
  useEffect(()=>{
    axios.get(`${APIURL}/user`,{
      headers:{
        Accept:"application/json",
        Authorization:`Bearer ${token}`,
        "x-api-key":ApiKey,
      }
    }).then((response)=>setUser(response.data.data));
  },[]);
  return (
    <Navbar className="dashboard-navbar py-2 mb-0" expand="lg">
      <Container fluid>
        <div className="d-flex d-lg-none">
          <button
            className="btn btn-link text-dark p-0 me-2"
            onClick={toggleSidebar}
          >
            <FaBars />
          </button>
          <Navbar.Brand className="d-lg-none">Dashboard</Navbar.Brand>
        </div>

        <div className="d-none d-lg-block">
          <h5 className="mb-0">Dashboard</h5>
        </div>

        <Navbar.Toggle aria-controls="navbar-search" className="ms-auto d-lg-none" />

        <Navbar.Collapse id="navbar-search" className="justify-content-between w-100">

        <Nav className="ms-auto align-items-center d-flex">
  <Dropdown align="end" className="me-2 d-flex align-items-center">
    <Dropdown.Toggle 
      variant="link" 
      className="nav-link p-0 d-flex align-items-center" 
      id="notification-dropdown"
    >
      <div className="position-relative d-flex align-items-center">
        <FaBell className="text-dark h5 mb-0" />
        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
          17
        </span>
      </div>
    </Dropdown.Toggle>

    <Dropdown.Menu>
      <Dropdown.Item>Notification 1</Dropdown.Item>
      <Dropdown.Item>Notification 2</Dropdown.Item>
      <Dropdown.Item>Notification 3</Dropdown.Item>
      <Dropdown.Divider />
      <Dropdown.Item>See all notifications</Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>

  <Dropdown align="end">
    <Dropdown.Toggle 
      variant="link" 
      className="nav-link d-flex align-items-center p-0" 
      id="user-dropdown"
    >
      <div className=" bg-primary rounded-pill me-1" style={{width:"38px",height:"30px"}}>
        <FaUser className="h6 mb-0 text-center align-middle" />
      </div>
    </Dropdown.Toggle>

    <Dropdown.Menu>
      <Dropdown.Item>Profile</Dropdown.Item>
      <Dropdown.Item>Settings</Dropdown.Item>
      <Dropdown.Divider />
      <Dropdown.Item>Logout</Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
</Nav>


</Navbar.Collapse>

      </Container>
    </Navbar>
  )
}

export default TopBar