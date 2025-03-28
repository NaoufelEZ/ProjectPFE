import axios from "axios";
import { useEffect, useState } from "react";
import { ApiKey, IMAGEURL } from "../../../Api/Api";
import Header from "../../../Components/Header";
import "./products.css";
import { Link, useParams } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Helmet } from "react-helmet-async";
import { FaRegHeart } from "react-icons/fa";
import useUser from "../../../Hooks/useUser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSliders } from "@fortawesome/free-solid-svg-icons";
import Filter from "../../../Components/Filter";


const Products = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  console.log(isOpen)

  const { cat } = useParams();
  const { sub } = useParams();
  const { detail } = useParams();

  const user = useUser();
  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/v1/products/${cat}/${sub}/${detail}`, {
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
    <Helmet>
      <title>{cat}'s {sub}|Nalouti Store</title>
    </Helmet>
    <Filter setIsOpen={setIsOpen} isOpen={isOpen} />
      <Header />
      <main className="mt-3 px-3">
        {error ? (
          <p>Products are empty</p>
        ) : loading ? (
          <div className="skeleton">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} height={300} width={250} />
            ))}
          </div>
        ) : data && data.length > 0 ? (
          <section className="w-100">
            <div className="w-100 d-flex justify-content-end">
              <div onClick={()=>setIsOpen(true)} role="button" className="rounded-pill border p-2">
              <FontAwesomeIcon className="mb-0 me-2 h6" icon={faSliders} />
                <span>Filter</span>
              </div>
            </div>
            <section className="products-container">
          {data.map((e, key) => (
            <Link className="text-decoration-none" to={`/product/${e.id}`} key={key}>
              <div className="product-box position-relative">
                <div className="img-container overflow-hidden">
                  <img
                    width={200}
                    src={`${IMAGEURL}/products/${e.product_stock[0].product_picture}`}
                    alt="product"
                  />
                </div>
                <div className="d-flex w-100 justify-content-between text-dark position-absolute bottom-0 px-3">
                  <div className="d-flex flex-column">
                    <span>{e.title}</span>
                    <span>{e.price} TND</span>
                  </div>
                  <div className="d-flex align-items-center">
                    {user && <FaRegHeart className="h5 mb-0" /> }
                  </div>
                </div>
              </div>
            </Link>
          ))}
            </section>
            </section>
        ) : (
          <p>No products available</p>
        )}
      </main>
    </>
  );
};

export default Products;
