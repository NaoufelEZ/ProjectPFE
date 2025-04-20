import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { APIURL, ApiKey } from "../../Api/Api";
import { Form, Button, Container } from "react-bootstrap";
import { useEffect, useState } from "react";

const googleSchema = Yup.object().shape({
  first_name: Yup.string().required("First name is required"),
  last_name: Yup.string().required("Last name is required"),
  phone: Yup.string()
    .matches(/^[0-9]{8}$/, "Phone must be 8 digits")
    .required("Phone is required"),
});

const CreateAccountWithGoogle = () => {
  const [user,setUser] = useState([]);
  const { token } = useParams();
  const navigate = useNavigate()
  useEffect(()=>{
    axios.get(`${APIURL}/auth/google/info/${token}`,
    {
      headers:{
        Accept: "application/json",
        "x-api-key": ApiKey
      }
    }).then((response)=>setUser(response.data.data));
  },[token])


  const formik = useFormik({
    enableReinitialize:true,
    initialValues: {
      first_name: user?.first_name || "",
      last_name: user?.last_name || "",
      phone: "",
    },
    validationSchema: googleSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        await axios.put(`${APIURL}/auth/google/update`, {
          ...values,
          token: token,
        }, {
          headers: {
            "x-api-key": ApiKey
          }
        });

        alert("Account completed successfully!");
        navigate("/");
      } catch (err) {
        alert("Something went wrong. Please try again.");
      }
    },
  });

  return (
    <Container style={{ maxWidth: "500px", marginTop: "40px" }}>
      <h3 className="mb-4">Complete Your Google Account</h3>

      <Form noValidate onSubmit={formik.handleSubmit}>
        <Form.Group className="mb-3" controlId="firstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            name="first_name"
            value={formik.values.first_name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={formik.touched.first_name && !!formik.errors.first_name}
            isValid={formik.touched.first_name && !formik.errors.first_name}
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.first_name}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="lastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            name="last_name"
            value={formik.values.last_name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={formik.touched.last_name && !!formik.errors.last_name}
            isValid={formik.touched.last_name && !formik.errors.last_name}
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.last_name}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="phone">
          <Form.Label>Phone</Form.Label>
          <Form.Control
            type="text"
            name="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={formik.touched.phone && !!formik.errors.phone}
            isValid={formik.touched.phone && !formik.errors.phone}
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.phone}
          </Form.Control.Feedback>
        </Form.Group>

        <Button variant="primary" type="submit" disabled={formik.isSubmitting}>
          {formik.isSubmitting ? "Submitting..." : "Finish Registration"}
        </Button>
      </Form>
    </Container>
  );
};

export default CreateAccountWithGoogle;
