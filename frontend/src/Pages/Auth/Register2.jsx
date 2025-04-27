import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button, Form } from 'react-bootstrap';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import './Register2.css';

const Register2 = ({ setCurrentUse }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      password: '',
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required('First Name is required.'),
      lastName: Yup.string().required('Last Name is required.'),
      email: Yup.string().email('Invalid email format.').required('Email is required.'),
      phone: Yup.string().required('Phone number is required.'),
      password: Yup.string()
        .required('Password is required.')
        .min(6, 'Password must be at least 6 characters.'),
    }),
    onSubmit: (values) => {
      console.log('Form Submitted', values);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = await formik.validateForm();
    if (Object.keys(errors).length > 0) {
      setShowErrorAlert(true);
    } else {
      setShowErrorAlert(false);
      formik.handleSubmit(e);
    }
  };

  useEffect(() => {
    if (showErrorAlert) {
      const timer = setTimeout(() => {
        setShowErrorAlert(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showErrorAlert]);

  return (
    <div className="form-container">
      <h2 className="text-center mb-4">Create Account</h2>

      <Form onSubmit={handleSubmit} noValidate>
        <Form.Group className="mb-3">
          <Form.Control
            name="firstName"
            type="text"
            placeholder="First Name"
            {...formik.getFieldProps('firstName')}
            className={`custom-input ${formik.touched.firstName && formik.errors.firstName ? 'border-danger' : ''}`}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            name="lastName"
            type="text"
            placeholder="Last Name"
            {...formik.getFieldProps('lastName')}
            className={`custom-input ${formik.touched.lastName && formik.errors.lastName ? 'border-danger' : ''}`}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            name="email"
            type="email"
            placeholder="Email Address"
            {...formik.getFieldProps('email')}
            className={`custom-input ${formik.touched.email && formik.errors.email ? 'border-danger' : ''}`}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            name="phone"
            type="text"
            placeholder="Phone Number"
            {...formik.getFieldProps('phone')}
            className={`custom-input ${formik.touched.phone && formik.errors.phone ? 'border-danger' : ''}`}
          />
        </Form.Group>

        <Form.Group className="mb-3 position-relative">
          <Form.Control
            name="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            {...formik.getFieldProps('password')}
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

        <Button type="submit" className="w-100 rounded-2 py-2 mb-3">
          Register
        </Button>

        <div className="text-center">
          <span role="button" onClick={() => setCurrentUse('login')}>
            Already have an account? <b>Login</b>
          </span>
        </div>
      </Form>
    </div>
  );
};

export default Register2;
