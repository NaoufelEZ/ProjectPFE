import axios from "axios";
import { useState } from "react";
import { Button, Form, Card, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ApiKey } from "../../Api/Api";
import { useFormik } from "formik";
import * as Yup from "yup";
import Loading from "../../Components/Loading";

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
        <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
          <Row className="w-100 justify-content-center">
            <Col md={6} lg={5}>
              <Card className="shadow-lg p-4">
                <Card.Body>
                  <h3 className="text-center mb-4">Sign Up</h3>
                  <Form onSubmit={formik.handleSubmit}>
                    <Form.Group className="mb-3 d-flex gap-2">
                      <div className="d-flex flex-column">
                      <Form.Label>First Name</Form.Label>
                        <Form.Control
                          name="first_name"
                          onChange={formik.handleChange}
                          value={formik.values.first_name}
                          type="text"
                          placeholder="Enter First Name"
                        />
                        <div className="text-danger">{formik.touched.first_name && formik.errors.first_name}</div>
                      </div>

                      <div className="d-flex flex-column">
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control
                        name="last_name"
                        onChange={formik.handleChange}
                        value={formik.values.last_name}
                        type="text"
                        placeholder="Enter Last Name"
                      />
                      <div className="text-danger">{formik.touched.last_name && formik.errors.last_name}</div>
                      </div>
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Email address</Form.Label>
                      <Form.Control
                        name="email"
                        onChange={formik.handleChange}
                        value={formik.values.email}
                        type="email"
                        placeholder="Enter email"
                      />
                      <div className="text-danger">{formik.touched.email && formik.errors.email}</div>
                      {emailError && <div className="text-danger">Email already exists</div>}
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Phone</Form.Label>
                      <Form.Control
                        name="phone"
                        onChange={formik.handleChange}
                        value={formik.values.phone}
                        type="text"
                        placeholder="Enter phone number"
                      />
                      <div className="text-danger">{formik.touched.phone && formik.errors.phone}</div>
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        name="password"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        type="password"
                        placeholder="Enter password"
                      />
                      <div className="text-danger">{formik.touched.password && formik.errors.password}</div>
                    </Form.Group>

                    <Button className="w-100" variant="primary" type="submit">
                      Sign Up
                    </Button>
                  </Form>

                  <div className="text-center mt-3">
                    <span>Already have an account? </span>
                    <a href="/login" className="fw-bold text-primary text-decoration-none">
                      Login
                    </a>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
};

export default Register;
