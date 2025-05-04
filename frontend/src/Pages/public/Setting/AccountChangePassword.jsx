import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import { ApiKey, APIURL } from '../../../Api/Api';
import Cookies from 'universal-cookie';
import { ring } from 'ldrs';

const passwordSchema = Yup.object().shape({
  currentPassword: Yup.string()
    .min(6, "Current Password should be at least 6 characters")
    .required("Current Password is required"),
  newPassword: Yup.string()
    .min(6, "New Password should be at least 6 characters")
    .required("New Password is required"),
  repeatPassword: Yup.string()
    .oneOf([Yup.ref("newPassword")], "Passwords must match")
    .required("Repeat Password is required"),
});

const DashboardChangePassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({ action: false, message: "", status: null });

  const cookie = new Cookies();
  const token = cookie.get("auth");

  ring.register();
  const loadingRing = <l-ring size="20" stroke="5" bgOpacity="0" speed="2" color="white" />;

  const formik = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      repeatPassword: "",
    },
    validationSchema: passwordSchema,
    onSubmit: async (values) => {
      setIsLoading(true);

      try {
        const response = await axios.put(
          `${APIURL}/user/update/password`,
          {
            old_password: values.currentPassword,
            new_password: values.newPassword,
          },
          {
            headers: {
              Accept: "Application/json",
              Authorization: `Bearer ${token}`,
              "x-api-key": ApiKey,
            },
          }
        );

        console.log("Success:", response.data);
        setError({ action: false, message: "", status: null });

      } catch (err) {
        console.error("Error:", err);

        if (err.response) {
          setError({
            action: true,
            message: err.response.data?.message || "An error occurred",
            status: err.response.status,
          });
        } else {
          setError({ action: true, message: "Network error. Please try again.", status: null });
        }
      } finally {
        setIsLoading(false);
      }
    },
  });
console.log(error)
  return (
    <>
      <Helmet>
        <title>Change Password | Nalouti Store</title>
      </Helmet>
      <section className="w-50">
        <div>
          <Link className="text-muted" to="/setting/personal-details">
            <FontAwesomeIcon className="h6 me-2 mb-0" icon={faArrowLeft} />
            <span className="h6">Back to Personal Details</span>
          </Link>
        </div>
        <div className="w-100">
          <h3 className="my-3">Change Password</h3>
          <Form onSubmit={formik.handleSubmit}>
            {/* Current Password */}
            <Form.Group className="mb-3">
              <Form.Control
                type="password"
                name="currentPassword"
                value={formik.values.currentPassword}
                onChange={formik.handleChange}
                placeholder="Current Password"
                isInvalid={formik.touched.currentPassword && (formik.errors.currentPassword || (error.action && error.status === 401))}
                isValid={formik.touched.currentPassword && !formik.errors.currentPassword && !error.action || error.status === 403 }
              />
              <Form.Control.Feedback type='invalid'>
                {formik.errors.currentPassword || (error.status === 401 ? error.message : "")}
              </Form.Control.Feedback>
              <Form.Control.Feedback type='valid'>Looks Good!</Form.Control.Feedback>
            </Form.Group>

            {/* New Password */}
            <Form.Group className="mb-3">
              <Form.Control
                type="password"
                name="newPassword"
                value={formik.values.newPassword}
                onChange={formik.handleChange}
                placeholder="New Password"
                isInvalid={formik.touched.newPassword && (formik.errors.newPassword || (error.action && error.status === 403))}
                isValid={(formik.touched.newPassword && !formik.errors.newPassword) && !error.action}
              />
              <Form.Control.Feedback type='invalid'>
                {formik.errors.newPassword || (error.status === 403 ? error.message : "")}
              </Form.Control.Feedback>
              <Form.Control.Feedback type='valid'>Looks Good!</Form.Control.Feedback>
            </Form.Group>

            {/* Repeat Password */}
            <Form.Group className="mb-3">
              <Form.Control
                type="password"
                name="repeatPassword"
                value={formik.values.repeatPassword}
                onChange={formik.handleChange}
                placeholder="Repeat New Password"
                isInvalid={formik.touched.repeatPassword && formik.errors.repeatPassword}
                isValid={formik.touched.repeatPassword && !formik.errors.repeatPassword}
              />
              <Form.Control.Feedback type='invalid'>{formik.errors.repeatPassword}</Form.Control.Feedback>
              <Form.Control.Feedback type='valid'>Looks Good!</Form.Control.Feedback>
            </Form.Group>

            {/* Submit Button */}
            <Button variant='dark' type='submit' disabled={isLoading}>
              {isLoading ? loadingRing : "Change Password"}
            </Button>
          </Form>
        </div>
      </section>
    </>
  );
};

export default DashboardChangePassword;
