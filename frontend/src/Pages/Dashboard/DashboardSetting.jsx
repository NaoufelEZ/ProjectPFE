import { faEnvelope, faLock, faUser, faPhone } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { Button, Form, Card } from 'react-bootstrap'
import { Helmet } from 'react-helmet-async'
import { useNavigate } from 'react-router-dom'
import useUser from '../../Hooks/useUser';
import * as Yup from 'yup';
import { useFormik } from 'formik'
import Loading from '../../Components/Loading'
import axios from 'axios';
import { toast } from 'react-toastify';
import { ApiKey, APIURL } from '../../Api/Api'
import Cookies from 'universal-cookie'

const updateProfile = Yup.object().shape({
  first_name: Yup.string()
    .matches(/^[a-zA-Z]+$/, "First Name should contain only letters")
    .min(3, "First Name should be at least 3 characters")
    .required("First Name is required"),
  last_name: Yup.string()
    .matches(/^[a-zA-Z]+$/, "Last Name should contain only letters")
    .min(3, "Last Name should be at least 3 characters")
    .required("Last Name is required"),
  phone: Yup.string()
    .matches(/^\d{8}$/, "Phone should be 8 digits")
    .required("Phone Number is required"),
});

const DashboardSetting = () => {
  const user = useUser();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const cookie = new Cookies();
  const token = cookie.get("auth");

  useEffect(() => {
    if (user) {
      setLoading(false);
    }
  }, [user]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      first_name: user?.first_name || "",
      last_name: user?.last_name || "",
      phone: user?.phone || "",
    },
    validationSchema: updateProfile,
    onSubmit: async (values) => {
      setIsSubmitting(true);
      try {
        const response = await axios.put(`${APIURL}/user/update/profile`, values, {
          headers: {  
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
            'x-api-key': ApiKey,
          },
        }
            );
        console.log(response)
        if (response.status === 200) {
          toast.success('Your profile has been updated successfully');
          window.location.reload();
          // Optionally refresh user data here if needed
        }
      } catch (error) {
        const errorMessage = error.response?.data?.message || 
                          (error.response?.data?.errors ? 
                           Object.values(error.response.data.errors).join(' ') : 
                           'Failed to update profile');
        toast.error(errorMessage);
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Helmet>
        <title>Personal Details | Nalouti Dashboard</title>
      </Helmet>
      
      <section className="w-100">
        <Card className="p-4 mb-4">
          <Card.Body>
            <h3 className="mb-4">Personal details</h3>
            <Form onSubmit={formik.handleSubmit}>
              <div className="row mb-3">
                <div className="col-md-6">
                  <Form.Group className="mb-3">
                    <Form.Label className="text-muted small">First Name</Form.Label>
                    <div className="input-group">
                      <span className="input-group-text">
                        <FontAwesomeIcon icon={faUser} />
                      </span>
                      <Form.Control
                        value={formik.values.first_name}
                        name="first_name"
                        placeholder="First Name"
                        type="text"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        isInvalid={formik.touched.first_name && !!formik.errors.first_name}
                      />
                      <Form.Control.Feedback type="invalid">
                        {formik.errors.first_name}
                      </Form.Control.Feedback>
                    </div>
                  </Form.Group>
                </div>
                
                <div className="col-md-6">
                  <Form.Group className="mb-3">
                    <Form.Label className="text-muted small">Last Name</Form.Label>
                    <div className="input-group">
                      <span className="input-group-text">
                        <FontAwesomeIcon icon={faUser} />
                      </span>
                      <Form.Control
                        value={formik.values.last_name}
                        name="last_name"
                        placeholder="Last Name"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        isInvalid={formik.touched.last_name && !!formik.errors.last_name}
                      />
                      <Form.Control.Feedback type="invalid">
                        {formik.errors.last_name}
                      </Form.Control.Feedback>
                    </div>
                  </Form.Group>
                </div>
              </div>
              
              <div className="row mb-4">
                <div className="col-md-6">
                  <Form.Group>
                    <Form.Label className="text-muted small">Phone Number</Form.Label>
                    <div className="input-group">
                      <span className="input-group-text">
                        <FontAwesomeIcon icon={faPhone} />
                      </span>
                      <Form.Control
                        value={formik.values.phone}
                        name="phone"
                        placeholder="Phone Number"
                        type="text"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        isInvalid={formik.touched.phone && !!formik.errors.phone}
                      />
                      <Form.Control.Feedback type="invalid">
                        {formik.errors.phone}
                      </Form.Control.Feedback>
                    </div>
                  </Form.Group>
                </div>
              </div>
              
              <Button
                variant="dark"
                type="submit"
                disabled={isSubmitting || !formik.dirty}
                className="px-4"
              >
                {isSubmitting ? 'Saving...' : 'Save'}
              </Button>
            </Form>
          </Card.Body>
        </Card>

        <Card className="p-4">
          <Card.Body>
            <h3 className="mb-4">Account information</h3>
            <div className="row">
              <div className="col-md-6 mb-3">
                <div className="d-flex align-items-center p-3 rounded border">
                  <FontAwesomeIcon className="me-3 text-muted" icon={faEnvelope} />
                  <div className="flex-grow-1">
                    <div className="small text-muted">Email</div>
                    <div>{user?.email}</div>
                  </div>
                  <Button 
                    variant="link" 
                    onClick={() => navigate("change-email")}
                    className="text-decoration-none"
                  >
                    Change
                  </Button>
                </div>
              </div>
              
              <div className="col-md-6 mb-3">
                <div className="d-flex align-items-center p-3 rounded border">
                  <FontAwesomeIcon className="me-3 text-muted" icon={faLock} />
                  <div className="flex-grow-1">
                    <div className="small text-muted">Password</div>
                    <div>••••••••</div>
                  </div>
                  <Button 
                    variant="link" 
                    onClick={() => navigate("change-password")}
                    className="text-decoration-none"
                  >
                    Change
                  </Button>
                </div>
              </div>
            </div>
          </Card.Body>
        </Card>
      </section>
    </>
  );
};

export default DashboardSetting;