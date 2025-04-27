import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form } from "react-bootstrap";
import { FcGoogle } from "react-icons/fc";

const Login2 = ({ setLogin }) => {
  return (
    <div className="basket-content">
      <div className="basket-header px-4 pt-4 pb-3">
        {/* Close Button */}
        <div className="text-end">
          <FontAwesomeIcon
            icon={faClose}
            onClick={() => setLogin(false)}
            className="text-secondary fs-5 cursor-pointer"
          />
        </div>

        {/* Title */}
        <h4 className="text-center fw-bold mb-4">
          Log in or create an account
        </h4>

        {/* Google Button */}
        <button className="btn btn-light w-100 border border-secondary-subtle shadow-sm d-flex align-items-center justify-content-center gap-2 py-2 mb-3 rounded-3 google-hover">
          <FcGoogle size={20} />
          <span className="fw-medium text-dark">Continue with Google</span>
        </button>

        <div className="text-center text-muted small mb-3">or</div>

        {/* Login Form */}
        <Form>
          <Form.Group className="mb-3">
            <Form.Control
              type="email"
              placeholder="Email address"
              className="py-2"
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Control
              type="password"
              placeholder="Password"
              className="py-2"
            />
          </Form.Group>

          <div className="d-flex justify-content-between align-items-center mb-3">
            <Form.Check type="checkbox" label="Continue session" />
            <a
              href="#"
              className="small text-decoration-none text-muted"
            >
              Forgot your password?
            </a>
          </div>

          <button
            type="submit"
            className="btn btn-dark w-100 py-2 rounded-3 fw-semibold"
          >
            LOG IN
          </button>
        </Form>

        <div className="text-center mt-3 small">
          Don’t have an account?{" "}
          <a href="#" className="fw-bold text-decoration-none">
            Register
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login2;
