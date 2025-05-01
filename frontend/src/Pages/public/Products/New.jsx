import axios from "axios";
import { useEffect, useState } from "react";
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
import ViewToggleIcon from "../../../Pages/public/Products/Components/ViewToggleIcon";

const New = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [wishlist, setWishlist] = useState([]);
  const [wishlistError, setWishlisttError] = useState(false);
  const [filterProduct, setFilterProduct] = useState([]);
  const [change, setChange] = useState(false);
  const [viewMode, setViewMode] = useState("grid");
  const { cat } = useParams();
  const cookie = new Cookies();
  const token = cookie.get("auth");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${APIURL}/products/${cat}/new`, {
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
  }, []);

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
  }, [change]);

  const handleAddWishlist = async (id) => {
    try {
      await axios.post(
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
    } catch (err) {
      console.log(err);
    }
    setChange((prev) => !prev);
  };

  return (
    <>
      <Helmet>
        <title>{cat}'s New | Nalouti Store</title>
      </Helmet>
      <Filter
        setIsOpen={setIsOpen}
        isOpen={isOpen}
        setFilterProduct={setFilterProduct}
        products={data}
      />
      <Header />
      <Container className="py-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fw-bold">New Items</h2>
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
                        className="big-product-img"
                      />
                      <Card.Body>
                        <Card.Title className="text-muted fs-6">
                          {product.title}
                        </Card.Title>
                        <Card.Text className="fw-semibold">
                          {product.price}.00 TND
                        </Card.Text>
                      </Card.Body>
                      {wishlistError && (
                        <AiFillHeart
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAddWishlist(product.id);
                          }}
                          className={`product-heart-icon ${
                            wishlist.some((item) => item.product_id === product.id)
                              ? "text-danger"
                              : ""
                          }`}
                        />
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
                          {product.price}.00 TND
                        </Card.Text>
                      </Card.Body>
                      {wishlistError && (
                        <AiFillHeart
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAddWishlist(product.id);
                          }}
                          className={`product-heart-icon ${
                            wishlist.some((item) => item.product_id === product.id)
                              ? "text-danger"
                              : ""
                          }`}
                        />
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

export default New;
