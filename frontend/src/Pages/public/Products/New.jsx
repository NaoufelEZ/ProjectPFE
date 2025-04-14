import axios from "axios";
import { useEffect, useState } from "react";
import { ApiKey, APIURL, IMAGEURL } from "../../../Api/Api";
import Header from "../../../Components/Header";
import "./products.css";
import { Link, useParams } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Helmet } from "react-helmet-async";
import { FaHeart } from "react-icons/fa";
import useUser from "../../../Hooks/useUser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSliders } from "@fortawesome/free-solid-svg-icons";
import Filter from "../../../Components/Filter";
import Cookies from "universal-cookie";


const New = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [wishlist,setWishlist] = useState([]);
  const [wishlistError,setWishlisttError] = useState(false);
  const [filterProduct, setFilterProduct] = useState([]);
  const [change, setChange] = useState(false);
  const { cat } = useParams();
  const cookie = new Cookies();
  const token = cookie.get("auth");

  useEffect(() => {
    axios
      .get(`${APIURL}/products/${cat}/new`, {
        headers: {
          Accept: "application/json",
          "x-api-key": ApiKey,
        },
      })
      .then((response) => {setData(response.data.data);setFilterProduct(response.data.data)})
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
      .then((response) => setWishlist(response.data.data),setWishlisttError(true)
    ).catch(()=>setWishlisttError(false))
  }, [change]);

  const handleAddWishlist = async (id) => {
    try{
    await axios.post(`${APIURL}/wishlist/add/${id}`,
      {},
      {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        "x-api-key": ApiKey,
      },
    });
  }
  catch(err){
    console.log(err)
  }
  setChange(prev=>!prev)
  }

  return (
    <>
    <Helmet>
      <title>{cat}'s New|Nalouti Store</title>
    </Helmet>
    <Filter setIsOpen={setIsOpen} isOpen={isOpen} setFilterProduct={setFilterProduct} products ={data} />
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
        ) : filterProduct && filterProduct.length > 0 ? (
          <section className="w-100">
            <div className="w-100 d-flex justify-content-end mb-3">
              <div onClick={()=>setIsOpen(true)} role="button" className="rounded-pill border p-2">
              <FontAwesomeIcon className="mb-0 me-2 h6" icon={faSliders} />
                <span>Filter</span>
              </div>
            </div>
            <section className="products-container">
          {filterProduct.map((e, key) => (
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
                 {wishlistError && (
                   <FaHeart
                     onClick={(event) => {
                      event.stopPropagation(); 
                      event.preventDefault(); 
                       handleAddWishlist(e.id);
                     }}
                     className={`h5 mb-0 ${wishlist.some(item => item.product_id === e.id) ? "text-danger" : ""}`}
                   />
                 )}
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

export default New;
