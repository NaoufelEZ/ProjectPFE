import axios from "axios";
import { useEffect, useState } from "react"
import { ApiKey } from "../../../Api/Api";
import "./productStyle.css";
import Header from "../../../Components/Header";
import Loading from "../../../Components/Loading";

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
    <main>
    {!error ?     
        data && data.length > 0  ? 
        data.map((e,key)=>(
        <div key={key}>
            <p>{e.title}</p>
            <img width={200} src={`http://127.0.0.1:8000/images/products/${e.product_stock[0].product_picture}`} alt="prodct"/>
        </div>
    )): <Loading /> 
    : <p>Products Is empty</p>
    }
    </main>
    </>
  )
}

export default Products