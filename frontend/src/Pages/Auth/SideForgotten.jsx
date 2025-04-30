import { useState } from "react";
import { Slide, toast, ToastContainer } from "react-toastify";
import * as Yup from "yup";
import Loading from "../../Components/Loading";
import { Form,Button,Card } from "react-bootstrap";
import { useFormik } from "formik";
import { ApiKey, APIURL } from "../../Api/Api";
import axios from "axios";
const RegisterSchema = Yup.object().shape({
  email: Yup.string()
    .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/, "Invalid email address")
    .required("Email is required"),
});
const SideForgotten = () => {
    const notify = () => toast.error("Email Not Found.");
 
    const [loading,setLoading] = useState(false);
    const formik = useFormik({
      initialValues: {
        email: ''
      },
      validationSchema: RegisterSchema ,
      onSubmit: async (values) => {
        try {
          const response = await axios.post(
            `${APIURL}/password/seed`,
              values,
            {
              headers: {
                Accept: "application/json",
                "x-api-key": ApiKey,
              }
            }
          )
      }catch(err){
        notify();
      }
    }
  });
  
  return (
    <div className="login-items-container overflow-auto mt-3">
          <div className="d-flex align-items-center flex-column position-relative">
           <ToastContainer position="top-center" closeButton={false} autoClose={2000} hideProgressBar={true} transition={Slide} />
            <span className="h5 fw-bold">Forgotten your password?</span>
            <span style={{fontSize:"12px"}}>We'll send you instructions by email so that you can reset it</span>
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
                      Reset
                    </Button>
                  </Form>
                </Card.Body>
              </Card>
            )}
          </div>
        </div>
  )
}

export default SideForgotten