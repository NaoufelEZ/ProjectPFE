import axios from 'axios';
import { useFormik } from 'formik';
import { Form, Button, Card } from 'react-bootstrap';
import * as Yup from "yup";
import { ApiKey, APIURL } from '../Api/Api';
import Cookies from 'universal-cookie';

const addressSchema = Yup.object().shape({
  address: Yup.string().required("Address is required"),
  state: Yup.string().required("State is required"),
  street: Yup.string().required("Street is required"),
  zip: Yup.string()
    .matches(/^\d{4}$/, "Zip should be exactly 4 digits")
    .required("Zip is required"),
});

const AddressForm = ({ onClose }) => {
  const cookie = new Cookies();
  const token = cookie.get("auth");
  const formik = useFormik({
    initialValues: {
      address: "",
      state: "",
      street: "",
      zip: "",
      is_default: false,
    },
    validationSchema: addressSchema,
    onSubmit: async (values) => {
      axios.post(`${APIURL}/address/add`,{
        address:values.address,
        state:values.state,
        street:values.street,
        zip:values.zip,
      },
      {
        headers:{
          Accept:"application/json",
          Authorization: `Bearer ${token}`,
          "x-api-key":ApiKey,
        }
      }).then(()=>{window.location.reload()}
    ).catch((err)=>console.log(err))
    },
  });
  const getLocation = () => {
    window.navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        console.log("Latitude:", latitude);
        console.log("Longitude:", longitude);
        const apiKey = '82c330a163bc47bbadcedf2dd82ad069'; 
        const url = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`;
    
        try {
          const response = await axios(url);
          const country = response.data.results[0].components;
          console.log(response.data.results);
          formik.setFieldValue("state", country.state);
          formik.setFieldValue("street", country.road);
          formik.setFieldValue("zip", country.postcode);
        } catch (error) {
          console.error("Error during reverse geocoding:", error);
        }
      },
      (error) => {
        console.error("Error getting location:", error.message);
      }
    );
    }

  return (
    <Card className="p-4">
      <Card.Header as="h5" className="border-bottom mb-3 pb-2">Add New Address</Card.Header>
      <Form onSubmit={formik.handleSubmit}>
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

        <Form.Group className="mb-3">
          <Form.Label>State</Form.Label>
          <Form.Control
            type="text"
            name="state"
            value={formik.values.state}
            onChange={formik.handleChange}
            isInvalid={formik.touched.state && !!formik.errors.state}
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.state}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Street</Form.Label>
          <Form.Control
            type="text"
            name="street"
            value={formik.values.street}
            onChange={formik.handleChange}
            isInvalid={formik.touched.street && !!formik.errors.street}
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.street}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>ZIP Code</Form.Label>
          <Form.Control
            type="text"
            name="zip"
            value={formik.values.zip}
            onChange={formik.handleChange}
            isInvalid={formik.touched.zip && !!formik.errors.zip}
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.zip}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Check
            type="checkbox"
            label="Set as default address"
            name="is_default"
            checked={formik.values.is_default}
            onChange={formik.handleChange}
          />
        </Form.Group>

        <div className="d-flex justify-content-end mt-4">
          <Button variant="outline-secondary" className="me-2" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="dark">
            Save Address
          </Button>
        </div>
      </Form>
        <Button onClick={getLocation} type="submit" variant="dark">
            where i am
          </Button>
    </Card>
  );
};

export default AddressForm;
