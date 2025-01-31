import axios from "axios";
import { useEffect, useState } from "react"
import { ApiKey } from "../../../Api/Api";
import "./productStyle.css";

const Products = () => {
    const [data,setData] = useState();
    useEffect(()=>{
        try{
        axios.get("http://127.0.0.1:8000/api/v1/products",{
            params:{
                apiKey:ApiKey
            },
        }).then((data)=>setData(data.data.data));
        }catch(err){
            console.log(err);
        }
    },[]);
    console.log(data);
  return (
    <main>
    {data ? 
        data.map((e,key)=>(
        <div key={key}>
            <p>{e.title}</p>
            <img width={200} src={`http://127.0.0.1:8000/images/products/${e.product_stock[0].product_picture}`} alt="prodct"/>
        </div>
    ))
    : "loading"}
    </main>
  )
}

export default Products