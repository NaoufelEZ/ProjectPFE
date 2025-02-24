import { useEffect, useState } from "react"
import { ApiKey, APIURL, IMAGEURL } from "../../../Api/Api";
import {  useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./productStyle.css";
import Header from "../../../Components/Header";
import { Button } from "react-bootstrap";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Loading from "../../../Components/Loading";
import Err404 from "../Errors/Err404";

const Product = () => {
    const {id} = useParams();
    const [data,setData] = useState();
    const [error,setError] = useState(false);
    const [loading,setLoading] = useState(true);
    const [uniqueColor,setUniqueColor] = useState();
    const [selectedImage,setSelectedImage] = useState();
    const [color,setColor] = useState();
    const [size,setSize] = useState();
    const [selectedSize,setSelectedSize] = useState();
    const [count,setCount] = useState(1);
    const [discount,setDiscount] = useState(0);
    const [sizeVerify,setSizeVerify] = useState(false);
    const [select,setSelect] = useState(()=>{
        const data = localStorage.getItem("card");
        return data ? JSON.parse(data) :  [];
    });
    const nav = useNavigate();
    
    useEffect(()=>{
        axios.get(`${APIURL}/products/product/${id}`,{
            headers:{
                Accept:"application/json",
                "x-api-key":ApiKey
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
        }).catch(()=>setError(true)).finally(()=>setLoading(false));
    },[id,nav,color]);
    useEffect(()=>{
        if(data){

            const productDiscount = data.discount !== 0 ? (data.price /100) * data.discount  :  0;
            setDiscount(productDiscount);
        }
        }
    ,[data]);
    const handleClick = ()=>{
        const items = JSON.parse(localStorage.getItem("card")) || [];
        const newItem = {
            "id":id,
            "title":data.title,
            "price":discount === 0 ? data.price : data.price - discount,
            "image":selectedImage,
            "color":color,
            "size":selectedSize,
            "count":count
        }
        const existingItem = items.find(item => 
            item.id === newItem.id &&
            item.color === newItem.color &&
            item.size === newItem.size
        );
        if(!selectedSize){
            setSizeVerify(true);
        }
        else if(!existingItem){
            setSelect(prev => [...prev,newItem]);
            localStorage.setItem("card",JSON.stringify(select));
        }
        else{
        const MySwal = withReactContent(Swal)
    const Toast = MySwal.mixin({
        toast: true,
        position: "bottom-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = MySwal.stopTimer;
          toast.onmouseleave = MySwal.resumeTimer;
        }
      });
      Toast.fire({
        icon: "error",
        title: "Required quantity exceeds the available quantity!"
      });
    }
    }
    const dataFetch = data ? 
    <div className="d-flex w-100 bg-light text-dark p-3">
        <div className="me-3">
            <img width={500} src={`${IMAGEURL}/products/${selectedImage}`} alt="product"/>
        </div>
        <div className="w-100 mb-4">
            <p>{data.title}</p>
            {discount === 0 ? <p>{(data.price).toFixed(2)} TND</p> : <div><span className="h5 text-black me-3">{(data.price - discount).toFixed(2)}</span><span className=" text-decoration-line-through text-secondary">{data.price}</span></div> }
            <p>Color</p>
            {color ? <p>{color}</p> : <p>{data.product_stock[0].color}</p>}
            <div className="d-flex w-100">
            {uniqueColor.map((e)=>(
                <span onClick={()=>setColor(e)} role="button" className={`${color === e && "border border-2 p-2"} rounded-circle me-1`} style={{height:"20px",width:"20px","backgroundColor":e}}></span>
            ))}
            </div>
            <p>Size</p>
            <div className="d-flex">
            {size.map((e,key)=>(
                <div key={key} onClick={()=>{setSelectedSize(e);setSizeVerify(false)}}  role="button" style={{height:"30px",width:"30px"}} className={`${selectedSize === e && "bg-dark text-white"} bg-light rounded-circle text-dark me-2 d-flex justify-content-center align-items-center border border-2`}>{e}</div>
            ))}
            </div>
            {sizeVerify && <p className="text-danger">Select a size</p>}
                <span>Quantity</span>
            <div style={{width:"100px"}} className="p-2 border-white d-flex justify-content-between align-items-center bg-white rounded-4 text-dark">
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
        {loading ? <Loading />
            : (error ? <Err404 /> : dataFetch)}
    </div>
  )
}

export default Product