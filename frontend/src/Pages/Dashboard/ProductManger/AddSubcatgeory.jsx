import { Button, Form, Card, Container, Row, Col } from 'react-bootstrap';
import { ApiKey, APIURL } from '../../../Api/Api';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { Helmet } from "react-helmet-async";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { IoArrowBack } from 'react-icons/io5';

const categorySchema = Yup.object().shape({
    category:Yup.string().required("Category Is Required"),
    subcategory:Yup.string().matches(/^[a-zA-Z]+$/, "Category should be alphabetic").min(3,"Category should at less be 3 characters").required("Subcategory required"),
    subcategory_image:Yup.mixed()
    .required("Subcategory Image required")
    .test("fileType", "Only images (JPG, PNG, MP4) are allowed", (value) => {
        return value && ["image/jpeg", "image/png" , "video/mp4"].includes(value.type);
      })
});

const AddSubcategory  = () => {
  const [category, setCategory] = useState([]);

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
  }, []);


  const formik = useFormik({
    initialValues: {
      subcategory: "",
      category:  "",
      subcategory_image: null,
    },
    validationSchema: categorySchema,
    onSubmit: async (value)=>{
        const formData = new FormData();
        formData.append("category_id", value.category);
        formData.append("subcategories", value.subcategory);
        formData.append("subcategories_image", value.subcategory_image);
        try{
            await axios.post(`${APIURL}/admin/subcategory/add`,formData,
                {
                headers:{
                    Accept: "application/json",
                    Authorization:`Bearer ${token}`,
                    "x-api-key":ApiKey,
                }
            });
            navigate("/dashboard/subcategories")
            }catch(err){
                console.log(err)
            }
    }
  });

  return (
    <>
      <Helmet>
        <title>Add Subcategory | Nalouti Dashboard</title>
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

export default AddSubcategory ;
