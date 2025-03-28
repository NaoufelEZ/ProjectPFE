import { useState, useEffect } from "react";
import logo from "../Assets/images/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import "./HeaderTest.css";
import { FiUser } from "react-icons/fi";
import axios from "axios";
import Cookies from "universal-cookie";
import { ApiKey, APIURL } from "../Api/Api";
import { Link, NavLink, useNavigate, useParams } from "react-router-dom";
import Basket from "./Basket";
import { Col, Row } from "react-bootstrap";
import BasketUi from "../Assets/UI/BasketUi";
import SearchBar from "../Assets/UI/SearchBar";

const Header = () => {
  const { cat } = useParams();
  const [user, setUser] = useState(null);
  const [basket, setBasket] = useState(false);
  const [click, setClick] = useState({ action: false });
  const [choseMenu, setChoseMenu] = useState({
    cat: cat,
    sub: "Clothes",
    change: false,
  });
  const [subcategory, setSubcategory] = useState([]);
  const [categoryDetails, setCategoryDetails] = useState([]);
  const [categories, setCategories] = useState([]);
  const [lastNav, setLastNav] = useState(localStorage.getItem("navTo") || "");
  
  const cookie = new Cookies();
  const token = cookie.get("auth");
  const navigate = useNavigate();

  // Fetch User Data
  useEffect(() => {
    if (token) {
      axios
        .get(`${APIURL}/user`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "x-api-key": ApiKey,
          },
        })
        .then((response) => setUser(response.data.data))
        .catch(() => {
          cookie.remove("auth", { path: "/" });
          navigate("/");
        });
    }
  }, [token]);

  // Fetch Categories
  useEffect(() => {
    axios
      .get(`${APIURL}/category`, {
        headers: {
          Accept: "application/json",
          "x-api-key": ApiKey,
        },
      })
      .then((response) => setCategories(response.data.data));
  }, []);

  // Fetch Subcategories
  useEffect(() => {
    if (cat || lastNav) {
      axios
        .get(`${APIURL}/category/${cat || lastNav}/subcategory`, {
          headers: {
            Accept: "application/json",
            "x-api-key": ApiKey,
          },
        })
        .then((response) => setSubcategory(response.data.data));
    }
  }, [cat, lastNav]);

  // Fetch Category Details
  useEffect(() => {
    if (cat || lastNav) {
      axios
        .get(`${APIURL}/category/${cat || lastNav}/subcategory/${choseMenu.sub}`, {
          headers: {
            Accept: "application/json",
            "x-api-key": ApiKey,
          },
        })
        .then((response) => setCategoryDetails(response.data));
    }
  }, [choseMenu, cat, lastNav]);
  return (
    <>
      {(click.action || basket) && (
        <div
          style={{ height: "100vh" }}
          className={`bg-dark w-100 position-absolute ${
            basket && "z-2"
          } opacity-50`}
        ></div>
      )}

      <header className="bg-light position-sticky w-100 top-0 z-2" style={{ height: "70px" }}>
        <nav className="d-flex align-items-center h-100 justify-content-between p-3">
          {/* Left Menu */}
          <div className="d-flex">
            {categories.length > 0 ? (
              categories.map((e, index) => (
                <div
                  key={index}
                  role="button"
                  onClick={() => {
                    localStorage.setItem("navTo", e.category);
                    setLastNav(e.category);
                    setClick((prev) => ({
                      section: e.category,
                      action: prev.section === e.category ? !prev.action : true,
                    }));
                    setChoseMenu({ cat: e.category, sub: subcategory[0]?.subcategories || "Clothes", change: false });
                  }}
                  className="d-flex align-items-center me-4"
                >
                  <NavLink to={`/${e.category}`} className={({isActive}) => isActive ? "me-2 text-black fw-bold text-uppercase" : "me-2 text-muted text-uppercase"}>
                    {e.category}
                  </NavLink>
                  <FontAwesomeIcon
                    className={`${
                      click.action && click.section === e.category
                        ? "rotate-180"
                        : ""
                    }`}
                    icon={faChevronDown}
                  />
                </div>
              ))
            ) : (
              <span>Nothing</span>
            )}
          </div>

          {/* Logo */}
          <div>
            <Link to={lastNav ? `/${lastNav}` : "/Man"}>
              <img width={60} src={logo} alt="logo" />
            </Link>
          </div>

          {/* Right Menu */}
          <div className="d-flex align-items-center justify-content-between gap-4">
            <SearchBar />
            {user ? (
              <Link className="text-decoration-none text-black" to="/setting/purchases">
                <FiUser className="m-0 h3 pe-2" role="button" />
                <span>{user.first_name}</span>
              </Link>
            ) : (
              <Link className="text-decoration-none text-black" to="/login">
                <FiUser className="m-0 h3 pe-2" role="button" />
                <span>Login</span>
              </Link>
            )}
              <div onClick={() => setBasket((prev) => !prev)}>
              <BasketUi />
              </div>
          </div>
        </nav>

        {/* Mega Menu */}
        <div className={`mega bg-light ${click.action ? "show" : ""}`}>
          <Row className="p-2 text-black">
            <Col className="col-3 d-flex flex-column">
              <span className="mb-3" role="button">New</span>
              {subcategory
                .filter((item) => item.subcategories !== "New")
                .map((element, key) => (
                  <span
                    className="mb-3"
                    onClick={() => setChoseMenu({ cat: cat, sub: element.subcategories, change: true })}
                    role="button"
                    key={key}
                  >
                    {element.subcategories}
                  </span>
                ))}
            </Col>
            <Col className="menu-grid">
              {choseMenu.change ? (
                <div className="grid-container">
                  {categoryDetails.map((element, index) => (
                    <Link className="text-decoration-none" to={`${choseMenu.sub}/${element.categoryDetails.replaceAll(" ","-")}`} role="button" key={index}>
                      {element.categoryDetails}
                    </Link>
                  ))}
                </div>
              ) : (
                <span className="text-muted">Select a category</span>
              )}
            </Col>
          </Row>
        </div>

        {/* Basket Component */}
        {basket && <Basket token={token} open={basket} setBasket={setBasket} />}
      </header>
    </>
  );
};

export default Header;
