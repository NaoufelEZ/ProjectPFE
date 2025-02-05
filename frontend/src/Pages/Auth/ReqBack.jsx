import { Navigate, Outlet } from "react-router-dom";
import Cookies from "universal-cookie"

const ReqBack = () => {
  const cookie = new Cookies();
  const token = cookie.get("auth");
  return  token ? <Outlet /> : <Navigate to={"/login"}/>;
}

export default ReqBack