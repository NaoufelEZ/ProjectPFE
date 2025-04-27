import * as Yup from "yup";
import { Container, Card, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "axios";
import { Form, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().min(6, "At least 6 characters").required("Password is required"),
  });

  const handleLogin = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post("http://localhost:8000/api/login", values);
      const { token, user } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      toast.success("Welcome back, handsome 🖤", { autoClose: 2000 });
      navigate("/dashboard");
    } catch (err) {
      toast.error("Wrong email or password ❌", { autoClose: 3000 });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container className="d-flex align-items-center justify-content-center" style={{ height: "100vh" }}>
      <Card className="p-4 shadow" style={{ width: "400px", borderRadius: "1rem" }}>
        <h3 className="text-center mb-4 fw-bold">Log In</h3>
        <Form initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleLogin}>
            <Form.Control name="email" type="email" label="Email" placeholder="Enter your email" />
            <Form.Control name="password" type="password" label="Password" placeholder="Enter your password" />

              <button type="submit" className="btn btn-dark w-100 mt-3">

              </button>
            </Form>

      </Card>
    </Container>
  );
}

export default Login2;
