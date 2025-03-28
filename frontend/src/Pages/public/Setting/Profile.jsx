import { faEnvelope, faLock, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { Helmet } from 'react-helmet-async'
import { useNavigate } from 'react-router-dom'
import useUser from '../../../Hooks/useUser';
import * as Yup from 'yup';
import { useFormik } from 'formik'
import Loading from '../../../Components/Loading'

const updateProfile = Yup.object().shape({
  first_name: Yup.string().matches(/^[a-zA-Z]+$/, "First Name should be alpha").min(3, "First Name Should Be At Least 3 Letters").required("First Name is required"),
  last_name: Yup.string().matches(/^[a-zA-Z]+$/, "Last Name should be alpha").min(3, "Last Name Should Be At Least 3 Letters").required("Last Name is required"),
  phone: Yup.string().matches(/^\d{8}$/, "Phone should be a number").required("Phone Number is required"),
});

const Profile = () => {
  const user = useUser();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

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
    onSubmit: (values) => {
      console.log(values);
    },
  });

  if (loading) {
    return <Loading />
  }

  return (
    <>
      <Helmet>
        <title>Personal Details | Nalouti Store</title>
      </Helmet>
      <section className="w-50">
        <h3>Personal details</h3>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group className="d-flex gap-2 mb-4">
          <div className="w-50">
          <Form.Control
              value={formik.values.first_name}
              name="first_name"
              className="p-2"
              placeholder="First Name"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.first_name && formik.errors.first_name && (
            <div className="text-danger">{formik.errors.first_name}</div>
          )}
          </div>
          <div className="w-50">
            <Form.Control
              value={formik.values.last_name}
              name="last_name"
              className="p-2"
              placeholder="Last Name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
             {formik.touched.last_name && formik.errors.last_name && (
            <div className="text-danger">{formik.errors.last_name}</div>
            )}
            </div>
          </Form.Group>
          <Form.Group className="w-50 mb-4">
            <Form.Control
              value={formik.values.phone}
              name="phone"
              className="p-2"
              placeholder="Phone Number"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
             {formik.touched.phone && formik.errors.phone && (
            <div className="text-danger">{formik.errors.phone}</div>
            )}
          </Form.Group>
          <Form.Group className="mb-3">
            <Button
              variant="dark"
              className="p-3"
              type="submit"
            >
              Save
            </Button>
          </Form.Group>
        </Form>

        <h3>Account information</h3>
        <div className="d-flex w-100 gap-2">
          <div className="d-flex align-items-center p-3 rounded-3 border border-1 border-muted w-100">
            <FontAwesomeIcon className="me-2 h6 mb-0" icon={faEnvelope} />
            <span className="h6 mb-0">{user.email}</span>
            <div className="w-100 d-flex justify-content-end">
              <span role="button" onClick={() => navigate("/setting/change-email")}>change</span>
            </div>
          </div>
          <div className="d-flex align-items-center p-3 rounded-3 border border-1 border-muted w-100">
            <FontAwesomeIcon className="me-2 h6 mb-0" icon={faLock} />
            <span className="h6 mb-0">Password</span>
            <div className="w-100 d-flex justify-content-end">
              <span role="button" onClick={() => navigate("/setting/change-password")}>change</span>
            </div>
          </div>
        </div>
        <div role="button" className="d-flex align-items-center p-3 rounded-3 border border-1 border-muted w-50 mt-3">
          <FontAwesomeIcon className="me-2 h6 mb-0" icon={faTrash} />
          <span className="h6 mb-0">Delete Account</span>
        </div>
      </section>
    </>
  );
};

export default Profile;
