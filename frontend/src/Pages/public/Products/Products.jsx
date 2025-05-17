import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { ApiKey, APIURL, IMAGEURL } from "../../../Api/Api";
import Header from "../../../Components/Header";
import "./products.css";
import { useNavigate, useParams } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Helmet } from "react-helmet-async";
import { AiFillHeart } from "react-icons/ai";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSliders } from "@fortawesome/free-solid-svg-icons";
import Filter from "../../../Components/Filter";
import Cookies from "universal-cookie";
import { Container, Row, Col, Card } from "react-bootstrap";
import { WishlistContext } from "../../../Context/WishlistContext";
import ViewToggleIcon from "./Components/ViewToggleIcon";
import { FaHeart, FaHeartBroken } from "react-icons/fa";

const Products = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [wishlist, setWishlist] = useState([]);
  const [wishlistError, setWishlisttError] = useState(false);
  const [filterProduct, setFilterProduct] = useState([]);
  const [change, setChange] = useState(false);
  const [heart,setHeart] = useState(false);
  const [brokenHeart,setBrokenHerat] = useState(false);
  const [viewMode, setViewMode] = useState("grid");
  const { cat, sub, detail } = useParams();
  const cookie = new Cookies();
  const token = cookie.get("auth");
  const { setWishlistChange } = useContext(WishlistContext);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${APIURL}/products/${cat}/${sub}/${detail}`, {
        headers: {
          Accept: "application/json",
          "x-api-key": ApiKey,
        },
      })
      .then((response) => {
        setData(response.data.data);
        setFilterProduct(response.data.data);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [cat, sub, detail]);

  useEffect(() => {
    if (!token) return;
    axios
      .get(`${APIURL}/wishlist`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
          "x-api-key": ApiKey,
        },
      })
      .then((response) => {
        setWishlist(response.data.data);
        setWishlisttError(true);
      })
      .catch(() => setWishlisttError(false));
  }, [change,token]);

  const handleAddWishlist = async (id) => {
    setWishlistChange((prev) => prev + 1);
    try {
      const response = await axios.post(
        `${APIURL}/wishlist/add/${id}`,
        {},
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
            "x-api-key": ApiKey,
          },
        }
      );
      if(response.status === 201){
        setHeart(true)
      }
      else{
        setBrokenHerat(true)
      }
    } catch (err) {
      console.log(err);
    }
    setChange((prev) => !prev);
  };
  useEffect(()=>{
    setTimeout(()=>{
      if(heart){
        setHeart(false)
      }
      if(brokenHeart){
        setBrokenHerat(false)
      }
    },2000)
  },[heart,brokenHeart])

  return (
    <>
      <Helmet>
        <title>
          {cat}'s {sub} | Nalouti Store
        </title>
      </Helmet>
      <Filter
        setIsOpen={setIsOpen}
        isOpen={isOpen}
        setFilterProduct={setFilterProduct}
        products={data}
      />
      <Header />
      <Container className="py-5 position-relative">
        <div className={`heart ${heart ? "show" : ""}`}><FaHeart size={100} color="red" /></div>
        <div className={`heart ${brokenHeart ? "show" : ""}`}><FaHeartBroken size={100} color="red" /></div>
  <div className="d-flex justify-content-between align-items-center mb-4">
    <h2 className="fw-bold text-capitalize">
      {detail.replaceAll("-", " ").toLowerCase()}
    </h2>
    <div className="d-flex align-items-center gap-2">
      {/* View Toggle Button */}
      <ViewToggleIcon
        active={viewMode === "grid"}
        onToggle={() =>
          setViewMode((prev) => (prev === "grid" ? "big" : "grid"))
        }
      />

      {/* Filter Button */}
      <div
        onClick={() => setIsOpen(true)}
        role="button"
        className="d-flex align-items-center"
        style={{
          border: "1px solid #ccc",
          borderRadius: "12px",
          padding: "8px 16px",
          height: "40px",
          backgroundColor: "#fff",
          cursor: "pointer",
        }}
      >
        <div
          style={{
            width: "24px",
            height: "24px",
            backgroundColor: "#f5f5f5",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "4px",
          }}
        >
          <FontAwesomeIcon icon={faSliders} />
        </div>
        <span className="ms-2 fw-medium" style={{ fontSize: "15px" }}>
          Filter
        </span>
      </div>
    </div>
  </div>



        {error ? (
          <p>Products are empty</p>
        ) : loading ? (
          <Row>
            {[...Array(4)].map((_, i) => (
              <Col md={3} sm={6} xs={12} key={i} className="mb-4">
                <Skeleton height={400} />
              </Col>
            ))}
          </Row>
        ) : filterProduct && filterProduct.length > 0 ? (
          viewMode === "big" ? (
            <Row>
              {filterProduct.map((product) => {
                const firstStock = product?.product_stock?.[0];
                return (
                  <Col xs={12} key={product.id} className="mb-4">
                    <Card
                      className="product-card shadow-sm position-relative big-product-card"
                      role="button"
                      onClick={() => navigate(`/product/${product.id}`)}
                    >
                      <Card.Img
                        variant="top"
                        src={`${IMAGEURL}/products/${firstStock?.holder_product_picture}`}
                        className="first-product-image"
                      />
                       <Card.Body>
                        <Card.Title className="text-muted fs-6">
                          {product.title}
                        </Card.Title>
                        <Card.Text className="fw-semibold">
                          {product.discount === 0 ? (
                            `${product.price}.00 TND`
                          ) : (
                            <>
                              <span className="current-price me-2">
                                {(product.price - product.discount).toFixed(2)}{" "}
                                TND
                              </span>
                              <br />
                              <span className="original-price me-2">
                                {product.price.toFixed(2)} TND
                              </span>
                              <span className="discount-badge">
                                -{product.discount}%
                              </span>
                            </>
                          )}
                        </Card.Text>
                      </Card.Body>
                      {wishlistError && (
                        <div
                        className="product-heart-container"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddWishlist(product.id);
                        }}
                      >
                        <AiFillHeart
                          className={`product-heart-icon ${
                            wishlist.some((item) => item.product_id === product.id)
                              ? "text-danger"
                              : ""
                          }`}
                        />
                      </div>
                      
                      )}
                    </Card>
                  </Col>
                );
              })}
            </Row>
          ) : (
            <Row>
              {filterProduct.map((product) => {
                const firstStock = product?.product_stock?.[0];
                return (
                  <Col md={3} sm={6} xs={12} key={product.id} className="mb-4">
                    <Card
                      className="product-card shadow-sm position-relative"
                      role="button"
                      onClick={() => navigate(`/product/${product.id}`)}
                    >
                      <Card.Img
                        onMouseEnter={(e) => {
                          e.currentTarget.src = `${IMAGEURL}/products/${firstStock?.product_picture}`;
                          e.currentTarget.style.transform = "scale(1.01)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.src = `${IMAGEURL}/products/${firstStock?.holder_product_picture}`;
                          e.currentTarget.style.transform = "scale(1)";
                        }}
                        variant="top"
                        src={`${IMAGEURL}/products/${firstStock?.holder_product_picture}`}
                        style={{ height: "400px", objectFit: "cover" }}
                      />
                      <Card.Body>
                        <Card.Title className="text-muted fs-6">
                          {product.title}
                        </Card.Title>
                        <Card.Text className="fw-semibold">
                          {product.discount === 0 ? (
                            `${product.price}.00 TND`
                          ) : (
                            <>
                              <span className="current-price me-2">
                                {(product.price - product.discount).toFixed(2)}{" "}
                                TND
                              </span>
                              <br />
                              <span className="original-price me-2">
                                {product.price.toFixed(2)} TND
                              </span>
                              <span className="discount-badge">
                                -{product.discount}%
                              </span>
                            </>
                          )}
                        </Card.Text>
                      </Card.Body>
                      {wishlistError && (
                        <div
                        className="product-heart-container"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddWishlist(product.id);
                        }}
                      >
                        <AiFillHeart
                          className={`product-heart-icon ${
                            wishlist.some((item) => item.product_id === product.id)
                              ? "text-danger"
                              : ""
                          }`}
                        />
                      </div>
                      
                      )}
                    </Card>
                  </Col>
                );
              })}
            </Row>
          )
        ) : (
          <p>No products available</p>
        )}
      </Container>
    </>
  );
};

export default Products;
