import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import Cookies from "universal-cookie"
import { ApiKey } from "../Api/Api";
import { Dropdown } from "react-bootstrap";
import "./headerStyle.css";
import logo from "../Assets/images/logo.png";
import Card from "./Card";

const Header = () => {
  const [users,setUsers] = useState();
  const [showCard, setShowCard] = useState(false);

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
  }).then((data)=>setUsers(data.data.data)).catch(()=>{cookie.remove("auth",{ path: "/" });nav("/")});
}
  },[user]);
  const handleLogout = ()=>{
    axios.get("http://127.0.0.1:8000/api/v1/logout",{
      params:{
        apiKey: ApiKey,
      },
      headers: {
        Authorization: `Bearer ${user}`, 
      },
    }).then(()=>{cookie.remove("auth",{ path: "/" });nav("/")});
  }
  const handleSend = ()=>{
    try{
    axios.post("http://127.0.0.1:8000/api/v1/send",
      {
      apiKey:ApiKey,
      },
      {
      headers :{
        Authorization: `Bearer ${user}`,
      }
    }).then(nav("/auth/verify"));
    }catch(err){
      console.log(err);
    }
  }
  const handleShowCard = () =>{
    setShowCard(prev => !prev);
  }
  return (
    <>
    {users ? (users.email_verify === 0 ?
    <div className="verify bg-light d-flex justify-content-between align-items-center">
      <span>you not verify your account</span>
      <div role="button" onClick={handleSend}>Verify Account</div>
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
            <div>              <Link className="p-3 text-decoration-none" to="/login">Login</Link>
              <Link className="p-3 text-decoration-none" to="/register">Register</Link>
            </div>            
              :  users ? 
              <Dropdown className="d-inline mx-2 bg-transparent">
              <Dropdown.Toggle id="dropdown-autoclose-true">
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
        <div>
         {showCard && <Card />}
          </div>
    </header>
    </>
  )
}

export default Header