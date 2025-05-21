import Header from "../Components/Header";
import Footer from "../Components/Footer";
import "./home.css";
import { Carousel } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { ApiKey, APIURL, IMAGEURL } from "../Api/Api";
import { Helmet } from "react-helmet-async";
import Loading from "../Components/Loading";

const Home = () => {
  const [subcategory, setSubcategory] = useState([]);
  const [categoryDetails, setCategoryDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const { cat } = useParams();

  // Fetch subcategories
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${APIURL}/category/${cat}/subcategory`, {
        headers: {
          Accept: "application/json",
          "x-api-key": ApiKey,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setSubcategory(response.data.data);
          setError(false);
        } else {
          setSubcategory([]);
          setError(true);
        }
      })
      .catch(() => {
        setSubcategory([]);
        setError(true);
      })
      .finally(() => setLoading(false));
  }, [cat]);

  // Fetch subcategory details only if no error
  useEffect(() => {
    if (error) return;
    axios
      .get(`${APIURL}/category/${cat}/subcategory/details`, {
        headers: {
          Accept: "application/json",
          "x-api-key": ApiKey,
        },
      })
      .then((response) => {
        if (Array.isArray(response.data.data)) {
          setCategoryDetails(response.data.data);
        } else {
          setCategoryDetails([]);
          setError(true);
        }
      })
      .catch(() => {
        setCategoryDetails([]);
        setError(true);
      });
  }, [cat, error]);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Helmet>
        <title>{cat}'s Clothing | Nalouti Store</title>
      </Helmet>

      <Header />

      {!error && subcategory && subcategory.length > 0 ? (
        <>
          {/* Carousel Section */}
          <section className="w-100">
            <Carousel className="w-100 position-sticky top-0 z-0" data-bs-theme="dark">
              {subcategory
                .filter((item) => item.subcategories !== "New")
                .map((e, index) => (
                  <Carousel.Item
                    role="button"
                    onClick={() => navigate(`${e.subcategories}`)}
                    style={{ height: "calc(100vh - 70px)" }}
                    key={index}
                  >
                    <img
                      height="100%"
                      className="d-block w-100"
                      src={`${IMAGEURL}/categories/${e.subcategories_image}`}
                      loading="lazy"
                      alt={e.subcategories}
                    />
                    <Carousel.Caption>
                      <h1 className="text-white fw-bold text-uppercase">
                        {e.subcategories}
                      </h1>
                    </Carousel.Caption>
                  </Carousel.Item>
                ))}
            </Carousel>

            {/* Category Details Section */}
            <section className="sub">
              {categoryDetails.map((e, index) => (
                <div key={index} className="box">
                  <img
                    src={`${IMAGEURL}/categories/${e.category_details_image}`}
                    loading="lazy"
                    alt={e.categoryDetails}
                  />
                  <span
                    role="button"
                    onClick={() =>
                      navigate(
                        `${e.subcategory.subcategories}/${e.categoryDetails.replaceAll(" ", "-")}`
                      )
                    }
                  >
                    {e.categoryDetails}
                  </span>
                </div>
              ))}
            </section>

            {/* "New" Category Section */}
            <section style={{ height: "100vh" }} className="position-relative z-1 w-100">
              {subcategory
                .filter((e) => e.subcategories === "New")
                .map((findNew, index) => (
                  <div key={index}>
                    <img
                      height={760}
                      width="100%"
                      src={`${IMAGEURL}/categories/${findNew.subcategories_image}`}
                      loading="lazy"
                      alt="New"
                    />
                  </div>
                ))}

              <div className="position-absolute bottom-0 mb-5 d-flex align-items-center w-100 flex-column">
                <span role="button" className="text-white h6 mb-3 text-uppercase">
                  New
                </span>
                <Link to="new" className="bg-white p-2 rounded-pill text-black">
                  Discover
                </Link>
              </div>
            </section>
          </section>

          <Footer />
        </>
      ) : (
        <p>not now</p>
      )}
    </>
  );
};

export default Home;
