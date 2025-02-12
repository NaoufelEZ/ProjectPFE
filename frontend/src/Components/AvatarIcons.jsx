import { useState } from "react"
import { ApiKey, APIURL, IMAGEURL } from "../Api/Api"
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "universal-cookie";

const AvatarIcons = (props) => {
  console.log(props);
  const [menu,setMenu] = useState(false);
    const cookie = new Cookies();
    const token = cookie.get("auth");
    const nav = useNavigate();
  const handleLogout = ()=>{
    axios.get(`${APIURL}/logout`,{
      params:{
        apiKey: ApiKey
      },
      headers:{
        Authorization: `Bearer ${token}`
      }
    })
  .then(()=>cookie.remove("auth"))
  .finally(()=>nav("/"));
  }
  return (
    <div className="position-relative">
    <img onClick={()=>setMenu(prev => !prev)} role="button" src={`${IMAGEURL}/avatars/${props.data.avatar}`} alt='avatar'/>
    {menu &&
    <ul className="position-absolute list-group p-3 bg-light end-0">
    {(props.data.role === "Admin" || props.data.role === "Product Manager" ) &&
      <li><Link to="/dashboard">Dashboard</Link></li>
    }
      <li><Link to="/setting">Profile</Link></li>
      <li onClick={handleLogout}>Logout</li>
      <li>{}</li>
    </ul>}
    </div>
  )
}
export default AvatarIcons