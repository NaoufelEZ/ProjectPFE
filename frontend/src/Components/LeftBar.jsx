import { NavLink } from 'react-router-dom'
import "./leftBarStyle.css"
const LeftBar = () => {
  return (
    <div className='p-0 me-5 '>
        <ul>
            <li className="d-block pt-2 pb-2">
              <NavLink className={({ isActive }) => isActive ? "text-black text-decoration-none h6" : "text-muted text-decoration-none"}  to="/setting/purchases">My purchases</NavLink>
            </li>
            <li className="d-block pt-2 pb-2">
              <NavLink className={({ isActive }) => isActive ? "text-black text-decoration-none h6" : "text-muted text-decoration-none"} to="/setting/personal-details">Personal details</NavLink>
            </li>
            <li className="d-block pt-2 pb-2">
            <NavLink className={({ isActive }) => isActive ? "text-black text-decoration-none h6" : "text-muted text-decoration-none"} to="/setting/saved-addresses">Saved addresses</NavLink>
            </li>
        </ul>
    </div>
  )
}

export default LeftBar