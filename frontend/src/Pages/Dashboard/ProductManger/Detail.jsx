import { Button, Form } from 'react-bootstrap';
import { ApiKey,APIURL,IMAGEURL } from '../../../Api/Api';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { Helmet } from "react-helmet-async";
import { useFormik } from 'formik';
import * as Yup  from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { IoClose } from 'react-icons/io5';

const categorySchema = Yup.object().shape({
    category:Yup.string().required("Category Is Required"),
    subcategory:Yup.string().required("Subcategory required"),
    category_details:Yup.string().matches(/^[a-zA-Z]+$/, "Category should be alphabetic").min(3,"Category should at less be 3 characters").required("Category Details required"),
});

const Detail = () => {
    const [category,setCategory] = useState([]);
    const [subcategory,setSubcategory] = useState([]);
    const[CategoryDetails,setCategoryDetails] = useState([]);
    const [isOn,setIsOn] = useState([]);

    const cookie = new Cookies();
    const token = cookie.get("auth");
    const { delId } = useParams();
    useEffect(()=>{
        axios.get(`${APIURL}/admin/category-details/${delId}`,{
          headers:{
            Accept:"application/json",
            Authorization:`Bearer ${token}`,
            "x-api-key":ApiKey,
          }
        }).then((response)=>setCategoryDetails(response.data.data))
    },[delId]);

    useEffect(()=>{
        axios.get(`${APIURL}/category`,{
          headers:{
            Accept:"application/json",
            "x-api-key":ApiKey,
          }
        }).then((response)=>setCategory(response.data.data))
      },[delId])
    const navigate = useNavigate();

    const formik = useFormik({
    enableReinitialize:true,
    initialValues:{
        category : CategoryDetails?.category_id || "",
        subcategory : CategoryDetails?.subcategory_id || "",
        category_details : CategoryDetails?.categoryDetails || "",
        category_details_image: null,
        existingImage: CategoryDetails?.category_details_image || "",
    },
    validationSchema:categorySchema,
    context : { CategoryDetails  },
    onSubmit: async (value)=>{
        console.log(value)
        const formData = new FormData();
        formData.append("category_id", value.category);
        formData.append("subcategory_id", value.subcategory);
        formData.append("categoryDetails", value.category_details);
        if(value.subcategory_image){
            formData.append("category_details_image", value.subcategory_image);
        }
        try{
            const res = await axios.post(`${APIURL}/admin/category-details/update/${delId}`,formData,
                {
                headers:{
                    Authorization:`Bearer ${token}`,
                    "x-api-key":ApiKey,
                }
            });
            console.log(res)
            navigate("/dashboard/category-details")
            }catch(err){
                console.log(err)
            }
    }
  });
    useEffect(()=>{
        if(formik.values.category){
        axios.get(`${APIURL}/admin/category/${formik.values.category}/subcategory`,{
        headers:{
            Accept:"application/json",
            Authorization:`Bearer ${token}`,
            "x-api-key":ApiKey,
        }
        }).then((response)=>setSubcategory(response.data.data))
        }
    },[formik.values.category])
  return (
    <>
        <Helmet>
            <title>Add Category Details|Nalouti Dashboard</title>
        </Helmet>
        <div className="w-100 p-2">
            <div className="d-flex justify-content-between align-items-center">
                <span className="fw-bold h5">Subcategory Management</span>
            </div>
            <hr/>
            <div>
                <Form onSubmit={formik.handleSubmit}>

                    <Form.Group className="mb-3">
                        <Form.Label>Category</Form.Label>
                        <Form.Select name='category' value={formik.values.category} onChange={formik.handleChange} isInvalid={formik.touched.category && formik.errors.category} isValid={formik.touched.category && !formik.errors.category}>
                            <option value="" selected disabled>Select Category</option>
                            {category &&
                                category.length > 0 
                                    && category.map((item)=>(
                                        <option value={item.id}>{item.category}</option>
                                    ))
                            }
                            <Form.Control.Feedback type='invalid'>{formik.errors.category}</Form.Control.Feedback>
                            <Form.Control.Feedback type='valid'>Look Good</Form.Control.Feedback>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Subcategory</Form.Label>
                        <Form.Select name='subcategory' value={formik.values.subcategory} onChange={formik.handleChange} isInvalid={formik.touched.subcategory && formik.errors.subcategory} isValid={formik.touched.subcategory && !formik.errors.subcategory}>
                            <option value="" selected disabled>Select Category</option>
                            {subcategory &&
                                subcategory.length > 0 
                                    && subcategory.filter((element)=> element.subcategories !== "New").map((item)=>(
                                        <option value={item.id}>{item.subcategories}</option>
                                    ))
                            }
                            <Form.Control.Feedback type='invalid'>{formik.errors.subcategory}</Form.Control.Feedback>
                            <Form.Control.Feedback type='valid'>Look Good</Form.Control.Feedback>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Category Details</Form.Label>
                        <Form.Control name='category_details' value={formik.values.category_details} onChange={formik.handleChange}  isInvalid={formik.touched.category_details && formik.errors.category_details} isValid={formik.touched.category_details && !formik.errors.category_details}   placeholder='Category Details'/>
                    <Form.Control.Feedback type='invalid'>{formik.errors.category_details}</Form.Control.Feedback>
                    <Form.Control.Feedback type='valid'>Look Good</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3">
                            <Form.Label>Category Details Image</Form.Label>
                            {CategoryDetails?.category_details_image ?
                                <div role='button' onMouseEnter={()=>!isOn && setIsOn(true)} onMouseLeave={()=> isOn && setIsOn(false)} className="position-relative" style={{width:"400px", height:"200px"}}>
                                <img width={400} height={200}  src={`${IMAGEURL}/categories/${CategoryDetails.category_details_image}`} alt='category_details_image'/>
                                { isOn &&
                                <div onClick={()=>setCategoryDetails((prev) => ({ ...prev, category_details_image: null }))} className="w-100 h-100 bg-black position-absolute top-0 opacity-25">
                                    <div className="w-100 h-100 d-flex justify-content-center align-items-center">
                                    <IoClose size={40} color="white"/>
                                    </div>
                                </div>
                                }
                                </div>
                                :
                                <>
                                <Form.Control name="category_details_image" type="file"  onChange={(event) => {
                                formik.setFieldValue("category_details_image", event.currentTarget.files[0]);
                                }} 
                                    isInvalid={formik.touched.category_details_image && formik.errors.category_details_image} isValid={formik.touched.category_details_image && !formik.errors.category_details_image}
                                    />
                             <Form.Control.Feedback type='invalid'>{formik.errors.category_details_image}</Form.Control.Feedback>
                             <Form.Control.Feedback type='valid'>Look Good</Form.Control.Feedback>
                             </>
                            }

                            </Form.Group>
                    <Button className="p-3 w-25" type='submit'>Save</Button>
                </Form>
        
            </div>
        </div>
    </>
  );
};

export default Detail;
