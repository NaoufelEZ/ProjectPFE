import { Navigate, Outlet } from "react-router-dom";
import Cookies from "universal-cookie"

const ReqLogin = () => {
  const cookie = new Cookies();
  const token = cookie.get("auth");
  return  token ? <Navigate to={"/"} replace/> : <Outlet />;
}

export default ReqLogin