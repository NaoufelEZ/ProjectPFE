import { NavLink, useNavigate } from 'react-router-dom'
import "./leftBarStyle.css"
import Cookies from 'universal-cookie';
import { ApiKey,APIURL } from '../Api/Api';
import axios from 'axios';
import useUser from '../Hooks/useUser';
const LeftBar = () => {
  const cookie = new Cookies();
  const token = cookie.get("auth"); 
  const user = useUser();
  const navigate = useNavigate();
  const handleLogout = () => {
    axios.get(`${APIURL}/logout`,{
      headers:{
        Authorization: `Bearer ${token}`,
        "x-api-key":ApiKey,
      }
  })
.then(()=>cookie.remove("auth",{path:"/"}))
.finally(()=>{
  navigate("/")
  window.location.reload(); 
});
  }
  return (
    <div className='p-0 me-5 '>
        <ul>
          <div>
          <span className='h5'>Hi {user?.first_name}</span>
          <p>{user?.email}</p>
          </div>
            <li className="d-block pt-2 pb-2">
              <NavLink className={({ isActive }) => isActive ? "text-black text-decoration-none h5" : "text-muted text-decoration-none h6"}  to="/setting/purchases">My purchases</NavLink>
            </li>
            <li className="d-block pt-2 pb-2">
              <NavLink className={({ isActive }) => isActive ? "text-black text-decoration-none h5" : "text-muted text-decoration-none h6"} to="/setting/personal-details">Personal details</NavLink>
            </li>
            <li className="d-block pt-2 pb-2">
            <NavLink className={({ isActive }) => isActive ? "text-black text-decoration-none h5" : "text-muted text-decoration-none h6"} to="/setting/saved-addresses">Saved addresses</NavLink>
            </li>
        </ul>
        <span onClick={handleLogout} role="button" className="ms-3 h6">Logout</span>
    </div>
  )
}

export default LeftBar