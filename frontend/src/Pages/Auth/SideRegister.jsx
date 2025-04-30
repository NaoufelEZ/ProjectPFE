import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button, Form, Card } from 'react-bootstrap';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import './Register2.css';
import { Slide, toast, ToastContainer } from 'react-toastify';
import { ApiKey, APIURL } from '../../Api/Api';
import axios from 'axios';

const RegisterSchema = Yup.object().shape({
  first_name: Yup.string()
    .matches(/^[a-zA-Z]+$/, "First Name should be alphabetic")
    .min(3, "First Name should be at least 3 letters")
    .required("First Name is required"),
  last_name: Yup.string()
    .matches(/^[a-zA-Z]+$/, "Last Name should be alphabetic")
    .min(3, "Last Name should be at least 3 letters")
    .required("Last Name is required"),
  email: Yup.string()
    .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/, "Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password should be at least 6 characters")
    .required("Password is required"),
  phone: Yup.string()
    .matches(/^\d{8}$/, "Phone should be exactly 8 digits")
    .required("Phone number is required"),
});

const SideRegister = ({ currentUse }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading,setLoading] = useState(false);

  const notify = (msg) => toast.error(msg);
  

  const formik = useFormik({
    initialValues: {
      first_name: '',
      last_name: '',
      email: '',
      phone: '',
      password: '',
    },
    validationSchema: RegisterSchema ,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const response = await axios.post(`${APIURL}/register`,
            values
          ,
          {
            headers: {
              Accept: "application/json",
              "x-api-key": ApiKey,
            },
          }
        );
        currentUse({log:"verify",hash:response.data.hash});
      } catch (error) {
        if (error.response?.status === 422) {
          notify("Email Already Used");
        }
      } finally {
        setLoading(false);
      }
    },
  });
  const handleCheckF = () => {
    if(formik.errors.first_name || formik.errors.last_name || formik.errors.email || formik.errors.phone || formik.errors.password){
      notify("Please complete all fields and accept the Privacy Policy to continue");
    }
  }
  return (
    <div className="login-items-container overflow-auto mt-3">
      <div className="d-flex flex-column position-relative">
      <h2 className="text-center mb-4">Create Account</h2>
      <ToastContainer position='top-center' closeButton={false} autoClose={2000} hideProgressBar={true} transition={Slide} />
      <Card className="border-0 shadow-sm">
      <Card.Body className="p-4">
      <Form onSubmit={formik.handleSubmit} noValidate>
        <Form.Group className="mb-3">
          <Form.Control
            name="first_name"
            type="text"
            placeholder="First Name"
            value={formik.values.first_name}
            onChange={formik.handleChange}
            className={`custom-input ${formik.touched.first_name && formik.errors.first_name ? 'border-danger' : ''}`}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            name="last_name"
            type="text"
            placeholder="Last Name"
            value={formik.values.last_name}
            onChange={formik.handleChange}
            className={`custom-input ${formik.touched.last_name && formik.errors.last_name ? 'border-danger' : ''}`}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            name="email"
            type="email"
            placeholder="Email Address"
            value={formik.values.email}
            onChange={formik.handleChange}
            className={`custom-input ${formik.touched.email && formik.errors.email ? 'border-danger' : ''}`}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            name="phone"
            type="text"
            placeholder="Phone Number"
            value={formik.values.phone}
            onChange={formik.handleChange}
            className={`custom-input ${formik.touched.phone && formik.errors.phone ? 'border-danger' : ''}`}
          />
        </Form.Group>

        <Form.Group className="mb-3 position-relative">
          <Form.Control
            name="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={formik.values.password}
            onChange={formik.handleChange}
            className={`custom-input ${formik.touched.password && formik.errors.password ? 'border-danger' : ''}`}
          />
          <div
            role="button"
            className="password-toggle"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </div>
        </Form.Group>

        <Button
        onClick={handleCheckF}
        variant="primary"
        type="submit"
        className="w-100 py-2 fw-bold text-uppercase"
        style={{
          background: 'linear-gradient(45deg, #e83e8c, #6f42c1)',
          border: 'none',
          letterSpacing: '1px',
        }}
        >
          Register
        </Button>

        <div className="text-center">
          <span  role="button" onClick={() => currentUse({log:'login'})}>
            Already have an account? <b style={{ color: "#e83e8c" }}>Login</b>
          </span>
        </div>
      </Form>
      </Card.Body>
      </Card>
    </div>
    </div>
  );
};

export default SideRegister;
