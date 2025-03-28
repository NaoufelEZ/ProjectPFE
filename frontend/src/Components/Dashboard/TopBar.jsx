import { Outlet } from "react-router-dom"
import useUser from "../../Hooks/useUser"

const TopBar = () => {
  const user = useUser();
  return (
    <div className='w-100 p-3 bg-light'>
      <h2>Dashboard {user && user.role}</h2>
      <hr/>
      <div className="p-2 bg-white rounded-3">
      <Outlet />
      </div>
    </div>
  )
}

export default TopBar