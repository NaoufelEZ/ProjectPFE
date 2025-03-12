import Header from "./Components/Header";
import Footer from "./Components/Footer";
import jeans from "./Assets/images/slide_man_ramadan_jeans_-1jpg.jpg";
import "./home.css";
import { Carousel } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { ApiKey, APIURL,IMAGEURL } from "./Api/Api";


const Home = () => {
  const [subcategory,setSubcategory] = useState([]);
  const [categoryDetails,setCategoryDetails] = useState([]);
  // const navigate = useNavigate();
  const {cat} = useParams();
  useEffect(()=>{
    axios.get(`${APIURL}/category/${cat}/subcategory`,{
      headers:{
        Accept:"application/json",
        "x-api-key":ApiKey,
      }
    }).then((response)=>setSubcategory(response.data.data)
  ).catch((err)=>console.log(err))
  },[cat]);
  useEffect(()=>{
    axios.get(`${APIURL}/category/${cat}/subcategory/details`,{
      headers:{
        Accept:"application/json",
        "x-api-key":ApiKey,
      }
    }).then((response)=>setCategoryDetails(response.data.data)
  ).catch((err)=>console.log(err))
  },[cat]);
  return (
    <>
      <Header />
      <section  className="w-100 ">
      <Carousel  className="w-100 position-sticky top-0 z-0" data-bs-theme="dark">
      {subcategory && subcategory.map((e,index)=>(
        <Carousel.Item style={{height:"calc(100vh - 70px)"}} key={index}>
          <img height="100%" className="d-block w-100" src={`${IMAGEURL}/categories/${e.subcategories_image}`} alt=""/>
          <Carousel.Caption>
            <h1 className="text-white fw-bold text-uppercase ">{e.subcategories}</h1>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
      
        <section className="sub">
        {categoryDetails && categoryDetails.map((e,index)=>(
          <div key={index} className="box">
            <img src={`${IMAGEURL}/categories/${e.category_details_image}`} alt={e.categoryDetails}/>
            <span>{e.categoryDetails}</span>
          </div>
        ))}
        </section>
      </section>
      <Footer />
    </>
  );
};

export default Home;
