import axios from "axios";
import { useEffect, useState } from "react"
import { ApiKey, APIURL, IMAGEURL } from "../../Api/Api";
import Cookies from "universal-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

const TopBar = () => {
  const [user,setUser] = useState([]);
  const [click,setClick] = useState(false);
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
  console.log(click)
  return (
    <header style={{height:"60px"}} className="w-100 bg-light px-3">
      <nav className="d-flex align_items_center justify-content-end">
      <div role="button" onClick={()=>setClick(prev => !prev)}>
        <img  className="me-2" src={`${IMAGEURL}/avatars/${user.avatar}`} alt="avatar" />
        <FontAwesomeIcon icon={faChevronDown} />
      </div>
      </nav>
      {click && <div className="bg-light rounded p-2 end-0 position-absolute d-flex flex-column mt-3 me-3">
          <div className="bg-white rounded p-1 d-flex flex-column">
            {<span>{user.first_name} {user.last_name}</span>}
            {<span>{user.role}</span>}
          </div>
          <span role="button">Setting</span>
          <span role="button">Logout</span>
        </div>}
    </header>
  )
}

export default TopBar