import { useFormik } from "formik";
import { Button, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "universal-cookie";
import * as Yup from "yup";
import { ApiKey, APIURL } from "../../../Api/Api";
import axios from "axios";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import "./User.css";

const AddUserSchema = Yup.object().shape({
  first_name: Yup.string()
    .matches(/^[a-zA-Z]+$/, "Only letters are allowed")
    .min(3, "Minimum 3 characters")
    .required("First Name is required"),
  last_name: Yup.string()
    .matches(/^[a-zA-Z]+$/, "Only letters are allowed")
    .min(3, "Minimum 3 characters")
    .required("Last Name is required"),
  email: Yup.string()
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/,
      "Invalid email address"
    )
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Minimum 6 characters")
    .required("Password is required"),
  role: Yup.string()
    .oneOf(["Admin", "Product Manager"], "Select a valid role")
    .required("Role is required"),
  phone: Yup.string()
    .matches(/^\d{8}$/, "Must be 8 digits")
    .required("Phone number is required"),
});

const User = () => {
  const [error, setError] = useState(false);
  const [user, setUser] = useState({});
  const nav = useNavigate();
  const cookie = new Cookies();
  const token = cookie.get("auth");
  const { userId } = useParams();

  useEffect(() => {
    axios
      .get(`${APIURL}/admin/user/${userId}`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
          "x-api-key": ApiKey,
        },
      })
      .then((response) => setUser(response.data.data))
      .catch((err) => console.log(err));
  }, [userId]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      first_name: user?.first_name || "",
      last_name: user?.last_name || "",
      email: user?.email || "",
      password: "",
      role: user?.role || "",
      phone: user?.phone || "",
    },
    validationSchema: AddUserSchema,
    onSubmit: async (value) => {
      try {
        await axios.post(
          `${APIURL}/admin/user/add`,
          {
            first_name: value.first_name,
            last_name: value.last_name,
            email: value.email,
            phone: value.phone,
            password: value.password,
            role: value.role,
          },
          {
            headers: {
              Accept: "application/json",
              "x-api-key": ApiKey,
              Authorization: `Bearer ${token}`,
            },
          }
        );
        nav("/dashboard/users");
      } catch (error) {
        setError(true);
      }
    },
  });

  return (
    <>
      <Helmet>
        <title>Update User | Nalouti Store</title>
      </Helmet>
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card shadow-lg border-0 rounded-4 p-4 user-form-card">
              <h3 className="mb-4 fw-semibold text-center">
                👤 Edit User Profile
              </h3>
              <Form onSubmit={formik.handleSubmit}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <Form.Group>
                      <Form.Label>First Name</Form.Label>
                      <Form.Control
                        name="first_name"
                        onChange={formik.handleChange}
                        value={formik.values.first_name}
                        type="text"
                        className={`form-control ${
                          formik.touched.first_name && formik.errors.first_name
                            ? "is-invalid"
                            : ""
                        }`}
                      />
                      <div className="invalid-feedback">
                        {formik.errors.first_name}
                      </div>
                    </Form.Group>
                  </div>
                  <div className="col-md-6">
                    <Form.Group>
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control
                        name="last_name"
                        onChange={formik.handleChange}
                        value={formik.values.last_name}
                        type="text"
                        className={`form-control ${
                          formik.touched.last_name && formik.errors.last_name
                            ? "is-invalid"
                            : ""
                        }`}
                      />
                      <div className="invalid-feedback">
                        {formik.errors.last_name}
                      </div>
                    </Form.Group>
                  </div>

                  <div className="col-md-12">
                    <Form.Group>
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        name="email"
                        onChange={formik.handleChange}
                        value={formik.values.email}
                        type="email"
                        className={`form-control ${
                          formik.touched.email && formik.errors.email
                            ? "is-invalid"
                            : ""
                        }`}
                      />
                      <div className="invalid-feedback">
                        {formik.errors.email}
                      </div>
                    </Form.Group>
                  </div>

                  <div className="col-md-12">
                    <Form.Group>
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        name="password"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        type="password"
                        className={`form-control ${
                          formik.touched.password && formik.errors.password
                            ? "is-invalid"
                            : ""
                        }`}
                      />
                      <div className="invalid-feedback">
                        {formik.errors.password}
                      </div>
                    </Form.Group>
                  </div>

                  <div className="col-md-6">
                    <Form.Group>
                      <Form.Label>Role</Form.Label>
                      <Form.Select
                        name="role"
                        onChange={formik.handleChange}
                        value={formik.values.role}
                        className={`form-select ${
                          formik.touched.role && formik.errors.role
                            ? "is-invalid"
                            : ""
                        }`}
                      >
                        <option disabled value="">
                          Select Role
                        </option>
                        <option value="Admin">Admin</option>
                        <option value="Product Manager">Product Manager</option>
                      </Form.Select>
                      <div className="invalid-feedback">
                        {formik.errors.role}
                      </div>
                    </Form.Group>
                  </div>

                  <div className="col-md-6">
                    <Form.Group>
                      <Form.Label>Phone</Form.Label>
                      <Form.Control
                        name="phone"
                        onChange={formik.handleChange}
                        value={formik.values.phone}
                        type="text"
                        className={`form-control ${
                          formik.touched.phone && formik.errors.phone
                            ? "is-invalid"
                            : ""
                        }`}
                      />
                      <div className="invalid-feedback">
                        {formik.errors.phone}
                      </div>
                    </Form.Group>
                  </div>
                </div>

                <div className="mt-4">
                  <Button variant="primary" type="submit" className="w-100 py-2">
                    💾 Save Changes
                  </Button>
                </div>
                {error && (
                  <div className="text-danger text-center mt-3">
                    ⚠️ Email already exists.
                  </div>
                )}
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default User;
