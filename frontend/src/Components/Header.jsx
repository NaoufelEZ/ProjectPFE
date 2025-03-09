import { useState,useEffect, useRef } from "react";
import logo from "../Assets/images/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBagShopping, faChevronDown, faClose, faHeart, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import "./HeaderTest.css";
import AvatarIcons from "./AvatarIcons";
import axios from "axios";
import Cookies from "universal-cookie";
import { ApiKey, APIURL } from "../Api/Api";
import { Link } from "react-router-dom";
import Basket from "./Basket";
import { Col, Row } from "react-bootstrap";
const Header = () => {
    const [user,setUser] = useState();
    const [isSearch,setIsSearch] = useState(false);
    const [basket, setBasket] = useState(false);
    const [search,setSearch] = useState("");
    const [click,setClick] = useState({"action":false});
    const [choseMenu,setChoseMenu] = useState({"cat":1,"sub":1,"change":false});
    const [subcategory,setSubcategory] = useState([]);
    const [categoryDetails,setCategoryDetails] = useState([]);
    const cookie = new Cookies();
    const token = cookie.get("auth");
    const basketDiv = useRef();
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
    useEffect(()=>{
        axios.get(`${APIURL}/category/${choseMenu.cat}/subcategory/${choseMenu.sub}`,{
            headers:{
                Accept:"application/json",
                "x-api-key":ApiKey
            }
        }).then((response)=>setCategoryDetails(response.data));
    },[choseMenu]);
    useEffect(()=>{
        axios.get(`${APIURL}/subcategory`,{
            headers:{
                Accept:"application/json",
                "x-api-key":ApiKey
            }
        }).then((response)=>setSubcategory(response.data.data));
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
    (click.action || basket) && 
    <div style={{height:"100vh"}} className={`bg-dark w-100 position-absolute ${basket && "z-2"} opacity-50`}></div>
    }
    <header  style={{height:"70px"}} className="bg-light w-100 position-relative">
        <nav className="d-flex justify-content-between align-items-center h-100 p-3">
            <div className="d-flex">
                <div role="button" onClick={()=>{setClick(prev => ({section:"man",action: prev.section === "women" ? true : !prev.action}));setChoseMenu({cat:1,sub:1,change:false})}} className="d-flex me-4 align-items-center">
                    <span className="me-2">Man</span>
                    <FontAwesomeIcon className={`${(click.action && click.section === "man") && "rotate-180"}`} icon={faChevronDown} />
                </div>
                <div role="button" onClick={()=>{setClick(prev => ({section:"women",action: prev.section === "man" ? true : !prev.action}));setChoseMenu({cat:2,sub:1,change:false})}} className="d-flex align-items-center">
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
            {user ? <AvatarIcons data={user} /> : <><Link className="me-3 text-decoration-none" to="/login">Login</Link><Link className="text-decoration-none" to="/register">Sign Up</Link></>}
            </div>
        </nav>
        {/* onMouseOut={()=>setClick(prev => ({action:false,section:prev.section}))} */}
        <div className={`mega bg-light ${click.action ? "show" : ""}`}>
            <Row className="text-black p-2">
                <Col className="d-flex flex-column col-3">
                    <span role="button">New</span>
                    {subcategory && subcategory.map((element,key)=>(
                        <span onClick={()=>setChoseMenu({cat: click.section === "man" ? 1 : 2,sub:key + 1,change:true})} role="button" key={key}>{element.subcategories}</span>
                    ))}
                </Col>
                <Col className="menu-grid">
                            {choseMenu && choseMenu.change === true ? <div className="grid-container">{ 
                                categoryDetails.map((element,index)=>(
                                    <span role="button" key={index}>{element.categoryDetails}</span>
                                ))}
                        </div>
                    : <span className="text-muted">Select a category</span>}
                </Col>
            </Row>
        </div>

        {basket && <Basket token={token} open={basket} setBasket={setBasket} />}

        
    </header>
    </>
  )
}

export default Header