import { Navigate, Outlet } from "react-router-dom";
import Cookies from "universal-cookie"
import Loading from "../../Components/Loading";
import { useEffect, useState } from "react";
import axios from "axios";
import { ApiKey, APIURL } from "../../Api/Api";

const ReqRule = ({allowedRule}) => {
    const cookie = new Cookies();
    const token = cookie.get("auth"); 
    const [user,setUser] = useState();
    useEffect(()=>{
      axios.get(`${APIURL}/user`,{
        headers:{
          Authorization : `Bearer ${token}`,
          "x-api-key":ApiKey,
        }
      }).then((data)=>setUser(data.data.data)).catch((err)=>console.log(err))
    },[token]);
  return (
    token ?
    (!user ? <Loading /> 
    : (allowedRule.includes(user.role) ? <Outlet /> : <Navigate to={"/"} replace/> )  ) 
    : <Navigate to={"/login"} replace/> 
  )
}

export default ReqRule