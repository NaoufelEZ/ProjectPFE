import { useState, useEffect, useRef } from "react";
import logo from "../Assets/images/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import "./HeaderTest.css";
import { FiUser } from "react-icons/fi";
import axios from "axios";
import Cookies from "universal-cookie";
import { ApiKey, APIURL, IMAGEURL } from "../Api/Api";
import { Link, NavLink, useNavigate, useParams } from "react-router-dom";
import Basket from "./Basket";
import { Col, Row } from "react-bootstrap";
import BasketUi from "../Assets/UI/BasketUi";
import SearchBar from "../Assets/UI/SearchBar";
import SideLog from "../Pages/Auth/SideLog";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';

const Header = () => {
  const { cat } = useParams();
  const [currentUse, setCurrentUse] = useState({"log":"login"});
  const [user, setUser] = useState(null);
  const [basket, setBasket] = useState(false);
  const [log, setLog] = useState(false);
  const [click, setClick] = useState({ action: false });
  const [notify,setNotify] = useState(0);
  const [newProduct,setNewProduct] = useState([]);
  const [choseMenu, setChoseMenu] = useState({
    cat: cat,
    sub: "Clothes",
    change: false,
  });
  const [subcategory, setSubcategory] = useState([]);
  const [categoryDetails, setCategoryDetails] = useState([]);
  const [categories, setCategories] = useState([]);
  const [lastNav, setLastNav] = useState(localStorage.getItem("navTo") || "");
  const [error,setError] = useState(true);

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
 useEffect(()=>{
    const nav = window.localStorage.getItem("navTo");
    setLastNav(nav)
  },[cat])

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
        .then((response) => {
          if(response.status === 200){
          setSubcategory(response.data.data);
          setError(false)
        }
        else{
          setError(true)
        }
      })
        .catch(()=>setError(true))
    }
  }, [cat, lastNav]);
  console.log(error)

  useEffect(() => {
    if(error) return
      axios
        .get(`${APIURL}/products/${cat || lastNav }/new`, {
          headers: {
            Accept: "application/json",
            "x-api-key": ApiKey,
          },
        })
        .then((response) => {
          setNewProduct(response.data.data);
        })
        .catch((err) => {
          console.error(err)
          window.location.href = '/fix';
        })
    }, [cat,error]);

  useEffect(() => {
    if(error) return;
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
    if (!token) return;
    axios.get(`${APIURL}/order/all/check`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        "x-api-key": ApiKey,
      }
    }).then((response)=>setNotify(response.data.data))
    .catch(()=>null)
  },[token]);
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
              <Link onClick={()=>setLog(true)} className="text-decoration-none text-black">
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
                          <span className="subcategory-name featured">
                            {element.subcategories}
                          </span>
                          <div className="arrow-container">
                            <span className="arrow-line"></span>
                            <FontAwesomeIcon icon={faChevronRight} className="arrow-icon" />
                          </div>
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
                        <span role="button" onClick={()=>navigate(`/${ lastNav ? lastNav :  choseMenu.sub}/${choseMenu.sub}/${element.categoryDetails.replaceAll(" ", "-")}`)}
                          className="detail-item"
                          key={index}
                        >
                          {element.categoryDetails}
                        </span>
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
                ) : (newProduct && newProduct.length > 0) ? (
                  <div className="w-100">
                     <Splide
                      options={{
                        type: 'slide',
                        rewind: true,
                        rewindByDrag: true,
                        perPage: 5,
                        gap: '0.5rem',
                      }}
                      aria-label="React Splide Example"
                    >
                     {newProduct.slice(0, 9).map((product, index) => (
                            <SplideSlide role="button" onClick={()=>navigate(`/product/${product.id}`)} key={index}>
                              <img
                                width="100%"
                                height="100%"
                                src={`${IMAGEURL}/products/${product?.product_stock?.[0].holder_product_picture}`}
                                alt={`Product ${index + 1}`}
                              />
                            </SplideSlide>
                          ))}
                    </Splide>
                  </div>
                ) : (
                  <span className="text-center">Noting DO Noting DO</span>
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
            <Basket token={token} open={basket} setBasket={setBasket} setCurrentUse={setCurrentUse} login={setLog} />
          </div>
        )}
        {log && (
          <div className="basket-container">

            <SideLog currentUse={currentUse} setCurrentUse={setCurrentUse} setLog={setLog} />
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
