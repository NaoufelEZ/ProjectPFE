import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { ApiKey, APIURL, IMAGEURL } from "../../../Api/Api";
import axios from "axios";
import { AiFillHeart } from "react-icons/ai";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import Header from "../../../Components/Header";
import "./wishlist.css";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [click, setClick] = useState(0);
  const cookie = new Cookies();
  const token = cookie.get("auth");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${APIURL}/wishlist`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
          "x-api-key": ApiKey,
        },
      })
      .then((response) => setWishlist(response.data.data))
      .catch((err) => console.log(err));
  }, [click]);

  const handleDeleteWishlist = async (id) => {
    setClick((prev) => prev + 1);
    try {
      await axios.delete(`${APIURL}/wishlist/delete/${id}`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
          "x-api-key": ApiKey,
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Helmet>
        <title>Wishlist | Nalouti Store</title>
      </Helmet>
      <Header />
      <Container className="py-5">
        <h2 className="mb-4 fw-bold">Favourites</h2>
        <Row>
          {wishlist.map((item) => {
            const product = item.product;
            const firstStock = product?.product_stock?.[0];

            return (
              <Col md={4} sm={6} xs={12} className="mb-4" key={item.id}>
                <Card role="button"
                  className="wishlist-card shadow-sm position-relative"
                  onClick={() => navigate(`/product/${product.id}`)}
                >
                  <Card.Img
                    variant="top"
                    src={`${IMAGEURL}/products/${firstStock?.product_picture}`}
                    style={{ height: "400px", objectFit: "cover" }}
                  />
                  <Card.Body>
                    <Card.Title className="text-muted fs-6">{product.title}</Card.Title>
                    <Card.Text className="fw-semibold">{product.price}.00 TND</Card.Text>
                  </Card.Body>
                  <AiFillHeart
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteWishlist(product.id);
                    }}
                    className="wishlist-heart-icon text-danger"
                  />
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};

export default Wishlist;
