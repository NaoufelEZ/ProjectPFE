import axios from 'axios';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import { ApiKey } from "../../Api/Api";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Loading from '../../Components/Loading';
const RegisterSchema = Yup.object().shape({
  first_name:Yup.string().matches(/^[a-zA-Z]+$/,"First Name should be a alpha").min(3,"First Name Should Be At Less 3 Letter").required("First Name required"),
  last_name:Yup.string().matches(/^[a-zA-Z]+$/,"Last Name should be a alpha").min(3,"Last Name Should Be At Less 3 Letter").required("Last Name required"),
  email:Yup.string().matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/,"Invalid email address").required("Email required"),
  password:Yup.string().min(6,"Last NameShould Be At Less 6 Letter").required("Password required"),
  phone:Yup.string().matches(/^\d{8}$/,"phone should be a number").required("Phone Number required"),
});

const RegisterTest = () => {
    const nav = useNavigate();
    const [loading,setLodging] = useState(false);
    const [emailError,setEmailError] = useState(false);
  const formik = useFormik({
    initialValues:{
      first_name:"",
      last_name:"",
      email:"",
      password:"",
      phone:"",
    },
    validationSchema:RegisterSchema,
    onSubmit: async (value)=>{
        try{ 
            setLodging(true);
            const res = await axios.post("http://127.0.0.1:8000/api/v1/register",{
                first_name : value.first_name,
                last_name : value.last_name,
                email : value.email,
                phone : value.phone,
                password : value.password,
            }, 
            {
                headers : {
                    "Accept": "application/json",
                    "x-api-key":ApiKey,
                }
            }
        )
            const link = res.data.hash;
            nav(`/verify/${link}`);
        }catch(error){
            if(error.response.status === 422){
                setEmailError(true)
            }
        }finally{setLodging(false);};
    }
  });
  return (
    <>
    {loading ? <Loading /> : 
    <div className="d-flex justify-content-center align-items-center">
    <Form onSubmit={formik.handleSubmit} className='w-50'>
    <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>First Name</Form.Label>
      <Form.Control name="first_name" onChange={formik.handleChange} value={formik.values.first_name} type="text" placeholder="Enter First Name" />
    </Form.Group>
      <div className="text-danger">{formik.touched.first_name && formik.errors.first_name ? formik.errors.first_name : null }</div>
    <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>Last Name</Form.Label>
      <Form.Control name='last_name' onChange={formik.handleChange} value={formik.values.last_name} type="text" placeholder="Enter Last Name" />
    </Form.Group>
      <div className="text-danger">{formik.touched.last_name && formik.errors.last_name ? formik.errors.last_name : null}</div>
    <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>Email address</Form.Label>
      <Form.Control name='email' onChange={formik.handleChange} value={formik.values.email} type="text" placeholder="Enter email" />
    </Form.Group>
    <div className="text-danger">{formik.touched.email && formik.errors.email ? formik.errors.email : null}</div>
    <div className="text-danger">{emailError && "Email is already exist"}</div>

    <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>Phone</Form.Label>
      <Form.Control name='phone' onChange={formik.handleChange} value={formik.values.phone} type="text" placeholder="Enter email" />
    </Form.Group>
    <div className="text-danger">{formik.touched.phone && formik.errors.phone ? formik.errors.phone : null}</div>
    <Form.Group className="mb-3" controlId="formBasicPassword">
      <Form.Label>Password</Form.Label>
      <Form.Control name='password' onChange={formik.handleChange} value={formik.values.password} type="password" placeholder="Password" />
    </Form.Group>
    <div className="text-danger">{formik.touched.password && formik.errors.password ? formik.errors.password : null}</div>
    <Button variant="primary" type="submit">
      Submit
    </Button>
  </Form>
  </div>
    }
  </>
  )
}

export default RegisterTest