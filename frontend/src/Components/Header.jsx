import { useState,useEffect } from "react";
import logo from "../Assets/images/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBagShopping, faChevronDown, faClose, faHeart, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import "./HeaderTest.css";
import AvatarIcons from "./AvatarIcons";
import axios from "axios";
import Cookies from "universal-cookie";
import { ApiKey, APIURL } from "../Api/Api";
import { Link } from "react-router-dom";
const Header = () => {
    const [user,setUser] = useState();
    const [isSearch,setIsSearch] = useState(false);
    const [search,setSearch] = useState("");
    const [basket,setBasket] = useState(false);
    const [click,setClick] = useState({"action":false});
    const cookie = new Cookies();
    const token = cookie.get("auth");
    useEffect(()=>{
        if(token){
            axios.get(`${APIURL}/user`,{
                headers:{
                    Authorization:`Bearer ${token}`,
                    "x-api-key":ApiKey,
                }
            }
        ).then((data)=>setUser(data.data.data));
        }
    },[token]);
    return (
    <>
    {
        isSearch &&
        <div className="py-5 w-100 d-flex justify-content-center">
            <input onChange={(e)=>setSearch(e.target.value)} value={search} type="text" />
            <button>search</button>
        </div>
    }
    {
    (click.action || basket) && 
    <div style={{height:"100vh"}} className={`bg-dark w-100 position-absolute ${basket && "z-2"} opacity-50`}></div>
    }
    <header  style={{height:"70px"}} className="bg-light w-100 position-relative">
        <nav className="d-flex justify-content-between align-items-center h-100 p-3">
            <div className="d-flex">
                <div role="button" onClick={()=>setClick(prev => ({section:"man",action: prev.section === "women" ? true : !prev.action}))} className="d-flex me-4 align-items-center">
                    <span className="me-2">Man</span>
                    <FontAwesomeIcon className={`${(click.action && click.section === "man") && "rotate-180"}`} icon={faChevronDown} />
                </div>
                <div role="button" onClick={()=>setClick(prev => ({section:"women",action: prev.section === "man" ? true : !prev.action}))} className="d-flex align-items-center">
                    <span className="me-2">Women</span>
                    <FontAwesomeIcon className={`${(click.action && click.section === "women") && "rotate-180"}`} icon={faChevronDown} />
                </div>
            </div>
            <div>
                <Link to="/"><img width={60} src={logo} alt='logo'/></Link>
            </div>
            <div style={{width:"180px"}} className="d-flex align-items-center justify-content-between">
            <FontAwesomeIcon className="h6 m-0" role="button" onClick={()=>setIsSearch(prev => !prev)} icon={faMagnifyingGlass} />
            <FontAwesomeIcon onClick={()=>setBasket(prev=>!prev)} className="h6 m-0" role="button" icon={faBagShopping}/>
            {user ? <AvatarIcons data={user} /> : <><Link className="me-3 text-decoration-none" to="login">Login</Link><Link className="text-decoration-none" to="register">Sign Up</Link></>}
            </div>
        </nav>

        <div onMouseOut={()=>setClick(prev => ({action:false,section:prev.section}))} className={`mega bg-dark ${click.action ? "show" : ""}`}>
        <div className="text-light">Hello {
                click.section === "man" ? <span>man</span> : <span>women</span>
            }</div>
        </div>
        {basket && <div style={{height:"100vh"}} className="w-25 bg-light position-absolute end-0 top-0 z-3 p-3">
            <div className="w-100 d-flex justify-content-end p-3">
            <span role="button" onClick={()=>setBasket(prev => false)}><FontAwesomeIcon className="h5" icon={faClose} /></span>
            </div>
            <div className="w-100 d-flex d-flex justify-content-between">
                <h3>Basket</h3>
               {token && <div role="button" className="p-2 border rounded-pill d-flex align-items-center">
                    <FontAwesomeIcon className="text-danger h6 mb-0 me-1" icon={faHeart} />
                    <span>Wishlist</span>
                    </div>}
            </div>
            </div>}

        
    </header>
    </>
  )
}

export default Header