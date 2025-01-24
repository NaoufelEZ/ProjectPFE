import { Navigate, Outlet } from "react-router-dom";
import Cookies from "universal-cookie"

const ReqAuth = () => {
    const cookie = new Cookies();
    const token = cookie.get("auth");
  return  token ? <Navigate to={"/"}/> : <Outlet />;
}

export default ReqAuth