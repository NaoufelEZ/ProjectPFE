import Header from "../Components/Header";
import Footer from "../Components/Footer";
import "./home.css";
import { Carousel } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { ApiKey, APIURL,IMAGEURL } from "../Api/Api";
import { Helmet } from "react-helmet-async";


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
    <Helmet>
      <title>{cat}'s Clothing|Nalouti Store</title>
    </Helmet>
      <Header navTo={cat} />
      <section  className="w-100 ">
      <Carousel  className="w-100 position-sticky top-0 z-0" data-bs-theme="dark">
      {subcategory && subcategory.filter((item) => item.subcategories !== "New").map((e,index)=>(
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
        <section style={{height:"100vh"}} className="position-relative z-1 w-100">
        {subcategory && subcategory
        .filter((e) => e.subcategories === "New")
        .map((findNew, index) => (
          <div key={index}>
          <img height={760} width="100%" src={`${IMAGEURL}/categories/${findNew.subcategories_image}`} alt="New" />
          </div>
        ))}
        <div className=" position-absolute bottom-0 mb-5 d-flex align-items-center w-100 flex-column">
          <span role="button" className="text-white h6 mb-3 text-uppercase">New</span>
          <Link to="new" className="bg-white p-2 rounded-pill text-black">Discover</Link>
        </div>
        </section>
      </section>
      <Footer />
    </>
  );
};

export default Home;
