import { useRef, useState } from "react"
import { ApiKey, APIURL, IMAGEURL } from "../Api/Api"
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "universal-cookie";
import useCloseOut from "../Hook/useClose";

const AvatarIcons = (props) => {

  const [menu,setMenu] = useState(false);
    const cookie = new Cookies();
    const token = cookie.get("auth");
    const nav = useNavigate();
    const menuRef = useRef(null);
    const handleLogout = ()=>{
      axios.get(`${APIURL}/logout`,{
        headers:{
          Authorization: `Bearer ${token}`,
          "x-api-key":ApiKey,
        }
    })
  .then(()=>cookie.remove("auth"))
  .finally(()=>{nav("/");window.location.reload()});
  }
  useCloseOut(menuRef,setMenu)
  return (
    <div className="position-relative">
    <img onClick={()=>setMenu(prev => !prev)} role="button" src={`${IMAGEURL}/avatars/${props.data.avatar}`} alt='avatar'/>
    {menu &&
    <ul ref={menuRef} className="position-absolute list-group p-3 bg-light end-0">
    {(props.data.role === "Admin" || props.data.role === "Product Manager" ) &&
      <li><Link className=" text-decoration-none" to="/dashboard">Dashboard</Link></li>
    }
      <li><Link className="text-decoration-none" to="/setting">Profile</Link></li>
      <li onClick={handleLogout}>Logout</li>
    </ul>}
    </div>
  )
}
export default AvatarIcons