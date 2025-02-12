import { useState,useEffect } from "react";
import logo from "../Assets/images/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBagShopping, faChevronDown, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import "./HeaderTest.css";
import AvatarIcons from "./AvatarIcons";
import axios from "axios";
import Cookies from "universal-cookie";
import { ApiKey, APIURL } from "../Api/Api";
import { Link } from "react-router-dom";
const HeaderTest = () => {
    const [user,setUser] = useState();
    const [isSearch,setIsSearch] = useState(false);
    const [search,setSearch] = useState("");
    const [dataSearch,setDataSearch] = useState([]);
    const [click,setClick] = useState({"action":false});
    const cookie = new Cookies();
    const token = cookie.get("auth");
    useEffect(()=>{
        if(token){
            axios.get(`${APIURL}/user`,{
                params:{
                    apiKey:ApiKey
                },
                headers:{
                    Authorization:`Bearer ${token}`
                }
            }
        ).then((data)=>setUser(data.data.data));
        }
    },[token]);
    // collect all the products data
    // useEffect(()=>{
    //     axios.get(`${APIURL}/products`,{
    //         params:{
    //             apiKey:ApiKey
    //         },
    //         headers:{
    //             Accept:"application/json"
    //         }
    //     }).then((data)=>setDataSearch(data.data.data.title))
    // },[])
    useEffect(()=>{
        axios.get("/TunisianLocation/data.json").then((response)=>setDataSearch(response.data)).catch((err)=>console.log(err));
    },[]);
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
    click.action &&
    <div style={{height:"100vh"}} className="bg-dark w-100 position-absolute opacity-50"></div>
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
            <div className="d-flex align-items-center">
            <FontAwesomeIcon role="button" onClick={()=>setIsSearch(prev => !prev)} icon={faMagnifyingGlass} />
            <FontAwesomeIcon icon={faBagShopping}/>
            {user ? <AvatarIcons data={user} /> : <><Link className="me-3 text-decoration-none" to="login">Login</Link><Link className="text-decoration-none" to="register">Sign Up</Link></>}
            </div>
        </nav>

        <div className={`mega bg-dark ${click.action ? "show" : ""}`}>
        <div className="text-light">Hello {
                click.section === "man" ? <span>man</span> : <span>women</span>
            }</div>
        </div>
        
    </header>
    </>
  )
}

export default HeaderTest