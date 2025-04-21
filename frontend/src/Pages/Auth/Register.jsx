import axios from "axios";
import { useState } from "react";
import { Button, Form, Card, Container, Row, Col, Image } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { ApiKey } from "../../Api/Api";
import { useFormik } from "formik";
import * as Yup from "yup";
import Loading from "../../Components/Loading";
import { FaGoogle } from "react-icons/fa";

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

const Register = () => {
  const nav = useNavigate();
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState(false);

  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      phone: "",
    },
    validationSchema: RegisterSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const res = await axios.post(
          "http://127.0.0.1:8000/api/v1/register",
          {
            first_name: values.first_name,
            last_name: values.last_name,
            email: values.email,
            phone: values.phone,
            password: values.password,
          },
          {
            headers: {
              Accept: "application/json",
              "x-api-key": ApiKey,
            },
          }
        );
        const link = res.data.hash;
        nav(`/verify/${link}`);
      } catch (error) {
        if (error.response?.status === 422) {
          setEmailError(true);
        }
      } finally {
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
                  <h1 className="display-4 fw-bold mb-4">Join Our Community</h1>
                  <p className="lead">Create an account to access exclusive offers</p>
                </div>
              </div>
            </Col>
            
            {/* Registration Form */}
            <Col md={6} className="d-flex align-items-center justify-content-center p-4">
              <div className="w-100" style={{ maxWidth: "500px" }}>
                <div className="text-center mb-4">
                  <Image src="/logo.png" alt="Brand Logo" height="60" className="mb-3" />
                  <h2 className="fw-bold" style={{ color: "#2c3e50" }}>Create Account</h2>
                  <p className="text-muted">Get started with your fashion journey</p>
                </div>
                
                <Card className="border-0 shadow-sm">
                  <Card.Body className="p-4">
                    <Form onSubmit={formik.handleSubmit}>
                      <Row className="mb-3">
                        <Col md={6}>
                          <Form.Group controlId="first_name">
                            <Form.Label className="small text-uppercase text-muted">First Name</Form.Label>
                            <Form.Control
                              name="first_name"
                              type="text"
                              placeholder="First Name"
                              className="py-2"
                              style={{ borderLeft: "3px solid #e83e8c" }}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={formik.values.first_name}
                              isInvalid={formik.touched.first_name && !!formik.errors.first_name}
                            />
                            <Form.Control.Feedback type="invalid">
                              {formik.errors.first_name}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group controlId="last_name">
                            <Form.Label className="small text-uppercase text-muted">Last Name</Form.Label>
                            <Form.Control
                              name="last_name"
                              type="text"
                              placeholder="Last Name"
                              className="py-2"
                              style={{ borderLeft: "3px solid #e83e8c" }}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={formik.values.last_name}
                              isInvalid={formik.touched.last_name && !!formik.errors.last_name}
                            />
                            <Form.Control.Feedback type="invalid">
                              {formik.errors.last_name}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                      </Row>

                      <Form.Group className="mb-3" controlId="email">
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
                          isInvalid={(formik.touched.email && !!formik.errors.email) || emailError}
                        />
                        <Form.Control.Feedback type="invalid">
                          {formik.errors.email || (emailError && "Email already exists")}
                        </Form.Control.Feedback>
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="phone">
                        <Form.Label className="small text-uppercase text-muted">Phone Number</Form.Label>
                        <Form.Control
                          name="phone"
                          type="text"
                          placeholder="Enter phone number"
                          className="py-2"
                          style={{ borderLeft: "3px solid #e83e8c" }}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.phone}
                          isInvalid={formik.touched.phone && !!formik.errors.phone}
                        />
                        <Form.Control.Feedback type="invalid">
                          {formik.errors.phone}
                        </Form.Control.Feedback>
                      </Form.Group>

                      <Form.Group className="mb-4" controlId="password">
                        <Form.Label className="small text-uppercase text-muted">Password</Form.Label>
                        <Form.Control
                          name="password"
                          type="password"
                          placeholder="Enter password"
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
                        {loading ? 'Creating Account...' : 'Sign Up'}
                      </Button>
                    </Form>
                    
                    <div className="position-relative my-4">
                      <hr className="my-0" />
                      <div className="position-absolute top-50 start-50 translate-middle bg-white px-2 small text-muted">
                        OR SIGN UP WITH
                      </div>
                    </div>
                    
                    <div className="d-grid gap-2">
                      <Button 
                        variant="outline-danger" 
                        className="d-flex align-items-center justify-content-center gap-2"
                      >
                        <FaGoogle /> Sign up with Google
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
                
                <div className="text-center mt-3 small">
                  <span className="text-muted">Already have an account? </span>
                  <Link to="/login" className="text-decoration-none fw-bold" style={{ color: "#e83e8c" }}>
                    Login
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

export default Register;