import { useState, useEffect, useRef } from "react";
import logo from "../Assets/images/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronRight } from "@fortawesome/free-solid-svg-icons";
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
  const [notify,setNotify] = useState(0);
  const [choseMenu, setChoseMenu] = useState({
    cat: cat,
    sub: "Clothes",
    change: false,
  });
  const [subcategory, setSubcategory] = useState([]);
  const [categoryDetails, setCategoryDetails] = useState([]);
  const [categories, setCategories] = useState([]);
  const [lastNav, setLastNav] = useState(localStorage.getItem("navTo") || "");

  const megaMenuRef = useRef(null);
  const headerRef = useRef(null);

  const cookie = new Cookies();
  const token = cookie.get("auth");
  const navigate = useNavigate();

  const imagePreviews = {
    Clothes: {
      Shirts: "/Assets/images/clothes-shirts.jpg",
      Pants: "/Assets/images/clothes-pants.jpg",
    },
    Shoes: {
      Sneakers: "/Assets/images/shoes-sneakers.jpg",
      Boots: "/Assets/images/shoes-boots.jpg",
    },
  };

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

  const handleMouseLeave = (e) => {
    if (megaMenuRef.current && !megaMenuRef.current.contains(e.relatedTarget)) {
      setClick({ action: false });
    }
  };

  useEffect(() => {
    if (click.action && megaMenuRef.current) {
      megaMenuRef.current.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (megaMenuRef.current) {
        megaMenuRef.current.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [click.action]);

  const isFeaturedCategory = (category) => {
    return ['Clothes', 'Shoes'].includes(category);
  };
  useEffect(()=>{
    axios.get(`${APIURL}/order/all/check`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        "x-api-key": ApiKey,
      }
    }).then((response)=>setNotify(response.data.data))
    .catch(()=>null)
  },[token])

  return (
    <>
      {(click.action || basket) && (
        <div
          className={`overlay ${basket ? "basket-overlay" : ""}`}
          onClick={() => {
            if (basket) setBasket(false);
            if (click.action) setClick({ action: false });
          }}
        ></div>
      )}

      <header className="bg-white position-sticky w-100 top-0 shadow-sm" ref={headerRef}>
        <nav className="d-flex align-items-center h-100 p-3 position-relative">
          <div className="d-flex flex-grow-1">
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
                    setChoseMenu({
                      cat: e.category,
                      sub: subcategory[0]?.subcategories || "Clothes",
                      change: false,
                    });
                  }}
                  className="d-flex align-items-center me-4"
                >
                  <NavLink
                    to={`/${e.category}`}
                    className={({ isActive }) =>
                      isActive
                        ? "me-2 text-black fw-bold text-uppercase"
                        : "me-2 text-muted text-uppercase"
                    }
                  >
                    {e.category}
                  </NavLink>
                  <FontAwesomeIcon
                    className={`${click.action && click.section === e.category ? "rotate-180" : ""}`}
                    icon={faChevronDown}
                    style={{ fontSize: '0.8rem' }}
                  />
                </div>
              ))
            ) : (
              <span>Nothing</span>
            )}
          </div>

          <div className="position-absolute start-50 translate-middle-x">
            <Link to={lastNav ? `/${lastNav}` : "/Man"}>
              <img width={60} src={logo} alt="logo" />
            </Link>
          </div>

          <div className="d-flex align-items-center justify-content-end flex-grow-1 gap-4">
            <SearchBar />
            {user ? (
              <Link className="text-decoration-none text-black position-relative" to="/setting/purchases">
                <FiUser className="m-0 h3 pe-2" role="button" />
                {
                  notify > 0 &&
                <span className="notify"></span>
                }
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

        <div className={`mega-menu bg-white ${click.action ? "show" : ""}`} ref={megaMenuRef}>
          <div className="container-fluid py-4">
            <Row className="w-100 text-black mega-row">
              <Col className="col-3 d-flex flex-column pe-4">
                <h5 onClick={()=>navigate(`/${choseMenu.cat}/new`)} role="button" className="fw-bold mb-4">NEW</h5>
                {subcategory
                  .filter((item) => item.subcategories !== "New")
                  .map((element, key) => (
                    <div
                      className="subcategory-item mb-3"
                      key={key}
                      onClick={() =>
                        setChoseMenu({
                          cat: cat,
                          sub: element.subcategories,
                          change: true,
                        })
                      }
                    >
                      <div className="d-flex align-items-center">
                        <span className={`subcategory-name ${isFeaturedCategory(element.subcategories) ? 'featured' : ''}`}>
                          {element.subcategories}
                        </span>
                        {isFeaturedCategory(element.subcategories) && (
                          <div className="arrow-container">
                            <span className="arrow-line"></span>
                            <FontAwesomeIcon icon={faChevronRight} className="arrow-icon" />
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
              </Col>

              <Col className="menu-grid ps-0 position-relative">
                <div className="vertical-line"></div>
                {choseMenu.change ? (
                  <div className="details-columns">
                    <div className="details-column">
                      {categoryDetails.slice(0, Math.ceil(categoryDetails.length / 2)).map((element, index) => (
                        <Link
                          className="detail-item"
                          to={`/${choseMenu.cat}/${choseMenu.sub}/${element.categoryDetails.replaceAll(" ", "-")}`}
                          key={index}
                        >
                          {element.categoryDetails}
                        </Link>
                      ))}
                    </div>
                    <div className="details-column">
                      {categoryDetails.slice(Math.ceil(categoryDetails.length / 2)).map((element, index) => (
                        <Link
                          className="detail-item"
                          to={`/${choseMenu.cat}/${choseMenu.sub}/${element.categoryDetails.replaceAll(" ", "-")}`}
                          key={index + Math.ceil(categoryDetails.length / 2)}
                        >
                          {element.categoryDetails}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="empty-state">
                    <span>Select a category</span>
                  </div>
                )}

                {(imagePreviews[choseMenu.cat]?.[choseMenu.sub]) && (
                  <div className="image-preview">
                    <img src={imagePreviews[choseMenu.cat][choseMenu.sub]} alt={choseMenu.sub} />
                  </div>
                )}
              </Col>
            </Row>
          </div>
        </div>

        {basket && (
          <div className="basket-container">
            <Basket token={token} open={basket} setBasket={setBasket} />
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
