import { useState } from "react";
import logo from "../Assets/images/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faV } from "@fortawesome/free-solid-svg-icons";
import "./HeaderTest.css";
const HeaderTest = () => {
    const [click,setClick] = useState({"action":false});
    console.log(click);
  return (
    <>
    {
    click.action &&
    <div style={{height:"100vh"}} className="bg-dark w-100 position-absolute opacity-50"></div>
    }
    <header  style={{height:"70px"}} className="bg-light w-100 position-relative">
        <nav className="d-flex justify-content-between align-items-center h-100 p-3">
            <div className="d-flex">
                <div role="button" onClick={()=>setClick(prev => ({section:"man",action: prev.section === "women" ? true : !prev.action}))} className="d-flex me-4 align-items-center">
                    <span className="me-2">Man</span>
                    <FontAwesomeIcon className={`${(click.action && click.section === "man") && "rotate-180"}`} icon={faV} />
                </div>
                <div role="button" onClick={()=>setClick(prev => ({section:"women",action: prev.section === "man" ? true : !prev.action}))} className="d-flex align-items-center">
                    <span className="me-2">Women</span>
                    <FontAwesomeIcon className={`${(click.action && click.section === "women") && "rotate-180"}`} icon={faV} />
                </div>
            </div>
            <div>
                <img width={60} src={logo} alt='logo'/>
            </div>
            <div>
                <p>hello</p>
            </div>
        </nav>

        <div className={`mega bg-dark ${click.action ? "show" : ""}`}>
        <div className="text-light">Hello {
                click.section === "man" ? <span>MEN</span> : <span>WOMEN</span>
            }</div>
        </div>
        
    </header>
    </>
  )
}

export default HeaderTest