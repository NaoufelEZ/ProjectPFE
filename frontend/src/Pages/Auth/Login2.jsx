import { faArrowLeft, faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef, useState } from 'react';
import googleLogo from '../../Assets/images/icons8-google-48.svg';
import { useNavigate, Link } from 'react-router-dom';
import './Login2.css';
import useCloseOut from '../../Hooks/useClose';
import { Button, Form, Card, Image, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Cookies from 'universal-cookie';
import { ApiKey } from '../../Api/Api';
import Loading from '../../Components/Loading';
import Register2 from './Register2';

function Login2({ setLogin }) {
  const [currentUse, setCurrentUse] = useState('login');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const loginRef = useRef(null);
  const cookie = new Cookies();
  const nav = useNavigate();

  // Validation schema with Yup
  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  });

  // Formik setup
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const res = await axios.post(
          'http://127.0.0.1:8000/api/v1/login',
          values,
          {
            headers: {
              Accept: 'application/json',
              'x-api-key': ApiKey,
            },
          }
        );
        cookie.set('auth', res.data.token);
        if (res.data.data.role === 'admin' || res.data.data.role === 'Product Manager') {
          nav('/dashboard');
        } else {
          nav('/');
        }
      } catch (err) {
        setError(true);
        setLoading(false);
      }
    },
  });

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  useCloseOut(loginRef, setLogin);

  return (
    <div ref={loginRef} className="login-content">
      <div className="login-header">
        <h3 className="login-title">{currentUse}</h3>
        <div className="login-close-btn">
          {currentUse === 'login' ? (
            <FontAwesomeIcon className="mb-0" icon={faClose} onClick={() => setLogin(false)} />
          ) : (
            <FontAwesomeIcon className="mb-0" icon={faArrowLeft} onClick={() => setCurrentUse('login')} />
          )}
        </div>
      </div>
      {currentUse === 'login' ? (
        <div className="login-items-container overflow-auto mt-3">
          <div className="d-flex align-items-center flex-column">
            <span className="h5">Log in or create an account</span>
            <div
              role="button"
              className="d-flex rounded-2 justify-content-center py-1 align-items-center border border-1 w-100 mt-4"
            >
              <img className="me-4" src={googleLogo} width={35} height={35} alt="google-logo" />
              <span className="font-weight-bold">CONTINUE WITH GOOGLE</span>
            </div>
            <span style={{ fontSize: '12px' }} className="text-secondary text-center mt-3">
              By logging/signing in with my social login, I agree to connect my account in accordance
            </span>
          </div>
          <div className="d-flex mt-5 align-items-center">
            <span style={{ height: '.5px' }} className="w-100 bg-light"></span>
            <span className="px-2 mb-1 text-secondary">or</span>
            <span style={{ height: '.5px' }} className="w-100 bg-light"></span>
          </div>
          <div>
            {loading ? (
              <Loading />
            ) : (
              <Card className="border-0 shadow-sm">
                <Card.Body className="p-4">
                  <Form onSubmit={formik.handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label className="small text-uppercase text-muted">Email Address</Form.Label>
                      <Form.Control
                        name="email"
                        type="email"
                        placeholder="Enter email"
                        className="py-2"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                        isInvalid={formik.touched.email && !!formik.errors.email}
                      />
                      <Form.Control.Feedback type="invalid">{formik.errors.email}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-4" controlId="formBasicPassword">
                      <Form.Label className="small text-uppercase text-muted">Password</Form.Label>
                      <Form.Control
                        name="password"
                        type="password"
                        placeholder="Password"
                        className="py-2"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                        isInvalid={formik.touched.password && !!formik.errors.password}
                      />
                      <Form.Control.Feedback type="invalid">{formik.errors.password}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="d-flex justify-content-between align-items-center mb-3">
                      <Form.Check type="checkbox" label="Remember me" className="small text-muted" />
                      <Link to={"/forget_password"} className="small text-decoration-none" style={{ color: "#e83e8c" }}>
                        Forgot Password?
                      </Link>
                    </Form.Group>

                    <Button
                      variant="primary"
                      type="submit"
                      className="w-100 py-2 fw-bold text-uppercase"
                      style={{
                        background: 'linear-gradient(45deg, #e83e8c, #6f42c1)',
                        border: 'none',
                        letterSpacing: '1px',
                      }}
                      disabled={loading}
                    >
                      {loading ? 'Signing In...' : 'Login'}
                    </Button>

                    {error && (
                      <div className="mt-3 p-2 bg-danger text-white rounded text-center small">
                        Email or Password are Wrong
                      </div>
                    )}
                  </Form>
                </Card.Body>
              </Card>
            )}
          </div>
          <div className="text-center mt-3 small">
            <span className="text-muted">Don't have an account? </span>
            <Link to={"/register"} className="text-decoration-none fw-bold" style={{ color: "#e83e8c" }}>
              Sign Up
            </Link>
          </div>
        </div>
      ) : (
        <Register2 />
      )}
    </div>
  );
}

export default Login2;
