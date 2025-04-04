import axios from "axios";
import { useState } from "react";
import { Button, Form, Card, Container, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { ApiKey } from "../../Api/Api";
import Loading from "../../Components/Loading";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const cookie = new Cookies();
  const nav = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios
        .post(
          "http://127.0.0.1:8000/api/v1/login",
          { email, password },
          {
            headers: {
              Accept: "application/json",
              "x-api-key": ApiKey,
            },
          }
        )
        cookie.set("auth", res.data.token);
        res.data.data.role === "admin" || res.data.data.role === "Product Manager"? nav("/dashboard") : nav("/");
    } catch (err) {
      setError(true);
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
          <Row className="w-100 justify-content-center">
            <Col md={6} lg={4}>
              <Card className="shadow-lg p-4">
                <Card.Body>
                  <h3 className="text-center mb-4">Login</h3>
                  <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Email address</Form.Label>
                      <Form.Control
                        onChange={(e) => setEmail(e.target.value)}
                        name="email"
                        value={email}
                        type="email"
                        placeholder="Enter email"
                        required
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        onChange={(e) => setPassword(e.target.value)}
                        name="password"
                        value={password}
                        type="password"
                        placeholder="Password"
                        required
                      />
                    </Form.Group>
                    <Form.Group className="d-flex justify-content-between align-items-center">
                      <Link to={"/forget_password"} className="text-decoration-none">
                        Forgot Password?
                      </Link>
                      <Button variant="primary" type="submit">
                        Login
                      </Button>
                    </Form.Group>
                  </Form>

                  {error && <div className="mt-3 p-2 bg-danger text-white rounded">Email or Password are Wrong</div>}

                  <div className="text-center mt-3">
                    <span>Don't have an account? </span>
                    <Link to={"/register"} className="fw-bold text-primary text-decoration-none">
                      Sign Up
                    </Link>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
};

export default Login;
