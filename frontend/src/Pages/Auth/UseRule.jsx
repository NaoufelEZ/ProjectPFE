import { Outlet, useNavigate } from "react-router-dom";
import useUser from "../../Hooks/useUser";

const UseRule = () => {
    const navigate = useNavigate();
    const user = useUser()
  return (
    user ? 
        user.role === "Client" ? 
            <Outlet />
        :
        navigate("/dashboard")
        :
        <Outlet />

  )
}

export default UseRule