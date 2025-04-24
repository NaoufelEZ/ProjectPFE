import axios from "axios";
import { useState } from "react";
import { Button, Form, Card, Alert, Container } from "react-bootstrap";
import { ApiKey, APIURL } from "../../Api/Api";
import Loading from "../../Components/Loading";
import { useNavigate } from "react-router-dom";
import { BsEnvelope } from "react-icons/bs";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const nav = useNavigate();

  const handleSend = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    try {
      const res = await axios.post(
        `${APIURL}/password/seed`,
        { email: email },
        {
          headers: {
            Accept: "application/json",
            "x-api-key": ApiKey,
          },
        }
      );
      setSuccess(true);
      nav(`/password/verify/${res.data.token}`);
    } catch (err) {
      setError(true);
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f0f4ff, #e1e5f9)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      {!loading ? (
        <Container style={{ maxWidth: "500px" }}>
          <Card className="w-100 shadow-lg border-0 rounded-4 p-4" style={{ background: "#ffffffcc", backdropFilter: "blur(10px)" }}>
            <Card.Body>
              <div className="text-center mb-4">
                <BsEnvelope size={48} className="text-primary mb-3" />
                <h2 className="fw-bold text-dark">Forgot Your Password?</h2>
                <p className="text-muted">
                  Enter your email address and we'll send you a link to reset your password.
                </p>
              </div>

              {error && (
                <Alert variant="danger" className="text-center">
                  Email is incorrect or not registered
                </Alert>
              )}

              {success && (
                <Alert variant="success" className="text-center">
                  Password reset link has been sent to your email!
                </Alert>
              )}

              <Form onSubmit={handleSend}>
                <Form.Group className="mb-4">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter your email"
                    className="rounded-pill px-4 py-2 shadow-sm"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    required
                  />
                </Form.Group>

                <Button
                  variant="primary"
                  type="submit"
                  className="w-100 mb-3 rounded-pill shadow-sm"
                  size="lg"
                  disabled={!email}
                >
                  Send Reset Link
                </Button>

                <div className="text-center mt-3">
                  <a href="/login" className="text-decoration-none text-primary fw-semibold">
                    ⬅ Back to Login
                  </a>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Container>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default ForgetPassword;
