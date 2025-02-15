import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { ApiKey,APIURL, IMAGEURL } from "../../Api/Api";
import axios from "axios";
import "./Products.css";
const Products = () => {
const [products, setProducts] = useState([]);
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
console.log(products)

  return (
    <div className="container">
    {products ? (
      products.map((e, key) => (
          <div className="Box" key={key}>
            <img
              width={270} height={230}
              src={`${IMAGEURL}/products/${e.product_stock[0].product_picture}`}
              alt={e.title || "Product"}
            />
            <p>{e.title || "No Title"}</p>
            
          </div>
      ))
    ) : (
      <p>Loading...</p>
    )}
    </div>
  )
}

export default Products