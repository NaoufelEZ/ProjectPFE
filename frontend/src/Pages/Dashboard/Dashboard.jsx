import { Outlet } from "react-router-dom"
import TopBar from "../../Components/Dashboard/TopBar"
import LeftBar from "../../Components/LeftBar"

const Dashboard = () => {
  return (
    <>
      <TopBar />
      <LeftBar />
      <Outlet />
    </>
  )
}

export default Dashboard