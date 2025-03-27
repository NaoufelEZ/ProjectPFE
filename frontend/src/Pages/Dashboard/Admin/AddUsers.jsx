import { useFormik } from "formik";
import { Button, Form } from "react-bootstrap"
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import * as Yup from "yup";
import { ApiKey, APIURL } from "../../../Api/Api";
import axios from "axios";
import { useState } from "react";
import { Helmet } from "react-helmet-async";

const AddUserSchema = Yup.object().shape({
  first_name:Yup.string().matches(/^[a-zA-Z]+$/,"First Name should be a alpha").min(3,"First Name Should Be At Less 3 Letter").required("First Name required"),
  last_name:Yup.string().matches(/^[a-zA-Z]+$/,"Last Name should be a alpha").min(3,"Last Name Should Be At Less 3 Letter").required("Last Name required"),
  email:Yup.string().matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/,"Invalid email address").required("Email required"),
  password:Yup.string().min(6,"Last NameShould Be At Less 6 Letter").required("Password required"),
  role: Yup.string()
  .oneOf(['Admin', 'Product Manager'], 'Invalid role')
  .required('Please select a role'),
  phone:Yup.string().matches(/^\d{8}$/,"phone should be a number").required("Phone Number required"),
});
const AddUsers = () => {
    const [error,setError] = useState(false);
    const nav = useNavigate();
    const cookie = new Cookies();
    const token = cookie.get("auth");
    const formik = useFormik({
        initialValues:{
            first_name:"",
            last_name:"",
            email:"",
            password:"",
            role:"",
            phone:"",
        },
        validationSchema:AddUserSchema,
        onSubmit: async (value)=>{
            try{
                const res = await axios.post(`${APIURL}/admin/user/add`,{
                    first_name : value.first_name,
                    last_name : value.last_name,
                    email : value.email,
                    phone : value.phone,
                    password : value.password,
                    role : value.role,
                },{
                    headers : {
                        Accept: "application/json",
                        "x-api-key":ApiKey,
                        Authorization:`Bearer ${token}`,
                    }
                });
                nav("/dashboard/users");
                }catch(error){
                setError(true);
                }
        }});
          
  return (
    <>
    <Helmet>
        <title>Add User|Nalouti Store</title>
    </Helmet>
    <div className="w-100 p-4">
        <Form className="w-50" onSubmit={formik.handleSubmit}>
            <Form.Group className="mb-3 d-flex gap-2" controlId="formBasicEmail">
            <div className="w-50">
                <Form.Control  name="first_name" onChange={formik.handleChange} value={formik.values.first_name} type="text" placeholder="Enter First Name" />
                <div className="text-danger">{formik.touched.first_name && formik.errors.first_name ? formik.errors.first_name : null }</div>
            </div>
            <div className="w-50">
                <Form.Control name="last_name" onChange={formik.handleChange} value={formik.values.last_name} type="text" placeholder="Enter Last Name" />
                <div className="text-danger">{formik.touched.last_name && formik.errors.last_name ? formik.errors.last_name : null }</div>
            </div>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control name="email" onChange={formik.handleChange} value={formik.values.email} type="email" placeholder="Enter Email" />
            </Form.Group>
            <div className="text-danger">{formik.touched.email && formik.errors.email ? formik.errors.email : null }</div>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Password</Form.Label>
                <Form.Control name="password" onChange={formik.handleChange} value={formik.values.password} type="password" placeholder="Enter Password" />
            </Form.Group>
            <div className="text-danger">{formik.touched.password && formik.errors.password ? formik.errors.password : null }</div>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Role</Form.Label>
                <Form.Select name="role" onChange={formik.handleChange} value={formik.values.role} aria-label="Default select example">
                    <option disabled selected value="">Select Role</option>
                    <option value="Admin">Admin</option>
                    <option value="Product Manager">Product Manager</option>
                </Form.Select>
            </Form.Group>
            <div className="text-danger">{formik.touched.role && formik.errors.role ? formik.errors.role : null }</div>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Phone</Form.Label>
                <Form.Control name="phone" onChange={formik.handleChange} value={formik.values.phone} type="text" placeholder="Enter Phone" />
            </Form.Group>
            <div className="text-danger">{formik.touched.phone && formik.errors.phone ? formik.errors.phone : null }</div>
            <Button variant="primary" type="submit">Submit</Button>
            <div className="text-danger">{error && "Email is already exist"}</div>
        </Form>
    </div>
    </>
  )
}

export default AddUsers