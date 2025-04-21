import { Button, Form, Card, Container, Row, Col, Spinner } from 'react-bootstrap';
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
    subcategory: Yup.string().required("Subcategory required"),
    category_details: Yup.string()
        .matches(/^[a-zA-Z]+$/, "Category should be alphabetic")
        .min(3, "Category should at less be 3 characters")
        .required("Category Details required"),
});

const Detail = () => {
    const [category, setCategory] = useState([]);
    const [subcategory, setSubcategory] = useState([]);
    const [CategoryDetails, setCategoryDetails] = useState([]);
    const [isOn, setIsOn] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const cookie = new Cookies();
    const token = cookie.get("auth");
    const { delId } = useParams();
    
    useEffect(() => {
        setIsLoading(true);
        axios.get(`${APIURL}/admin/category-details/${delId}`, {
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
                "x-api-key": ApiKey,
            }
        }).then((response) => {
            setCategoryDetails(response.data.data);
            setIsLoading(false);
        }).catch(() => setIsLoading(false));
    }, [delId]);

    useEffect(() => {
        axios.get(`${APIURL}/category`, {
            headers: {
                Accept: "application/json",
                "x-api-key": ApiKey,
            }
        }).then((response) => setCategory(response.data.data))
    }, [delId])

    const navigate = useNavigate();

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            category: CategoryDetails?.category_id || "",
            subcategory: CategoryDetails?.subcategory_id || "",
            category_details: CategoryDetails?.categoryDetails || "",
            category_details_image: null,
            existingImage: CategoryDetails?.category_details_image || "",
        },
        validationSchema: categorySchema,
        context: { CategoryDetails },
        onSubmit: async (value) => {
            setIsLoading(true);
            const formData = new FormData();
            formData.append("category_id", value.category);
            formData.append("subcategory_id", value.subcategory);
            formData.append("categoryDetails", value.category_details);
            if (value.category_details_image) {
                formData.append("category_details_image", value.category_details_image);
            }
            try {
                await axios.post(`${APIURL}/admin/category-details/update/${delId}`, formData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "x-api-key": ApiKey,
                    }
                });
                navigate("/dashboard/category-details")
            } catch (err) {
                console.log(err)
            } finally {
                setIsLoading(false);
            }
        }
    });

    useEffect(() => {
        if (formik.values.category) {
            axios.get(`${APIURL}/admin/category/${formik.values.category}/subcategory`, {
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`,
                    "x-api-key": ApiKey,
                }
            }).then((response) => setSubcategory(response.data.data))
        }
    }, [formik.values.category])

    return (
        <>
            <Helmet>
                <title>{delId ? 'Edit' : 'Add'} Category Details | Nalouti Dashboard</title>
            </Helmet>
            
            <Container fluid className="py-4">
                <Button 
                    variant="outline-secondary" 
                    onClick={() => navigate("/dashboard/category-details")}
                    className="mb-3 d-flex align-items-center"
                >
                    <IoArrowBack className="me-2" /> Back to List
                </Button>
                
                <Card className="shadow-sm">
                    <Card.Header className="bg-white py-3">
                        <h5 className="mb-0 fw-bold">
                            {delId ? 'Edit' : 'Add'} Category Details
                        </h5>
                    </Card.Header>
                    
                    <Card.Body>
                        {isLoading ? (
                            <div className="text-center py-5">
                                <Spinner animation="border" variant="primary" />
                                <p className="mt-2">Loading category details...</p>
                            </div>
                        ) : (
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
                                                {category?.map((item) => (
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
                                            <Form.Select 
                                                name='subcategory' 
                                                value={formik.values.subcategory} 
                                                onChange={formik.handleChange} 
                                                isInvalid={formik.touched.subcategory && !!formik.errors.subcategory} 
                                                isValid={formik.touched.subcategory && !formik.errors.subcategory}
                                            >
                                                <option value="" disabled>Select Subcategory</option>
                                                {subcategory?.filter((element) => element.subcategories !== "New")
                                                    .map((item) => (
                                                        <option key={item.id} value={item.id}>{item.subcategories}</option>
                                                    ))
                                                }
                                            </Form.Select>
                                            <Form.Control.Feedback type="invalid">
                                                {formik.errors.subcategory}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                    
                                    <Col md={12}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Category Details <span className="text-danger">*</span></Form.Label>
                                            <Form.Control 
                                                name='category_details' 
                                                value={formik.values.category_details} 
                                                onChange={formik.handleChange}  
                                                isInvalid={formik.touched.category_details && !!formik.errors.category_details} 
                                                isValid={formik.touched.category_details && !formik.errors.category_details}   
                                                placeholder='Enter category details'
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {formik.errors.category_details}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                    
                                    <Col md={12}>
                                        <Form.Group className="mb-4">
                                            <Form.Label>Category Details Image</Form.Label>
                                            {CategoryDetails?.category_details_image ? (
                                                <div 
                                                    role='button' 
                                                    onMouseEnter={() => setIsOn(true)} 
                                                    onMouseLeave={() => setIsOn(false)} 
                                                    className="position-relative border rounded p-2"
                                                    style={{ width: "100%", maxWidth: "400px" }}
                                                >
                                                    <img 
                                                        className="img-fluid rounded" 
                                                        src={`${IMAGEURL}/categories/${CategoryDetails.category_details_image}`} 
                                                        alt='category_details_image'
                                                    />
                                                    {isOn && (
                                                        <div 
                                                            onClick={() => setCategoryDetails(prev => ({ ...prev, category_details_image: null }))} 
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
                                                        name="category_details_image" 
                                                        type="file"  
                                                        onChange={(event) => {
                                                            formik.setFieldValue("category_details_image", event.currentTarget.files[0]);
                                                        }} 
                                                        isInvalid={formik.touched.category_details_image && !!formik.errors.category_details_image} 
                                                        isValid={formik.touched.category_details_image && !formik.errors.category_details_image}
                                                    />
                                                    <Form.Text className="text-muted">
                                                        Upload an image for this category detail (JPEG, PNG)
                                                    </Form.Text>
                                                </>
                                            )}
                                        </Form.Group>
                                    </Col>
                                </Row>
                                
                                <div className="d-flex justify-content-end mt-3">
                                    <Button 
                                        variant="primary" 
                                        type="submit" 
                                        className="px-4 py-2"
                                        disabled={isLoading}
                                    >
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

export default Detail;