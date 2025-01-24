import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import Cookies from "universal-cookie"
import { ApiKey } from "../Api/Api";
import { Dropdown } from "react-bootstrap";
import "./headerStyle.css";
import logo from "../Assit/images/logo.png";
const Header = () => {
  const [users,setUsers] = useState();
  const cookie = new Cookies();
  const user = cookie.get("auth");
  const nav = useNavigate();
  useEffect(()=>{
    if(user){
    axios.get("http://127.0.0.1:8000/api/v1/user",{
      params:{
        apiKey: ApiKey,
      },
      headers: {
        Authorization: `Bearer ${user}`, 
      },
  }).then((data)=>setUsers(data.data.data)).catch((err)=>console.log(err))
}
  },[]);
  console.log(users);
  const handleLogout = ()=>{
    axios.get("http://127.0.0.1:8000/api/v1/logout",{
      params:{
        apiKey: ApiKey,
      },
      headers: {
        Authorization: `Bearer ${user}`, 
      },
    }).then(cookie.remove("auth"),nav("/"));
  }
  return (
    <>
    {users ? (users.email_verify === 0 ?
    <div className="p-2 bg-light">
      <p>you not verify your account</p>
    </div> : "" )
     : ""}
    <header className="w-100 p-3">
        <nav className="d-flex justify-content-between align-items-center">
            <div>
                <img src={logo} width={100} alt="logo"/>
            </div>
            <div>
                <ul className=" list-unstyled mx-3">
                  <li>home</li>
                  <li>about us</li>
                  <li>contact</li>
                </ul>
            </div>
              {!user ?
            <div>
              <Link className="p-3 text-decoration-none" to="/login">Login</Link>
              <Link className="p-3 text-decoration-none" to="/register">Register</Link>
            </div>
              :  users ? 
              <Dropdown className="d-inline mx-2 bg-transparent">
              <Dropdown.Toggle id="dropdown-autoclose-true">
              {/* {users.first_name} */}

              <img className=" rounded-circle" width={50} src={`http://127.0.0.1:8000/images/avatars/${users.avatar}`} alt="prof"/>
              </Dropdown.Toggle>

              <Dropdown.Menu>
            <Dropdown.Item href="/setting">Setting</Dropdown.Item>
            <Dropdown.Item onClick={handleLogout} href="#">Logout</Dropdown.Item>
            </Dropdown.Menu>
            </Dropdown>
            : "Loading..."
              }
        </nav>
    </header>
    </>
  )
}

export default Header