import axios from "axios";
import { useEffect, useState } from "react";
import { ApiKey, IMAGEURL } from "../../../Api/Api";
import "./productStyle.css";
import Header from "../../../Components/Header";
import "./products.css";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Products = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/v1/products", {
        headers: {
          Accept: "application/json",
          "x-api-key": ApiKey,
        },
      })
      .then((data) => setData(data.data.data))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Header />
      <main className="container">
        {error ? (
          <p>Products are empty</p>
        ) : loading ? (
          <div className="skeleton">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} height={300} width={250} />
            ))}
          </div>
        ) : data && data.length > 0 ? (
          data.map((e, key) => (
            <Link to={`/product/${e.id}`} key={key}>
              <div className="box">
                <div className="img-container overflow-hidden">
                  <img
                    width={200}
                    src={`${IMAGEURL}/products/${e.product_stock[0].product_picture}`}
                    alt="product"
                  />
                </div>
                <div className="d-flex flex-column">
                  <span>{e.title}</span>
                  <span className="fw-bold text-dark">{e.price} TND</span>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p>No products available</p>
        )}
      </main>
    </>
  );
};

export default Products;
