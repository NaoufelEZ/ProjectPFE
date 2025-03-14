import { Outlet } from "react-router-dom"
import TopBar from "../../Components/Dashboard/TopBar"
import LeftBar from "../../Components/Dashboard/LeftBar"

const Dashboard = () => {
  return (
    <>
    <TopBar />
    <div className="d-flex">
    <LeftBar />
    <Outlet />
    </div>
    
    </>
  )
}

export default Dashboard