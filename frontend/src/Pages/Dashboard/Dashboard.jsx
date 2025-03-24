import { Outlet } from "react-router-dom"
import TopBar from "../../Components/Dashboard/TopBar"
import LeftBar from "../../Components/Dashboard/LeftBar"
import Loading from "../../Components/Loading"
import LeftBarProduct from "../../Components/Dashboard/LeftBarProduct"
import useUser from '../../Hooks/useUser'

const Dashboard = () => {
  const user = useUser();
  return (
    <>
    <TopBar />
    <div className="d-flex g-5">
  {user ? (
    user.role === "Admin" ? (
      <>
        <LeftBar />
        <Outlet />
      </>
    ) : (
      <>
        <LeftBarProduct />
        <Outlet />
      </>
    )
  ) : (
    <Loading />
  )}
</div>
    
    </>
  )
}

export default Dashboard