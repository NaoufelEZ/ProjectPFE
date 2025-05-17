import axios from 'axios';
import { useFormik } from 'formik';
import { Form, Button, Card } from 'react-bootstrap';
import * as Yup from "yup";
import { ApiKey, APIURL } from '../Api/Api';
import Cookies from 'universal-cookie';
import { useEffect, useState } from 'react';
import dataTun from "../Assets/TunisianLocation/data.json";

const addressSchema = Yup.object().shape({
  address: Yup.string().required("Address is required"),
  state: Yup.string().required("State is required"),
  street: Yup.string().required("Street is required"),
  city: Yup.string().required("Street is city"),
  zip: Yup.string()
    .matches(/^\d{4}$/, "Zip should be exactly 4 digits")
    .required("Zip is required"),
});

const AddressForm = ({ onClose,addressAdd }) => {
  const [gov, setGov] = useState([]); 
    const [data, setData] = useState([]); 
    const [cite, setCite] = useState([]); 
    const [deleg, setDeleg] = useState([]); 
  const cookie = new Cookies();
  const token = cookie.get("auth");

  const formik = useFormik({
    initialValues: {
      address: "",
      state: "",
      street: "",
      city: "",
      zip: "",
      is_default: false,
    },
    validationSchema: addressSchema,
    onSubmit: async (values) => {
      try {
        await axios.post(
          `${APIURL}/address/add`,
          {
            address: values.address,
            state: values.state,
            street: values.street,
            city: values.city,
            zip: values.zip,
            is_default: values.is_default,
          },
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
              "x-api-key": ApiKey,
            },
          }
        );
        onClose(true);
        addressAdd(prev => prev + 1);
      } catch (error) {
        console.log(error);
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
      }, [formik.values.state,data]);
  
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
      }, [formik.values.state,formik.values.street,data]);
  
      useEffect(() => {
          if (formik.values.city) {
              const zip = data.filter((e) => e.Gov === formik.values.state && e.Deleg === formik.values.street && e.Cite === formik.values.city);
              formik.setFieldValue("zip",zip[0]?.zip)
          }
      }, [formik.values.city,formik.values.zip,data,formik]);

  
  // const getLocation = () => {
  //   window.navigator.geolocation.getCurrentPosition(
  //     async (position) => {
  //       const { latitude, longitude } = position.coords;
  //       const apiKey = '82c330a163bc47bbadcedf2dd82ad069';
  //       const url = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`;

  //       try {
  //         const response = await axios(url);
  //         const country = response.data.results[0].components;
  //         formik.setFieldValue("state", country.state);
  //         formik.setFieldValue("street", country.road);
  //         formik.setFieldValue("zip", country.postcode);
  //       } catch (error) {
  //         console.error("Error during reverse geocoding:", error);
  //       }
  //     },
  //     (error) => {
  //       console.error("Error getting location:", error.message);
  //     }
  //   );
  // };

  return (
    <>
    <Card className="p-4 shadow-sm rounded-4">
      <Card.Header as="h5" className="border-bottom mb-4 text-center">
        Add New Address
      </Card.Header>

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
        <div className="d-flex gap-3">
          <Button
            variant="outline-secondary"
            className="rounded-2 d-flex align-items-center justify-content-center"
            style={{ width: "85px",height: "50px" }}
            onClick={onClose}
            type="button"
          >
            Cancel
          </Button>

          <Button
            variant="dark"
            className="rounded-2 d-flex align-items-center justify-content-center"
            style={{ width: "85px",height: "50px" }}
            type="submit"
          >
            Save
          </Button>

         
        </div>
      </Form>
    </Card>
    </>
  );
};

export default AddressForm;
