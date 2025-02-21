import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { ApiKey,APIURL, IMAGEURL } from "../../Api/Api";
import axios from "axios";
import "./Products.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical, faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
const Products = () => {
const [products, setProducts] = useState([]);
const [click, setClick] = useState({action:false,index:null});
const cookie = new Cookies();
const token = cookie.get("auth");
useEffect(() => {
axios.get(`${APIURL}/products`, {
headers: {
Authorization: `Bearer ${token}`,
"x-api-key": ApiKey
}
}).then((response) => {
setProducts(response.data.data)
}
).catch((error) => {
console.log(error)
}
)
}
, []);
console.log(click)

  return (
    <div className="container">
    {products ? (
      products.length === 0 ? <p>there not products</p>
      : products.map((e, key) => (
          <div className="Box position-relative" key={key}>
          <div>
            <FontAwesomeIcon   onClick={() => setClick(prev => ({action: !prev.action,index: prev.action ? null : key}))} role="button" className="position-absolute h6 z-1" icon={faEllipsisVertical}/>
            {
              (click.action && click.index === key) && <div className="pop position-absolute bg-light z-1">
                <ul className="">
                  <li role="button" className="d-flex align-items-center"><FontAwesomeIcon className="me-1 text-danger" icon={faTrash} /> Delete</li>
                  <li role="button" className="d-flex align-items-center"><FontAwesomeIcon className="me-1 text-secondary" icon={faPenToSquare} />Edit</li>
                </ul>
              </div>
            }
            <img
              width={270} height={230}
              src={`${IMAGEURL}/products/${e.product_stock[0].product_picture}`}
              alt={e.title || "Product"}
            />
            </div>
            <div className="p-3">
            <p>{e.title || "No Title"}</p>
            <p>{e.price || "No Price"} Dt</p>
            </div>
            
          </div>
      ))
    ) : (
      <p>Loading...</p>
    )}
    </div>
  )
}

export default Products