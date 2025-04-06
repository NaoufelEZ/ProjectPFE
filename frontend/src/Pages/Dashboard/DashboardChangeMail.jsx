import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import axios from 'axios';
import { toast } from 'react-toastify';
import { ApiKey, APIURL } from '../../Api/Api';
import Cookies from 'universal-cookie';

const DashboardChangeMail = () => {
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const cookie = new Cookies();
  const token = cookie.get('auth');

  const emailSchema = Yup.object().shape({
    currentEmail: Yup.string()
      .email('Invalid email format')
      .required('Current email is required'),
    newEmail: Yup.string()
      .email('Invalid email format')
      .required('New email is required')
      .notOneOf([Yup.ref('currentEmail')], 'New email must be different from current email'),
    repeatNewEmail: Yup.string()
      .oneOf([Yup.ref('newEmail')], 'Emails must match')
      .required('Please repeat your new email')
  });

  const otpSchema = Yup.object().shape({
    otp: Yup.string()
      .required('OTP is required')
      .matches(/^\d{6}$/, 'OTP must be 8 digits')
  });

  const emailFormik = useFormik({
    initialValues: {
      currentEmail: '',
      newEmail: '',
      repeatNewEmail: ''
    },
    validationSchema: emailSchema,
    onSubmit: async (values) => {
      setIsSubmitting(true);
      try {
        const response = await axios.put(`${APIURL}/user/update/email`, {
          current_email: values.currentEmail,
          new_email: values.newEmail,
          }, {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
            'x-api-key': ApiKey,
          }

        });
        
        if (response.status === 200) {
          setShowOtpModal(true);
          toast.success('Email change request sent. Please check your new email for OTP.');
        }
      } catch (error) {
        toast.error(error.response?.data?.message || 'Failed to update email');
      } finally {
        setIsSubmitting(false);
      }
    }
  });

  const otpFormik = useFormik({
    initialValues: {
      otp: ''
    },
    validationSchema: otpSchema,
    onSubmit: async (values) => {
      setIsSubmitting(true);
      try {
        const response = await axios.put(`${APIURL}/user/update/email/verify`, {
          otp_code: values.otp,
        }, {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
            'x-api-key': ApiKey,
          }
        });
        
        if (response.status === 200) {
          toast.success('Email successfully verified!');
          setShowOtpModal(false);
          // Optionally redirect or refresh user data
        }
      } catch (error) {
        toast.error(error.response?.data?.message || 'OTP verification failed');
      } finally {
        setIsSubmitting(false);
      }
    }
  });

  return (
    <>
      <Helmet>
        <title>Change Email | Nalouti Dashboard</title>
      </Helmet>
      
      <section className="w-50">
        <div>
          <Link className="text-muted" to="/dashboard/setting">
            <FontAwesomeIcon className="h6 me-2 mb-0" icon={faArrowLeft}/>
            <span className="h6">Back to Personal Details</span>
          </Link>
        </div>
        
        <div className="w-100">
          <h3 className="my-3">Change Email</h3>
          
          <Form onSubmit={emailFormik.handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Control
                type="email"
                placeholder="Current Email"
                name="currentEmail"
                value={emailFormik.values.currentEmail}
                onChange={emailFormik.handleChange}
                onBlur={emailFormik.handleBlur}
                isInvalid={emailFormik.touched.currentEmail && !!emailFormik.errors.currentEmail}
              />
              <Form.Control.Feedback type="invalid">
                {emailFormik.errors.currentEmail}
              </Form.Control.Feedback>
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Control
                type="email"
                placeholder="New Email"
                name="newEmail"
                value={emailFormik.values.newEmail}
                onChange={emailFormik.handleChange}
                onBlur={emailFormik.handleBlur}
                isInvalid={emailFormik.touched.newEmail && !!emailFormik.errors.newEmail}
              />
              <Form.Control.Feedback type="invalid">
                {emailFormik.errors.newEmail}
              </Form.Control.Feedback>
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Control
                type="email"
                placeholder="Repeat New Email"
                name="repeatNewEmail"
                value={emailFormik.values.repeatNewEmail}
                onChange={emailFormik.handleChange}
                onBlur={emailFormik.handleBlur}
                isInvalid={emailFormik.touched.repeatNewEmail && !!emailFormik.errors.repeatNewEmail}
              />
              <Form.Control.Feedback type="invalid">
                {emailFormik.errors.repeatNewEmail}
              </Form.Control.Feedback>
            </Form.Group>
            
            <Button variant='dark' type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Processing...' : 'Change Email'}
            </Button>
          </Form>
        </div>
      </section>

      {/* OTP Verification Modal */}
      <Modal show={showOtpModal} onHide={() => setShowOtpModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Verify Your Email</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>We've sent an 6-digit OTP to your new email address. Please enter it below:</p>
          
          <Form onSubmit={otpFormik.handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Enter OTP"
                name="otp"
                value={otpFormik.values.otp}
                onChange={otpFormik.handleChange}
                onBlur={otpFormik.handleBlur}
                isInvalid={otpFormik.touched.otp && !!otpFormik.errors.otp}
                maxLength={8}
              />
              <Form.Control.Feedback type="invalid">
                {otpFormik.errors.otp}
              </Form.Control.Feedback>
            </Form.Group>
            
            <Button variant="dark" type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Verifying...' : 'Verify OTP'}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default DashboardChangeMail;