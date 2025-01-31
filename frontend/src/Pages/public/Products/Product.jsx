import { useEffect, useState } from "react"
import { ApiKey, APIURL, IMAGEURL } from "../../../Api/Api";
import {  useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { ring2 } from 'ldrs'
import "./productStyle.css";
import Header from "../../../Components/Header";
import { Button } from "react-bootstrap";


const Product = () => {
    ring2.register()
    const {id} = useParams();
    const [data,setData] = useState();
    const [loading,setLoading] = useState(true);
    const [uniqueColor,setUniqueColor] = useState();
    const [selectedImage,setSelectedImage] = useState();
    const [color,setColor] = useState();
    const [size,setSize] = useState();
    const [selectedSize,setSelectedSize] = useState();
    const [count,setCount] = useState(1);
    const [select,setSelect] = useState(()=>{
        const data = localStorage.getItem("card");
        return data ? JSON.parse(data) :  [];
    });
    const nav = useNavigate();
    useEffect(()=>{
        axios.get(`${APIURL}/products/product/${id}`,{
            params:{
                apiKey: ApiKey,
            }
        }).then((data)=>{
            setData(data.data.data);
            setLoading(false);
            setUniqueColor([...new Set(data.data.data.product_stock.map(product =>product.color))]);
            setSelectedImage(data.data.data.product_stock[0].product_picture);
            const sizeColor = data.data.data.product_stock.filter((product)=>product.color.includes(data.data.data.product_stock[0].color));
            setSize([...new Set(sizeColor.map((e)=>e.size))]);
            if(color){
                    const picture = data.data.data.product_stock.find((product)=>product.color.includes(color));
                    setSelectedImage(picture.product_picture);
                    const sizeColor = data.data.data.product_stock.filter((product)=>product.color.includes(color));
                    setSize([...new Set(sizeColor.map((e)=>e.size))]);
                
            }
        }).catch(()=>nav("/"));
    },[id,nav,color]);
    const handleClick = ()=>{
        const newItem = {
            "id":id,
            "color":color,
            "size":selectedSize,
            "count":count
        }
        setSelect(prev => [...prev,newItem]);
        localStorage.setItem("card",JSON.stringify(select));
    }
    const dataFetch = data ? 
    <div className="d-flex">
        <div>
            <img width={500} src={`${IMAGEURL}/images/products/${selectedImage}`} alt="product"/>
        </div>
        <div className="w-100 bg-dark text-light mb-4">
            <p>{data.title}</p>
            <p>{data.price}DT</p>
            <p>Color</p>
            {color ? <p>{color}</p> : <p>{data.product_stock[0].color}</p>}
            <div className="d-flex w-100">
            {uniqueColor.map((e)=>(
                <span onClick={()=>setColor(e)} role="button" className="rounded-circle me-1" style={{height:"20px",width:"20px","backgroundColor":e}}></span>
            ))}
            </div>
            <p>Size</p>
            <div className="d-flex">
            {size.map((e)=>(
                <div onClick={()=>{setSelectedSize(e)}}  role="button" style={{height:"30px",width:"30px"}} className="bg-light rounded-circle text-dark me-2 pointer-event d-flex justify-content-center align-items-center">{e}</div>
            ))}
            </div>
            <div className="p-2 border-white">
                <span className="user-select-none" role="button" onClick={()=>count !== 1 && setCount(prev => prev -1)}>-</span>
                <span>{count}</span>
                <span className="user-select-none" role="button" onClick={()=>setCount(prev => prev +1)}>+</span>
            </div>
            <Button onClick={handleClick} type="button">Add card</Button>
        </div>
        </div>
     : "";
  return (
    <div>
    <Header />
        {loading ? 
        <l-ring-2
            size="40"
            stroke="5"
            stroke-length="0.25"
            bg-opacity="0.1"
            speed="0.8" 
            color="black" 
            ></l-ring-2>
            : dataFetch}
    </div>
  )
}

export default Product