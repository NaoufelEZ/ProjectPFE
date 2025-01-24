import { Button, Form } from "react-bootstrap"

const Password = () => {
  return (
    <div>
      <Form>
    <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>Old Password</Form.Label>
      <Form.Control  name='email'  type="password" placeholder="Enter Old Password" />
    </Form.Group>
    <Form.Group className="mb-3" controlId="formBasicPassword">
      <Form.Label>New Password</Form.Label>
      <Form.Control  name='password'  type="password" placeholder="Entre New Password" />
    </Form.Group>
    <Button variant="primary" type="submit">
      Submit
    </Button>
  </Form>
    </div>
  )
}

export default Password