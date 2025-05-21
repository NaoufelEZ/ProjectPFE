import { useEffect, useState } from "react";
import dataTun from "../../../Assets/TunisianLocation/data.json";
import { Button, Form } from "react-bootstrap";
import { ApiKey, APIURL } from "../../../Api/Api";
import axios from "axios";
import Cookies from "universal-cookie";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Helmet } from "react-helmet-async";
import * as Yup from "yup";
import { useFormik } from "formik";
const addressSchema = Yup.object().shape({
  address: Yup.string().required("Address is required"),
  state: Yup.string().required("State is required"),
  street: Yup.string().required("Street is required"),
  city: Yup.string().required("Street is city"),
  zip: Yup.string()
    .matches(/^\d{4}$/, "Zip should be exactly 4 digits")
    .required("Zip is required"),
});

const Address = () => {
   const [gov, setGov] = useState([]); 
    const [data, setData] = useState([]); 
    const [cite, setCite] = useState([]); 
    const [deleg, setDeleg] = useState([]);
    const [currentAddress,setCurrentAddress] = useState([]);
    const cookie = new Cookies();
    const token = cookie.get("auth");
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(()=>{
        axios.get(`${APIURL}/address/${id}`,
            {
                headers:{
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`,
                    "x-api-key": ApiKey,
                }
            }
        ).then((response)=>setCurrentAddress(response.data.data)
        ).catch((error)=>console.error(error))
    },[id])

    const formik = useFormik({
        enableReinitialize:true,
        initialValues: {
          address: currentAddress.address || "",
          state: currentAddress.state || "",
          street: currentAddress.street || "",
          city: currentAddress.city || "",
          zip: currentAddress.zip || "",
          is_default : currentAddress.is_default || false
        },
        validationSchema: addressSchema,
        onSubmit: async (values) => {
          try {
            await axios.put(
              `${APIURL}/address/update/${id}`,values,
              {
                headers: {
                  Accept: "application/json",
                  Authorization: `Bearer ${token}`,
                  "x-api-key": ApiKey,
                },
              }
            );
            navigate("/setting/saved-addresses")
          } catch (error) {
            console.error(error);
          }
        },
      });
 useEffect(() => {
          setGov([...new Set(dataTun.map((e) => e.Gov))]); 
          setData(dataTun);
      }, []);
  
      useEffect(() => {
          if (formik.values.state) {
              setDeleg([
                  ...new Set(
                      data
                          .filter((e) => e.Gov === formik.values.state) 
                          .map((e) => e.Deleg) 
                  ),
              ]);
          } else {
              setDeleg([]); 
          }
      }, [formik.values.state]);
  
      useEffect(() => {
          if (formik.values.street) {
              setCite([
                  ...new Set(
                      data
                          .filter((e) => e.Gov === formik.values.state && e.Deleg === formik.values.street)
                          .map((e) => e.Cite) 
                  ),
              ]);
          } else {
              setCite([]); 
          }
      }, [formik.values.state,formik.values.street]);
  
      useEffect(() => {
          if (formik.values.city) {
              const zip = data.filter((e) => e.Gov === formik.values.state && e.Deleg === formik.values.street && e.Cite === formik.values.city);
              formik.setFieldValue("zip",zip[0]?.zip)
          }
      }, [formik.values.city,formik.values.zip]);

  return (
        <>
        <Helmet>
            <title>Add Address | Nalouti Store</title>
        </Helmet>
        <section  className="w-50">
            <div className="mb-3">
            <Link className="text-muted" to="/setting/saved-addresses">
            <FontAwesomeIcon className="h6 me-2 mb-0" icon={faArrowLeft}/>
            <span className="h6">
            Back to Saved Addresses
            </span>
            </Link>
        </div>
            <Form onSubmit={formik.handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>State</Form.Label>
          <Form.Select name='state' value={formik.values.state}  onChange={formik.handleChange}>
              <option value="" disabled selected>Select Governorate</option>
                {gov.map((e, key) => (
                  <option key={key} value={e}>
                    {e}
                  </option>
                 ))}
          </Form.Select>
          <Form.Control.Feedback type="invalid">
            {formik.errors.state}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Street</Form.Label>
        <Form.Select name='street' value={formik.values.street}  onChange={formik.handleChange} disabled={!formik.values.state}>
                <option value="" disabled selected>
                    Select Delegation
                </option>
                {deleg.map((e, key) => (
                    <option key={key} value={e}>
                        {e}
                    </option>
                ))}
              </Form.Select>
          <Form.Control.Feedback type="invalid">
            {formik.errors.street}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>City</Form.Label>
          <Form.Select name='city' value={formik.values.city}  onChange={formik.handleChange} disabled={!formik.values.street}>
              <option value="" disabled selected>Select City</option>
                {cite.map((e, key) => (
                  <option key={key} value={e}>
                    {e}
                  </option>
                 ))}
          </Form.Select>
          <Form.Control.Feedback type="invalid">
            {formik.errors.state}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>ZIP Code</Form.Label>
          <Form.Control
          disabled={!formik.values.city}
            type="text"
            name="zip"
            value={formik.values.zip}
            isInvalid={formik.touched.zip && !!formik.errors.zip}
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.zip}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            name="address"
            value={formik.values.address}
            onChange={formik.handleChange}
            isInvalid={formik.touched.address && !!formik.errors.address}
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.address}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Check
            type="checkbox"
            label="Set as default address"
            name="is_default"
            checked={formik.values.is_default}
            onChange={(e) => formik.setFieldValue("is_default", e.target.checked)}
          />
        </Form.Group>

        {/* Buttons */}
          <Button
            variant="dark"
            className="rounded-2 d-flex align-items-center justify-content-center"
            type="submit"
          >
            Save
          </Button>
      </Form>
        </section>
        </>
    );
};
export default Address;
