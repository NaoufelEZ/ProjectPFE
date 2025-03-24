import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Button, Form } from 'react-bootstrap'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'

const AccountChangePassword = () => {
  return (
    <>
      <Helmet>
        <title>Change Password | Nalouti Store</title>
      </Helmet>
    <section className="w-50">
      <div>
        <Link className="text-muted" to="/setting/personal-details">
        <FontAwesomeIcon className="h6 me-2 mb-0" icon={faArrowLeft}/>
        <span className="h6">
          Back to Personal Details
        </span>
        </Link>
      </div>
      <div className="w-100">
        <h3 className="my-3">Change Password</h3>
        <Form>
          <Form.Group className="mb-3">
            <Form.Control type="text" placeholder="Current Password" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control type="text" placeholder="New Password" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control type="text" placeholder="Repeat New Password" />
          </Form.Group>
          <Button variant='dark'>Change Password</Button>
        </Form>
      </div>
    </section>
    </>

  )
}

export default AccountChangePassword