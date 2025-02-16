import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, Form } from "react-bootstrap"
import axios from "axios";
import { ApiKey, APIURL } from "../../../Api/Api";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Err404 from "../Errors/Err404";
const passwordChange = Yup.object().shape({
  password:Yup.string().min(6,"Password Should Be At Less 6").required("Password required"),
  rePassword:Yup.string().oneOf([Yup.ref("password")], "Passwords must match").required("Re Password required")
});
const ChangePassword = () => {
  const {token} = useParams();
  const [block,setBlock] = useState(false);
  const [error,setError] = useState(false);
  const nav = useNavigate();
  useEffect(()=>{
    axios.get(`${APIURL}/password_verify_token/${token}`,{
      headers:{
          Accept:"application/json",
          "x-api-key":ApiKey
      }
  }).then((data)=>console.log(data)).catch(()=>setBlock(true))
  
},[token]);
  const formik = useFormik({
    initialValues:{
      password:"",
      rePassword:"",
    },
    validationSchema:passwordChange,
    onSubmit:async (value)=>{
      try{
      await axios.put(`${APIURL}/password_change/${token}`,
        {
          password:value.password
        },
        {
        headers:{
          Accept:"application/json",
          "x-api-key":ApiKey
        }
      });
      nav("/login",{replace:true});
    }catch(err){
      console.log(err.status)
      if(err.status === 422){
        setBlock(true);
      }
      else if(err.status === 410){
        setError(true);
      }
    }
    }
    });
    console.log(error)
  return (
    <div className="w-100 d-flex justify-content-center">
    {
      block ? <Err404 /> :
      <Form onSubmit={formik.handleSubmit} className="w-50">
        <Form.Group className="mb-3">
          <Form.Label>New Password</Form.Label>
          <Form.Control name="password" onChange={formik.handleChange} value={formik.values.password} type="password" />
        </Form.Group>
      <div className="text-danger">{formik.touched.password && formik.errors.password ? formik.errors.password : null}</div>

        <Form.Group className="mb-3">
          <Form.Label>R Password</Form.Label>
          <Form.Control name="rePassword" onChange={formik.handleChange} value={formik.values.rePassword} type="password" />
        </Form.Group>
      <div className="text-danger">{formik.touched.rePassword && formik.errors.rePassword ? formik.errors.rePassword : null}</div>
        <Button type="submit">Submit</Button>
        <Form.Group className="mt-3">
        {error && <p className="text-danger">password should be not as the old password</p>}
        </Form.Group>
      </Form>
    }
    </div>
  )
}

export default ChangePassword