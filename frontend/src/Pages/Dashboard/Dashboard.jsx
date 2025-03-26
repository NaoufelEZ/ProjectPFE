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
    <div className="d-flex">
  {user ? (
    user.role === "Admin" ? (
      <>
        <LeftBar />
        <TopBar />

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