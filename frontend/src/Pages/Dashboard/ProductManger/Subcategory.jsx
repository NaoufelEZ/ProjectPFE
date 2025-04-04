import { Button, Form } from 'react-bootstrap';
import { ApiKey,APIURL,IMAGEURL } from '../../../Api/Api';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { Helmet } from "react-helmet-async";
import { useFormik } from 'formik';
import * as Yup  from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { FaClosedCaptioning } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';

const categorySchema = Yup.object().shape({
    category:Yup.string().required("Category Is Required"),
    subcategory:Yup.string().matches(/^[a-zA-Z]+$/, "Category should be alphabetic").min(3,"Category should at less be 3 characters").required("Subcategory required"),
});



const Subcategory = () => {
    const [subcategorySelected,setSubcategorySelected] = useState([]);
    const [category,setCategory] = useState([]);
    const [isOn,setIsOn] = useState(false);
    console.log(isOn)

    const { subId } = useParams();

    const cookie = new Cookies();
    const token = cookie.get("auth");

    useEffect(()=>{
        axios.get(`${APIURL}/category`,{
          headers:{
            Accept:"application/json",
            "x-api-key":ApiKey,
          }
        }).then((response)=>setCategory(response.data.data))
      },[subId]);

    useEffect(()=>{
        axios.get(`${APIURL}/admin/subcategory/${subId}`,{
          headers:{
            Accept:"application/json",
            Authorization:`Bearer ${token}`,
            "x-api-key":ApiKey,
          }
        }).then((response)=>setSubcategorySelected(response.data.data)
    ).catch((err)=>console.log(err))
      },[subId]);



    const navigate = useNavigate();

    const formik = useFormik({
    enableReinitialize:true,
    initialValues:{
        subcategory : subcategorySelected?.subcategories || "",
        category : subcategorySelected?.category_id || "",
        subcategory_image: null,
    },
    validationSchema:categorySchema,
    onSubmit: async (value)=>{
        const formData = new FormData();
        formData.append("category_id", value.category);
        formData.append("subcategories", value.subcategory);
        if(value.subcategory_image){
            formData.append("subcategories_image", value.subcategory_image);
        }
        try{
            await axios.post(`${APIURL}/admin/subcategory/update/${subId}`,formData,
                {
                headers:{
                    Accept: "application/json",
                    Authorization:`Bearer ${token}`,
                    "x-api-key":ApiKey,
                }
            });
            navigate("/dashboard/subcategory")
            }catch(err){
                console.log(err)
            }
    }
  });

 

  return (
    <>
        <Helmet>
            <title>Add Subcategory|Nalouti Dashboard</title>
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
                        <Form.Control name='subcategory' value={formik.values.subcategory} onChange={formik.handleChange}  isInvalid={formik.touched.subcategory && formik.errors.subcategory} isValid={formik.touched.subcategory && !formik.errors.subcategory}   placeholder='Subcategory'/>
                    <Form.Control.Feedback type='invalid'>{formik.errors.subcategory}</Form.Control.Feedback>
                    <Form.Control.Feedback type='valid'>Look Good</Form.Control.Feedback>
                    </Form.Group>
                    
                    <Form.Group className="mb-3">
                            <Form.Label>Subcategory Image</Form.Label>
                            {subcategorySelected?.subcategories_image ?
                                <div role='button' onMouseEnter={()=>!isOn && setIsOn(true)} onMouseLeave={()=> isOn && setIsOn(false)} className="position-relative" style={{width:"400px", height:"200px"}}>
                                <img width={400} height={200}  src={`${IMAGEURL}/categories/${subcategorySelected.subcategories_image}`} alt='category_image'/>
                                { isOn &&
                                <div onClick={()=>setSubcategorySelected((prev) => ({ ...prev, subcategories_image: null }))} className="w-100 h-100 bg-black position-absolute top-0 opacity-25">
                                    <div className="w-100 h-100 d-flex justify-content-center align-items-center">
                                    <IoClose size={40} color="white"/>
                                    </div>
                                </div>
                                }
                                </div>
                                :
                                <>
                                <Form.Control name="subcategory_image" type="file"  onChange={(event) => {
                                formik.setFieldValue("subcategory_image", event.currentTarget.files[0]);
                                }} 
                                    isInvalid={formik.touched.subcategory_image && formik.errors.subcategory_image} isValid={formik.touched.subcategory_image && !formik.errors.subcategory_image}
                                    />
                             <Form.Control.Feedback type='invalid'>{formik.errors.subcategory_image}</Form.Control.Feedback>
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

export default Subcategory;
