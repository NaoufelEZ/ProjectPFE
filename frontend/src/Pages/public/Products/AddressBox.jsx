import { useEffect, useRef, useState } from "react";
import dataTun from "../../../Assets/TunisianLocation/data.json";
import { Button, Form } from "react-bootstrap";
import { ApiKey, APIURL } from "../../../Api/Api";
import axios from "axios";
import Cookies from "universal-cookie";
import useCloseOut from "../../../Hooks/useClose";

const AddressBox = ({ setOpen, onAddressAdded }) => {
  const [gov, setGov] = useState([]);
  const [data, setData] = useState([]);
  const [cite, setCite] = useState([]);
  const [deleg, setDeleg] = useState([]);
  const [selectedGov, setSelectedGov] = useState("");
  const [selectedDeleg, setSelectedDeleg] = useState("");
  const [selectedCite, setSelectedCite] = useState("");
  const [zip, setZip] = useState("");
  const [address, setAddress] = useState("");
  const popupRef = useRef(null);
  const cookie = new Cookies();
  const token = cookie.get("auth");

  // Load initial data
  useEffect(() => {
    setGov([...new Set(dataTun.map((e) => e.Gov))]);
    setData(dataTun);
  }, []);

  // Update delegations when governorate changes
  useEffect(() => {
    if (selectedGov) {
      const filteredDelegations = data
        .filter((e) => e.Gov === selectedGov)
        .map((e) => e.Deleg);
      setDeleg([...new Set(filteredDelegations)]);
      setSelectedDeleg(""); // Reset delegation when governorate changes
      setSelectedCite(""); // Reset cite when governorate changes
      setZip(""); // Reset zip when governorate changes
    } else {
      setDeleg([]);
    }
  }, [selectedGov, data]);

  // Update cites when delegation changes
  useEffect(() => {
    if (selectedDeleg) {
      const filteredCities = data
        .filter((e) => e.Gov === selectedGov && e.Deleg === selectedDeleg)
        .map((e) => e.Cite);
      setCite([...new Set(filteredCities)]);
      setSelectedCite(""); // Reset cite when delegation changes
      setZip(""); // Reset zip when delegation changes
    } else {
      setCite([]);
    }
  }, [selectedDeleg, selectedGov, data]);

  // Update zip when cite changes
  useEffect(() => {
    if (selectedCite) {
      const foundZip = data.find(
        (e) =>
          e.Gov === selectedGov &&
          e.Deleg === selectedDeleg &&
          e.Cite === selectedCite
      );
      setZip(foundZip?.zip || "");
    }
  }, [selectedCite, selectedGov, selectedDeleg, data]);

  const handleAddAddress = async (e) => {
    e.preventDefault();
    if (!address || !selectedGov || !selectedDeleg || !selectedCite) {
      alert("Please fill all address fields");
      return;
    }

    try {
      const response = await axios.post(
        `${APIURL}/address/add`,
        {
          address,
          state: selectedGov,
          zip: zip,
          street: selectedCite,
        },
        {
          headers: {
            Accept: "application/json",
            "x-api-key": ApiKey,
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (onAddressAdded) {
        onAddressAdded(response.data.data);
      }
      setOpen(false);
    } catch (err) {
      console.error("Error adding address:", err);
      alert("Failed to add address. Please try again.");
    }
  };

  useCloseOut(popupRef, () => setOpen(false));

  return (
    <div
      ref={popupRef}
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        background: "#fff",
        padding: "2rem",
        borderRadius: "10px",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
        zIndex: 1000,
        width: "90%",
        maxWidth: "500px",
      }}
    >
      <h5 className="mb-3">Add Address</h5>
      <Form onSubmit={handleAddAddress}>
        <Form.Group className="mb-3">
          <Form.Label>Address</Form.Label>
          <Form.Control
            placeholder="Enter your street address"
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Governorate</Form.Label>
          <Form.Select 
            value={selectedGov}
            onChange={(e) => setSelectedGov(e.target.value)}
            required
          >
            <option value="">Select Governorate</option>
            {gov.map((e, key) => (
              <option key={key} value={e}>
                {e}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Delegation</Form.Label>
          <Form.Select
            value={selectedDeleg}
            onChange={(e) => setSelectedDeleg(e.target.value)}
            disabled={!selectedGov}
            required
          >
            <option value="">Select Delegation</option>
            {deleg.map((e, key) => (
              <option key={key} value={e}>
                {e}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>City</Form.Label>
          <Form.Select
            value={selectedCite}
            onChange={(e) => setSelectedCite(e.target.value)}
            disabled={!selectedDeleg}
            required
          >
            <option value="">Select City</option>
            {cite.map((e, key) => (
              <option key={key} value={e}>
                {e}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Zip Code</Form.Label>
          <Form.Control
            placeholder="Zip Code"
            type="text"
            value={zip}
            readOnly
          />
        </Form.Group>

        <div className="d-flex gap-2">
          <Button variant="primary" type="submit" className="w-100">
            Add Address
          </Button>
          <Button
            variant="secondary"
            className="w-100"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default AddressBox;