import { Link } from 'react-router-dom'
import "./leftBarStyle.css"
const LeftBar = () => {
  return (
    <div className='leftBar'>
        <ul>
            <li>
                <Link to="/setting/profile">Profile</Link>
            </li>
            <li>
            <Link to="/setting/avatar">Avatar</Link>
            </li>
            <li>
            <Link to="/setting/password">Password</Link>
            </li>
        </ul>
    </div>
  )
}

export default LeftBar