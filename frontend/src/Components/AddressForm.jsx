import axios from 'axios';
import { useFormik } from 'formik';
import { Form, Button, Card } from 'react-bootstrap';
import * as Yup from "yup";
import { ApiKey, APIURL } from '../Api/Api';
import Cookies from 'universal-cookie';
import { GrMapLocation } from "react-icons/gr";

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
      try {
        await axios.post(
          `${APIURL}/address/add`,
          {
            address: values.address,
            state: values.state,
            street: values.street,
            zip: values.zip,
          },
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
              "x-api-key": ApiKey,
            },
          }
        );
        window.location.reload();
      } catch (error) {
        console.log(error);
      }
    },
  });

  const getLocation = () => {
    window.navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        const apiKey = '82c330a163bc47bbadcedf2dd82ad069';
        const url = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`;

        try {
          const response = await axios(url);
          const country = response.data.results[0].components;
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
  };

  return (
    <Card className="p-4 shadow-sm rounded-4">
      <Card.Header as="h5" className="border-bottom mb-4 text-center">
        Add New Address
      </Card.Header>

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

        <Form.Group className="mb-4">
          <Form.Check
            type="checkbox"
            label="Set as default address"
            name="is_default"
            checked={formik.values.is_default}
            onChange={formik.handleChange}
          />
        </Form.Group>

        {/* Buttons */}
        <div className="d-flex justify-content-center gap-3">
        <Button
            variant="outline-dark"
            className="d-flex align-items-center gap-2 px-3 rounded-pill"
            onClick={getLocation}
            type="button"
          >
            <GrMapLocation size={20} />
            Locate me
          </Button>
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
  );
};

export default AddressForm;
