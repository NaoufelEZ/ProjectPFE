import { Button, Form, Card, Container, Spinner } from 'react-bootstrap';
import { ApiKey, APIURL } from '../../../Api/Api';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { Helmet } from "react-helmet-async";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import {  useState } from 'react';
import { IoArrowBack } from 'react-icons/io5';

const categorySchema = Yup.object().shape({
  category: Yup.string()
    .matches(/^[a-zA-Z]+$/, "Category should be alphabetic")
    .min(3, "Category should at least be 3 characters")
    .required("Category required"),
});

const Category = () => {
  const [isLoading, setIsLoading] = useState(false);

  const cookie = new Cookies();
  const token = cookie.get("auth");
  const navigate = useNavigate();


  const formik = useFormik({
    initialValues:{
        category : "",
    },
    validationSchema:categorySchema,
    onSubmit: async (value)=>{
        setIsLoading(true);
        try{
        await axios.post(`${APIURL}/admin/category/add`,
            {
                category:value.category,
            },
            {
            headers:{
                Accept: "application/json",
                Authorization:`Bearer ${token}`,
                "x-api-key":ApiKey,
            }
        });
        navigate("/dashboard/categories")
        }catch(err){
            console.log(err)
        }finally{
            setIsLoading(false);
        }
    }
  });

  return (
    <>
      <Helmet>
        <title>Add Category | Nalouti Dashboard</title>
      </Helmet>

      <Container fluid className="py-4">
        <Button 
          variant="outline-secondary" 
          onClick={() => navigate("/dashboard/Categories")}
          className="mb-3 d-flex align-items-center"
        >
          <IoArrowBack className="me-2" /> Back to List
        </Button>

        <Card className="shadow-sm">
          <Card.Header className="bg-white py-3">
            <h5 className="mb-0 fw-bold">Edit Category</h5>
          </Card.Header>

          <Card.Body>
            {isLoading ? (
              <div className="text-center py-5">
                <Spinner animation="border" variant="primary" />
                <p className="mt-2">Loading category...</p>
              </div>
            ) : (
              <Form onSubmit={formik.handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Category <span className="text-danger">*</span></Form.Label>
                  <Form.Control 
                    name="category" 
                    value={formik.values.category} 
                    onChange={formik.handleChange}
                    isInvalid={formik.touched.category && !!formik.errors.category}
                    isValid={formik.touched.category && !formik.errors.category}
                    placeholder="Enter category name"
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.category}
                  </Form.Control.Feedback>
                </Form.Group>

                <div className="d-flex justify-content-end mt-3">
                  <Button type="submit" variant="primary" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" className="me-2" />
                        Saving...
                      </>
                    ) : 'Save Changes'}
                  </Button>
                </div>
              </Form>
            )}
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default Category;
