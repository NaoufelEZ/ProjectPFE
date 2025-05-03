import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { APIURL, ApiKey } from "../../Api/Api";
import { Form, Button, Container } from "react-bootstrap";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const googleSchema = Yup.object().shape({
  first_name: Yup.string().required("First name is required"),
  last_name: Yup.string().required("Last name is required"),
  phone: Yup.string()
    .matches(/^[0-9]{8}$/, "Phone must be 8 digits")
    .required("Phone is required"),
});

const CreateAccountWithGoogle = () => {
  const [user, setUser] = useState([]);
  const [step, setStep] = useState(1);
  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${APIURL}/auth/google/info/${token}`, {
      headers: {
        Accept: "application/json",
        "x-api-key": ApiKey
      }
    }).then((response) => setUser(response.data.data));
  }, [token]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      first_name: user?.first_name || "",
      last_name: user?.last_name || "",
      phone: "",
    },
    validationSchema: googleSchema,
    onSubmit: async (values) => {
      try {
        await axios.put(`${APIURL}/auth/google/update`, {
          ...values,
          token: token,
        }, {
          headers: {
            "x-api-key": ApiKey
          }
        });
        navigate("/");
        window.location.reload();
      } catch (err) {
        alert("Something went wrong. Please try again.");
      }
    },
  });

  const nextStep = () => {
    if (step === 1 && formik.values.first_name && !formik.errors.first_name) {
      setStep(2);
    } else if (step === 2 && formik.values.last_name && !formik.errors.last_name) {
      setStep(3);
    }
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <div className="card shadow p-4" style={{ width: "100%", maxWidth: "500px" }}>
        <div className="text-center mb-4">
          <img
            src="https://cdn-icons-png.flaticon.com/512/281/281764.png"
            alt="Google Icon"
            width={50}
            className="mb-2"
          />
          <h4 className="fw-bold">Complete Your Google Account</h4>
          <p className="text-muted mb-0">Step {step} of 3</p>
          
          {/* Progress bar */}
          <div className="progress mt-3" style={{ height: "8px" }}>
            <div 
              className="progress-bar bg-primary" 
              role="progressbar" 
              style={{ width: `${(step / 3) * 100}%` }}
              aria-valuenow={step} 
              aria-valuemin="1" 
              aria-valuemax="3"
            ></div>
          </div>
        </div>

        <Form noValidate onSubmit={formik.handleSubmit}>
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ x: 300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -300, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <Form.Group className="mb-3" controlId="firstName">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="first_name"
                    placeholder="Enter your first name"
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
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ x: 300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -300, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <Form.Group className="mb-3" controlId="lastName">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="last_name"
                    placeholder="Enter your last name"
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
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ x: 300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -300, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <Form.Group className="mb-3" controlId="phone">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type="text"
                    name="phone"
                    placeholder="8-digit phone number"
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
              </motion.div>
            )}
          </AnimatePresence>

          <div className="d-flex justify-content-between mt-4">
            {step > 1 ? (
              <Button variant="outline-secondary" onClick={prevStep}>
                Back
              </Button>
            ) : (
              <div></div> // Empty div to maintain space
            )}

            {step < 3 ? (
              <Button variant="primary" onClick={nextStep}>
                Next
              </Button>
            ) : (
              <Button 
                variant="primary" 
                type="submit" 
                disabled={formik.isSubmitting}
              >
                {formik.isSubmitting ? "Submitting..." : "Finish Registration"}
              </Button>
            )}
          </div>
        </Form>
      </div>
    </Container>
  );
};

export default CreateAccountWithGoogle;