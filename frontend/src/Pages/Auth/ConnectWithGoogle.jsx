import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"
import Cookies from "universal-cookie";

const ConnectWithGoogle = () => {
    const {token} = useParams();
    const navigate = useNavigate()
    const cookie = new Cookies();
    useEffect(()=>{
        cookie.set("auth", token, { path: "/" });
        navigate("/");
    },[token]);
    
  return (
    <div>ConnectWithGoogle</div>
  )
}

export default ConnectWithGoogle