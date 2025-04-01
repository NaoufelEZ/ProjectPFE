import { Button, Form } from 'react-bootstrap';
import { ApiKey,APIURL } from '../../../Api/Api';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { Helmet } from "react-helmet-async";
import { useFormik } from 'formik';
import * as Yup  from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

const categorySchema = Yup.object().shape({
    category:Yup.string().matches(/^[a-zA-Z]+$/, "Category should be alphabetic").min(3,"Category should at less be 3 characters").required("Category required")
});



const Category = () => {

    const [categorySelected,setCategorySelected] = useState([]);

    const cookie = new Cookies();
    const token = cookie.get("auth");
    const { catId } = useParams();

    useEffect(()=>{
        axios.get(`${APIURL}/admin/category/${catId}`,{
            headers:{
                Accept:"Application/json",
                Authorization:`Bearer ${token}`,
                "x-api-key":ApiKey,
            }
        }).then((response)=>setCategorySelected(response.data.data))
    },[catId]);

  const navigate = useNavigate();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues:{
        category : categorySelected?.category || "",
    },
    validationSchema:categorySchema,
    onSubmit: async (value)=>{
        try{
        const res = await axios.put(`${APIURL}/admin/category/update/${catId}`,
            {
                category:value.category,
            },
            {
            headers:{
                Accept: "application/json",
                Authorization:`Bearer ${token}`,
                "x-api-key":ApiKey,
            }
        });
        navigate("/dashboard/Categories")
        }catch(err){
            console.log(err)
        }
    }
  });


  return (
    <>
        <Helmet>
            <title>Category|Nalouti Dashboard</title>
        </Helmet>
        <div className="w-100 p-2">
            <div className="d-flex justify-content-between align-items-center">
                <span className="fw-bold h5">Category Management</span>
            </div>
            <hr/>
            <div>
                <Form onSubmit={formik.handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Category</Form.Label>
                        <Form.Control name='category' value={formik.values.category} onChange={formik.handleChange}  isInvalid={formik.touched.category && formik.errors.category} isValid={formik.touched.category && !formik.errors.category}   placeholder='Category'/>
                    <Form.Control.Feedback type='invalid'>{formik.errors.category}</Form.Control.Feedback>
                    <Form.Control.Feedback type='valid'>Look Good</Form.Control.Feedback>
                    </Form.Group>

                    <Button type='submit'>Save</Button>
                </Form>
        
            </div>
        </div>
    </>
  );
};

export default Category;
