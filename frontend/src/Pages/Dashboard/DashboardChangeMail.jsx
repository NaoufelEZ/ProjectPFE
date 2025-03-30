import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import { Button, Form } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

const DashboardChangeMail = () => {
  return (
    <>
      <Helmet>
        <title>Change Email | Nalouti Dashboard</title>
      </Helmet>
    <section className="w-50">
      <div>
        <Link className="text-muted" to="/dashboard/setting">
        <FontAwesomeIcon className="h6 me-2 mb-0" icon={faArrowLeft}/>
        <span className="h6">
          Back to Personal Details
        </span>
        </Link>
      </div>
      <div className="w-100">
        <h3 className="my-3">Change Email</h3>
        <Form>
          <Form.Group className="mb-3">
            <Form.Control type="text" placeholder="Current Email" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control type="text" placeholder="New Email" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control type="text" placeholder="Repeat New Email" />
          </Form.Group>
          <Button variant='dark'>Change Email</Button>
        </Form>
      </div>
    </section>
    </>

  )
}

export default DashboardChangeMail;