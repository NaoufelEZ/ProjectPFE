import { Button, Form } from 'react-bootstrap';
import { ApiKey,APIURL } from '../../../Api/Api';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { Helmet } from "react-helmet-async";
import { useFormik } from 'formik';
import * as Yup  from 'yup';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const categorySchema = Yup.object().shape({
    category:Yup.string().required("Category Is Required"),
    subcategory:Yup.string().matches(/^[a-zA-Z]+$/, "Category should be alphabetic").min(3,"Category should at less be 3 characters").required("Subcategory required"),
    subcategory_image:Yup.mixed()
    .required("Subcategory Image required")
    .test("fileType", "Only images (JPG, PNG, MP4) are allowed", (value) => {
        return value && ["image/jpeg", "image/png" , "video/mp4"].includes(value.type);
      })
});



const AddSubcategory = () => {
    const [category,setCategory] = useState([]);

    const cookie = new Cookies();
    const token = cookie.get("auth");

    useEffect(()=>{
        axios.get(`${APIURL}/category`,{
          headers:{
            Accept:"application/json",
            "x-api-key":ApiKey,
          }
        }).then((response)=>setCategory(response.data.data))
      },[])

    const navigate = useNavigate();

    const formik = useFormik({
    initialValues:{
        subcategory : "",
        category : "",
        subcategory_image: null,
    },
    validationSchema:categorySchema,
    onSubmit: async (value)=>{
        const formData = new FormData();
        formData.append("category_id", value.category);
        formData.append("subcategories", value.subcategory);
        formData.append("subcategories_image", value.subcategory_image);
        try{
            await axios.post(`${APIURL}/admin/subcategory/add`,formData,
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
                        <Form.Control name="subcategory_image" type="file"  onChange={(event) => {
                            formik.setFieldValue("subcategory_image", event.currentTarget.files[0]);
                            }} 
                            isInvalid={formik.touched.subcategory_image && formik.errors.subcategory_image} isValid={formik.touched.subcategory_image && !formik.errors.subcategory_image}
                            />
                             <Form.Control.Feedback type='invalid'>{formik.errors.subcategory_image}</Form.Control.Feedback>
                             <Form.Control.Feedback type='valid'>Look Good</Form.Control.Feedback>
                    </Form.Group>
                    <Button className="p-3 w-25" type='submit'>Add</Button>
                </Form>
        
            </div>
        </div>
    </>
  );
};

export default AddSubcategory;
