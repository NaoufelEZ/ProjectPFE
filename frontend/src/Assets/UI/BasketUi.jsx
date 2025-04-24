import axios from 'axios';
import {useState,useEffect, useContext} from 'react'
import { ApiKey, APIURL } from '../../Api/Api';
import Cookies from 'universal-cookie';
import { BasketContext } from '../../Context/BasketContext';
import { WishlistContext } from '../../Context/WishlistContext';

const BasketUi = () => {
  const [basket,setBasket] = useState([]);
  const [wishlist,setWishlist] = useState(0);
  const [error,setError] = useState(true);
  const {basketChange} = useContext(BasketContext) ;
  const {wishlistChange} = useContext(WishlistContext);
  const cookie = new Cookies();
  const token = cookie.get("auth");
  useEffect(()=>{
    const item = window.localStorage.getItem("card");
    if (item) {
      setBasket(JSON.parse(item));
    }
  },[basketChange]);
  useEffect(()=>{
    if (!token) return;
    axios.get(`${APIURL}/wishlist`,{
      headers:{
        Accept:"application/json",
        Authorization:`Bearer ${token}`,
        "x-api-key":ApiKey,
      }
    }).then((response)=>{setWishlist(response.data.data.length);setError(false)})
    .catch(()=>setError(true))
  },[wishlistChange])
  return (
    <div role="button" className="position-relative">
      {(!wishlist || wishlist === 0 || error) ?
      <svg width="25" height="25" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path pid="0" fillRule="evenodd" clipRule="evenodd" d="M20 23V12.808l-1.994 1.912-.006-.006V21H2V7h8.52a5.606 5.606 0 0 1-.5-2H7.17a3.001 3.001 0 0 1 3.085-1.99c.211-.686.55-1.312.988-1.854A5.002 5.002 0 0 0 5.1 5H0v18h20ZM15.758 1c-2.035 0-3.748 1.61-3.748 3.66 0 .986.398 1.925 1.11 2.598l4.887 4.69 4.897-4.7A3.6 3.6 0 0 0 24 4.66C24.005 2.609 22.29 1 20.251 1c-.84 0-1.617.272-2.244.732A3.797 3.797 0 0 0 15.758 1ZM14.01 4.66c0-.883.755-1.66 1.748-1.66.603 0 1.127.289 1.443.72l.806 1.096.806-1.097A1.78 1.78 0 0 1 20.251 3c1 0 1.751.778 1.748 1.656v.003c0 .442-.175.856-.509 1.174l-3.483 3.344-3.505-3.365-.007-.006a1.568 1.568 0 0 1-.485-1.147Z" fill="currentColor"></path>
        </svg> 
          :
          <svg width="25" height="25" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path pid="0" fillRule="evenodd" clipRule="evenodd" d="M20 12.808V23H0V5h5.1a5.002 5.002 0 0 1 6.143-3.844 5.554 5.554 0 0 0-.988 1.855A3.001 3.001 0 0 0 7.171 5h2.849c.042.695.212 1.373.5 1.999H2v14h16v-6.286l.006.006L20 12.808Z" fill="currentColor">
            </path>
            <path pid="1" fillRule="evenodd" clipRule="evenodd" d="M12.01 4.66c0-2.05 1.713-3.66 3.748-3.66.842 0 1.621.272 2.249.732A3.788 3.788 0 0 1 20.251 1c2.037 0 3.754 1.609 3.748 3.66a3.6 3.6 0 0 1-1.095 2.587c-.036.036-.036.036 0 0l-4.897 4.701-4.887-4.69.003.003-.006-.006.003.003a3.567 3.567 0 0 1-1.11-2.599Z" fill="#FF0058">
            </path>
          </svg>
        }
      <span className="position-absolute h6 m-0 user-select-none" style={{top:"25%",left:"25%"}} aria-hidden="true" data-qa-anchor="cartItemNumber">{basket ? (basket.length > 9) ? "9+" : basket.length === 0 ? null : basket.length  : null }</span>
    </div>
  )
}

export default BasketUi