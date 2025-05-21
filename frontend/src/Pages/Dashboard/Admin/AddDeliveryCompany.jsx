import axios from "axios";
import { useFormik } from "formik";
import { Button, Form } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import * as Yup from "yup";
import { ApiKey, APIURL } from "../../../Api/Api";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
const DeliverySchema = Yup.object().shape({
    name:Yup.string()
    .min(3,"Name of Company Should Be At Less 3 characters")
    .required("Name Company Are Required"),
    address:Yup.string()
    .min(10,"The Address of Company Should Be At Less 10 characters")
    .required("Name Company Are Required"),
    phone:Yup.string()
    .matches(/^\d{8}$/, "Phone should be exactly 8 digits")
    .required("Phone Of Company Are Required"),
    email: Yup.string()
    .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/, "Invalid email address")
    .required("Email is required"),
    fee:Yup.number()
    .typeError("Fee should be a valid number")
    .max(99, "Fee must be less than 1000")
    .required("Fee of Company is required"),
    duration:Yup.string()
    .matches(/^\d{1,2}$/,"Duration Should Be Number")
    .required("Duration Of Company Are Required"),
});

const AddDeliveryCompany = () => {
    const cookie = new Cookies();
    const token = cookie.get("auth");
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues:{
            name:"",
            address:"",
            email:"",
            phone:"",
            fee:"",
            duration:""
        },
        validationSchema:DeliverySchema,
        onSubmit: async (values)=>{
            await axios.post(`${APIURL}/delivery-company/add`,{
                "name":values.name,
                "address":values.address,
                "phone":values.phone,
                "mail":values.email,
                "fee":values.fee,
                "duration":values.duration,
                },
                {
                headers:{
                    Accept:"Application/json",
                    Authorization:`Bearer ${token}`,
                    "x-api-key":ApiKey,
                }
            });
            navigate("/dashboard/delivery-company");
        }
    })
  return (
    <>
    <Helmet>
        <title>Add Delivery Company|Nalouti dashboard</title>
    </Helmet>
    <div className="w-100 p-4">
    <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">Delivery Company</h2>
        <Button variant="outline-secondary" onClick={() => navigate("/dashboard/Delivery-company")}>
          Go back
        </Button>
      </div>
        <hr/>
        <Form onSubmit={formik.handleSubmit}>
            <Form.Group className="mb-3">
                <Form.Label>Name Of Company</Form.Label>
                <Form.Control name="name" value={formik.values.name} onChange={formik.handleChange} isInvalid={formik.touched.name && formik.errors.name} isValid={formik.touched.name && !formik.errors.name} />
                <Form.Control.Feedback type="invalid">{formik.errors.name}</Form.Control.Feedback>
                <Form.Control.Feedback type="valid">Look Good</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Address Of Company</Form.Label>
                <Form.Control name="address" value={formik.values.address}  onChange={formik.handleChange} isInvalid={formik.touched.address && formik.errors.address} isValid={formik.touched.address && !formik.errors.address} />
                <Form.Control.Feedback type="invalid">{formik.errors.address}</Form.Control.Feedback>
                <Form.Control.Feedback type="valid">Look Good</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Email Of Company</Form.Label>
                <Form.Control name="email" value={formik.values.email}  onChange={formik.handleChange} isInvalid={formik.touched.email && formik.errors.email} isValid={formik.touched.email && !formik.errors.email}/>
                <Form.Control.Feedback type="invalid">{formik.errors.email}</Form.Control.Feedback>
                <Form.Control.Feedback type="valid">Look Good</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Phone Of Company</Form.Label>
                <Form.Control name="phone" value={formik.values.phone}  onChange={formik.handleChange} isInvalid={formik.touched.phone && formik.errors.phone} isValid={formik.touched.phone && !formik.errors.phone} />
                <Form.Control.Feedback type="invalid">{formik.errors.phone}</Form.Control.Feedback>
                <Form.Control.Feedback type="valid">Look Good</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Fee Of Company(TND)</Form.Label>
                <Form.Control name="fee" value={formik.values.fee}  onChange={formik.handleChange} isInvalid={formik.touched.fee && formik.errors.fee} isValid={formik.touched.fee && !formik.errors.fee} />
                <Form.Control.Feedback type="invalid">{formik.errors.fee}</Form.Control.Feedback>
                <Form.Control.Feedback type="valid">Look Good</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Duration Of Company(By Day)</Form.Label>
                <Form.Control name="duration" value={formik.values.duration}  onChange={formik.handleChange} isInvalid={formik.touched.duration && formik.errors.duration} isValid={formik.touched.duration && !formik.errors.duration}/>
                <Form.Control.Feedback type="invalid">{formik.errors.duration}</Form.Control.Feedback>
                <Form.Control.Feedback type="valid">Look Good</Form.Control.Feedback>
            </Form.Group>
            <Button className="p-3 w-25" type="submit">Add</Button>
        </Form>
    </div>
    </>
  )
}

export default AddDeliveryCompany