import axios from "axios";
import { useEffect, useState } from "react"
import { ApiKey, IMAGEURL } from "../../../Api/Api";
import "./productStyle.css";
import Header from "../../../Components/Header";
import Loading from "../../../Components/Loading";
import "./products.css";
import { Link } from "react-router-dom";

const Products = () => {
    const [data,setData] = useState();
    const [error,setError] = useState(false);
    useEffect(()=>{
        axios.get("http://127.0.0.1:8000/api/v1/products",{
            headers:{
                Accept:"application/json",
                "x-api-key":ApiKey
            },
        }).then((data)=>setData(data.data.data)).catch(()=>setError(true));
    },[]);
  return (
    <>
    <Header />
    <main className="container">
    {!error ?     
        data && data.length > 0  ? 
        data.map((e,key)=>(
        <Link to={`/product/${e.id}`} key={key}>
        <div className="box">
            <div className="img-container overflow-hidden">
                <img width={200} src={`${IMAGEURL}/products/${e.product_stock[0].product_picture}`} alt="prodct"/>
            </div>
            <div className="d-flex flex-column">
            <span className="">{e.title}</span>
            <span className="fw-bold text-dark">{e.price} TND</span>
            </div>
        </div>
        </Link>
    )): <Loading /> 
    : <p>Products Is empty</p>
    }
    </main>
    </>
  )
}

export default Products