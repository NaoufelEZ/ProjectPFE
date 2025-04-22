import axios from "axios";
import { useState } from "react";
import { Button, Form, Card, Container, Row, Col, Image } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { ApiKey } from "../../Api/Api";
import Loading from "../../Components/Loading";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FaGoogle } from "react-icons/fa";

const Login = () => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const cookie = new Cookies();
  const nav = useNavigate();

  // Validation schema
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  // Formik setup
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const res = await axios.post(
          "http://127.0.0.1:8000/api/v1/login",
          values,
          {
            headers: {
              Accept: "application/json",
              "x-api-key": ApiKey,
            },
          }
        );
        cookie.set("auth", res.data.token);
        (res.data.data.role === "admin" || res.data.data.role === "Product Manager") 
          ? nav("/dashboard") 
          : nav("/");
      } catch (err) {
        setError(true);
        setLoading(false);
      }
    },
  });

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Container fluid className="login-container p-0" style={{ minHeight: "100vh", background: "#f8f9fa" }}>
          <Row className="g-0 h-100">
            {/* Fashion Image Sidebar */}
            <Col md={6} className="d-none d-md-block">
              <div 
                className="h-100 position-relative" 
                style={{ 
                  background: "linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3))", 
                  backgroundImage: "url('https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')",
                  backgroundSize: "cover", 
                  backgroundPosition: "center" 
                }}
              >
                <div className="position-absolute top-50 start-50 translate-middle text-center text-white p-4">
                  <h1 className="display-4 fw-bold mb-4">Welcome Back</h1>
                  <p className="lead">Sign in to explore our latest collection</p>
                </div>
              </div>
            </Col>
            
            {/* Login Form */}
            <Col md={6} className="d-flex align-items-center justify-content-center p-4">
              <div className="w-100" style={{ maxWidth: "400px" }}>
                <div className="text-center mb-4">
                  <Image src="/logo.png" alt="Brand Logo" height="60" className="mb-3" />
                  <h2 className="fw-bold" style={{ color: "#2c3e50" }}>Sign In</h2>
                  <p className="text-muted">Access your account to continue</p>
                </div>
                
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
                          style={{ borderLeft: "3px solid #e83e8c" }}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.email}
                          isInvalid={formik.touched.email && !!formik.errors.email}
                        />
                        <Form.Control.Feedback type="invalid">
                          {formik.errors.email}
                        </Form.Control.Feedback>
                      </Form.Group>
                      
                      <Form.Group className="mb-4" controlId="formBasicPassword">
                        <Form.Label className="small text-uppercase text-muted">Password</Form.Label>
                        <Form.Control
                          name="password"
                          type="password"
                          placeholder="Password"
                          className="py-2"
                          style={{ borderLeft: "3px solid #e83e8c" }}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.password}
                          isInvalid={formik.touched.password && !!formik.errors.password}
                        />
                        <Form.Control.Feedback type="invalid">
                          {formik.errors.password}
                        </Form.Control.Feedback>
                      </Form.Group>
                      
                      <Form.Group className="d-flex justify-content-between align-items-center mb-3">
                        <Form.Check 
                          type="checkbox" 
                          label="Remember me" 
                          className="small text-muted"
                        />
                        <Link to={"/forget_password"} className="small text-decoration-none" style={{ color: "#e83e8c" }}>
                          Forgot Password?
                        </Link>
                      </Form.Group>
                      
                      <Button 
                        variant="primary" 
                        type="submit" 
                        className="w-100 py-2 fw-bold text-uppercase"
                        style={{ 
                          background: "linear-gradient(45deg, #e83e8c, #6f42c1)",
                          border: "none",
                          letterSpacing: "1px"
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
                    
                    <div className="position-relative my-4">
                      <hr className="my-0" />
                      <div className="position-absolute top-50 start-50 translate-middle bg-white px-2 small text-muted">
                        OR CONTINUE WITH
                      </div>
                    </div>
                    
                    <div className="d-grid gap-2">
                      <Button 
                        variant="outline-danger" 
                        className="d-flex align-items-center justify-content-center gap-2"
                        as="a" 
                        href="http://127.0.0.1:8000/login-google"
                      >
                        <FaGoogle /> Sign in with Google
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
                
                <div className="text-center mt-3 small">
                  <span className="text-muted">Don't have an account? </span>
                  <Link to={"/register"} className="text-decoration-none fw-bold" style={{ color: "#e83e8c" }}>
                    Sign Up
                  </Link>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
};

export default Login;