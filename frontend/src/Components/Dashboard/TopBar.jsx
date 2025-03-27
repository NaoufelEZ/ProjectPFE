import { Outlet } from "react-router-dom"

const TopBar = () => {
  const role = "Admin"
  return (
    <div className='w-100 p-3 bg-light'>
      <h2>Dashboard Admin</h2>
      <hr/>
      <div className="p-2 bg-white rounded-3">
      <Outlet />
      </div>
    </div>
  )
}

export default TopBar