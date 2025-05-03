import { Button, Form, Card, Container, Row, Col } from 'react-bootstrap';
import { ApiKey, APIURL, IMAGEURL } from '../../../Api/Api';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { Helmet } from "react-helmet-async";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { IoClose, IoArrowBack } from 'react-icons/io5';

const categorySchema = Yup.object().shape({
  category: Yup.string().required("Category Is Required"),
  subcategory: Yup.string()
    .matches(/^[a-zA-Z]+$/, "Category should be alphabetic")
    .min(3, "Category should at least be 3 characters")
    .required("Subcategory required"),
});

const Subcategory = () => {
  const [subcategorySelected, setSubcategorySelected] = useState([]);
  const [category, setCategory] = useState([]);
  const [isOn, setIsOn] = useState(false);

  const { subId } = useParams();
  const cookie = new Cookies();
  const token = cookie.get("auth");
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${APIURL}/category`, {
      headers: {
        Accept: "application/json",
        "x-api-key": ApiKey,
      },
    }).then((response) => setCategory(response.data.data));
  }, [subId]);

  useEffect(() => {
    axios.get(`${APIURL}/admin/subcategory/${subId}`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        "x-api-key": ApiKey,
      },
    }).then((response) => setSubcategorySelected(response.data.data))
      .catch((err) => console.log(err));
  }, [subId]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      subcategory: subcategorySelected?.subcategories || "",
      category: subcategorySelected?.category_id || "",
      subcategory_image: null,
    },
    validationSchema: categorySchema,
    onSubmit: async (value) => {
      const formData = new FormData();
      formData.append("category_id", value.category);
      formData.append("subcategories", value.subcategory);
      if (value.subcategory_image) {
        formData.append("subcategories_image", value.subcategory_image);
      }
      try {
        await axios.post(`${APIURL}/admin/subcategory/update/${subId}`, formData, {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
            "x-api-key": ApiKey,
          },
        });
        navigate("/dashboard/subcategory");
      } catch (err) {
        console.log(err);
      }
    }
  });

  return (
    <>
      <Helmet>
        <title>Edit Subcategory | Nalouti Dashboard</title>
      </Helmet>

      <Container fluid className="py-4">
        <Button
          variant="outline-secondary"
          onClick={() => navigate("/dashboard/subcategories")}
          className="mb-3 d-flex align-items-center"
        >
          <IoArrowBack className="me-2" /> Back to List
        </Button>

        <Card className="shadow-sm">
          <Card.Header className="bg-white py-3">
            <h5 className="mb-0 fw-bold">Edit Subcategory</h5>
          </Card.Header>

          <Card.Body>
            <Form onSubmit={formik.handleSubmit}>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Category <span className="text-danger">*</span></Form.Label>
                    <Form.Select
                      name='category'
                      value={formik.values.category}
                      onChange={formik.handleChange}
                      isInvalid={formik.touched.category && !!formik.errors.category}
                      isValid={formik.touched.category && !formik.errors.category}
                    >
                      <option value="" disabled>Select Category</option>
                      {category.map((item) => (
                        <option key={item.id} value={item.id}>{item.category}</option>
                      ))}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      {formik.errors.category}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Subcategory <span className="text-danger">*</span></Form.Label>
                    <Form.Control
                      name='subcategory'
                      value={formik.values.subcategory}
                      onChange={formik.handleChange}
                      isInvalid={formik.touched.subcategory && !!formik.errors.subcategory}
                      isValid={formik.touched.subcategory && !formik.errors.subcategory}
                      placeholder='Enter subcategory'
                    />
                    <Form.Control.Feedback type="invalid">
                      {formik.errors.subcategory}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>

                <Col md={12}>
                  <Form.Group className="mb-4">
                    <Form.Label>Subcategory Image</Form.Label>
                    {subcategorySelected?.subcategories_image ? (
                      <div
                        role='button'
                        onMouseEnter={() => setIsOn(true)}
                        onMouseLeave={() => setIsOn(false)}
                        className="position-relative border rounded p-2"
                        style={{ width: "100%", maxWidth: "400px" }}
                      >
                        <img
                          className="img-fluid rounded"
                          src={`${IMAGEURL}/categories/${subcategorySelected.subcategories_image}`}
                          alt='subcategory_image'
                        />
                        {isOn && (
                          <div
                            onClick={() => setSubcategorySelected(prev => ({ ...prev, subcategories_image: null }))}
                            className="w-100 h-100 bg-dark position-absolute top-0 start-0 opacity-75 d-flex justify-content-center align-items-center"
                            style={{ borderRadius: '0.25rem' }}
                          >
                            <IoClose size={40} color="white" />
                          </div>
                        )}
                      </div>
                    ) : (
                      <>
                        <Form.Control
                          name="subcategory_image"
                          type="file"
                          onChange={(event) => {
                            formik.setFieldValue("subcategory_image", event.currentTarget.files[0]);
                          }}
                          isInvalid={formik.touched.subcategory_image && !!formik.errors.subcategory_image}
                          isValid={formik.touched.subcategory_image && !formik.errors.subcategory_image}
                        />
                        <Form.Text className="text-muted">
                          Upload a subcategory image (JPEG, PNG)
                        </Form.Text>
                      </>
                    )}
                  </Form.Group>
                </Col>
              </Row>

              <div className="d-flex justify-content-end mt-3">
                <Button variant="primary" type="submit" className="px-4 py-2">
                  Save Changes
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default Subcategory;
