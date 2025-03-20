import React from 'react'
import { Button, Form } from 'react-bootstrap'
import { Helmet } from 'react-helmet-async'

const Profile = () => {
  return (
    <>
    <Helmet>
      <title>Personal Details|Nalouti Store</title>
    </Helmet>
    <section className="w-50">
      <h3>Personal details</h3>
      <Form>
        <Form.Group className="d-flex gap-2 mb-4">
          <Form.Control className="p-2" placeholder="First Name" type="text" />
          <Form.Control className="p-2" placeholder="Last Name" />
        </Form.Group>
        <Form.Group className="w-50 mb-4">
          <Form.Control className="p-2" placeholder="Phone Number" type="text" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Button variant="dark" className="p-3">Save</Button>
        </Form.Group>
      </Form>
    </section>
    </>
  )
}

export default Profile