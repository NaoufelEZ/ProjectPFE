import { faEnvelope, faLock, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Button, Form, Card, Container } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import useUser from '../../../Hooks/useUser';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import Loading from '../../../Components/Loading';
import axios from 'axios';
import { ApiKey, APIURL } from '../../../Api/Api';
import Cookies from 'universal-cookie';
import Swal from 'sweetalert2';
import './Profile.css';
import { toast } from 'react-toastify';

const updateProfile = Yup.object().shape({
  first_name: Yup.string()
    .matches(/^[a-zA-Z]+$/, "First Name should be alpha")
    .min(3, "First Name Should Be At Least 3 Letters")
    .required("First Name is required"),
  last_name: Yup.string()
    .matches(/^[a-zA-Z]+$/, "Last Name should be alpha")
    .min(3, "Last Name Should Be At Least 3 Letters")
    .required("Last Name is required"),
  phone: Yup.string()
    .matches(/^\d{8}$/, "Phone should be 8 digits")
    .required("Phone Number is required"),
});

const Profile = () => {
  const user = useUser();
  const navigate = useNavigate();
  const cookie = new Cookies();
  const token = cookie.get("auth");
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (user) setLoading(false);
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

  const handleUserDelete = async () => {
    Swal.fire({
      title: "Delete Your Account?",
      text: "All your data will be permanently removed",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc3545",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Delete Account",
      cancelButtonText: "Cancel",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`${APIURL}/user/delete`, {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
            "x-api-key": ApiKey,
          }
        });
        Swal.fire({
          title: "Account Deleted",
          text: "Your account has been permanently removed",
          icon: "success"
        }).then(() => {
          cookie.remove("auth");
          navigate("/");
        });
      }
    });
  }

  if (loading) return <Loading />;

  return (
    <>
      <Helmet>
        <title>Profile Settings | Nalouti Store</title>
      </Helmet>
      
      <Container className="profile-container">
        {/* Personal Details Section */}
        <Card className="profile-section mb-4">
          <Card.Body>
            <h4 className="section-title mb-4">Personal Details</h4>
            <Form onSubmit={formik.handleSubmit}>
              <div className="row mb-3">
                <div className="col-md-6 mb-3 mb-md-0">
                  <Form.Group>
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      name="first_name"
                      value={formik.values.first_name}
                      isInvalid={formik.touched.first_name && !!formik.errors.first_name}
                      onChange={formik.handleChange}
                      className="form-control-lg"
                    />
                    <Form.Control.Feedback type="invalid">
                      {formik.errors.first_name}
                    </Form.Control.Feedback>
                  </Form.Group>
                </div>
                <div className="col-md-6">
                  <Form.Group>
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      name="last_name"
                      value={formik.values.last_name}
                      isInvalid={formik.touched.last_name && !!formik.errors.last_name}
                      onChange={formik.handleChange}
                      className="form-control-lg"
                    />
                    <Form.Control.Feedback type="invalid">
                      {formik.errors.last_name}
                    </Form.Control.Feedback>
                  </Form.Group>
                </div>
              </div>
              
              <div className="row mb-4">
                <div className="col-md-6">
                  <Form.Group>
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                      name="phone"
                      value={formik.values.phone}
                      isInvalid={formik.touched.phone && !!formik.errors.phone}
                      onChange={formik.handleChange}
                      className="form-control-lg"
                    />
                    <Form.Control.Feedback type="invalid">
                      {formik.errors.phone}
                    </Form.Control.Feedback>
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

        {/* Account Information Section */}
        <Card className="profile-section mb-4">
          <Card.Body>
            <h4 className="section-title mb-4">Account Information</h4>
            
            <Card  className="account-card mb-3" role='button'>
              <Card.Body className="d-flex align-items-center">
                <FontAwesomeIcon icon={faEnvelope} className="account-icon me-3" />
                <div className="flex-grow-1">
                  <h6 className="mb-0">Email Address</h6>
                  <p className="mb-0 text-muted">{user.email}</p>
                </div>
                <Button disabled={user?.google_id !== null }
                  variant="outline-secondary" 
                  onClick={() => navigate("/setting/change-email")}
                >
                  Change
                </Button>
              </Card.Body>
            </Card>
            
            <Card className="account-card">
              <Card.Body className="d-flex align-items-center">
                <FontAwesomeIcon icon={faLock} className="account-icon me-3" />
                <div className="flex-grow-1">
                  <h6 className="mb-0">Password</h6>
                  <p className="mb-0 text-muted">••••••••</p>
                </div>
                <Button 
                  variant="outline-secondary"
                  onClick={() => navigate("/setting/change-password")}
                >
                  Change
                </Button>
              </Card.Body>
            </Card>
          </Card.Body>
        </Card>

        {/* Delete Account Section */}
        <Card className="profile-section border-danger">
          <Card.Body>
            <div className="d-flex align-items-center">
              <FontAwesomeIcon icon={faTrash} className="text-danger me-3" />
              <div className="flex-grow-1">
                <h6 className="mb-1 text-danger">Delete Account</h6>
                <p className="small text-muted mb-0">
                  Permanently remove your account and all data
                </p>
              </div>
              <Button 
                variant="outline-danger"
                onClick={handleUserDelete}
              >
                Delete
              </Button>
            </div>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default Profile;