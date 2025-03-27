import { Button, Form } from 'react-bootstrap';
import { ApiKey,APIURL } from '../../../Api/Api';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { Helmet } from "react-helmet-async";
import { useFormik } from 'formik';
import * as Yup  from 'yup';
import { useNavigate } from 'react-router-dom';
import useUser from '../../../Hooks/useUser';

const categorySchema = Yup.object().shape({
    category:Yup.string().matches(/^[a-zA-Z]+$/, "Category should be alphabetic").min(3,"Category should at less be 3 characters").required("Category required")
});



const AddCategory = () => {
  const cookie = new Cookies();
  const token = cookie.get("auth");

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues:{
        category : "",
    },
    validationSchema:categorySchema,
    onSubmit: async (value)=>{
        try{
        axios.post(`${APIURL}/admin/category/add`,
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
        navigate("/dashboard/category")
        }catch(err){
            console.log(err)
        }
    }
  });

 

  return (
    <>
        <Helmet>
            <title>Add Category|Nalouti Dashboard</title>
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

export default AddCategory;
