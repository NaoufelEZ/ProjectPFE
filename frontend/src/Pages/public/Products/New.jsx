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

const New = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [wishlist, setWishlist] = useState([]);
  const [wishlistError, setWishlisttError] = useState(false);
  const [filterProduct, setFilterProduct] = useState([]);
  const [change, setChange] = useState(false);
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
        <div className="w-100 d-flex justify-content-end mb-4">
          <div
            onClick={() => setIsOpen(true)}
            role="button"
            className="rounded-pill border p-2"
          >
            <FontAwesomeIcon className="mb-0 me-2 h6" icon={faSliders} />
            <span>Filter</span>
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
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.src = `${IMAGEURL}/products/${firstStock?.holder_product_picture}`;
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
        ) : (
          <p>No products available</p>
        )}
      </Container>
    </>
  );
};

export default New;