import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { ApiKey, APIURL } from '../../../Api/Api';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom';
import { FaHouseChimney, FaPen, FaPlus } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { Card, Button, Container, Spinner, Alert } from 'react-bootstrap';
import Swal from 'sweetalert2';
import './SavedAddresses.css'; // New CSS file for custom styles

const SavedAddresses = () => {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const cookie = new Cookies();
  const token = cookie.get("auth");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await axios.get(`${APIURL}/address`, {
          headers: {
            Accept: "application/json",
            "x-api-key": ApiKey,
            Authorization: `Bearer ${token}`,
          },
        });
        setAddresses(response.data.data);
      } catch (err) {
        setError("Failed to load addresses. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchAddresses();
  }, [token]);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Delete Address?",
      text: "This action cannot be undone",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc3545",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      reverseButtons: true
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`${APIURL}/address/delete/${id}`, {
          headers: {
            Accept: "application/json",
            "x-api-key": ApiKey,
            Authorization: `Bearer ${token}`,
          },
        });
        setAddresses(addresses.filter(address => address.id !== id));
        Swal.fire("Deleted!", "Your address has been removed.", "success");
      } catch (err) {
        Swal.fire("Error", "Failed to delete address.", "error");
      }
    }
  };

  const handleModify = (id) => {
    navigate(`${id}`);
  };

  const handleAddNew = () => {
    navigate('/setting/address');
  };

  return (
    <>
      <Helmet>
        <title>Saved Addresses | Nalouti Store</title>
      </Helmet>
      
      <Container className="addresses-container">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3 className="mb-0">Saved Addresses</h3>
          <Button 
            variant="dark" 
            onClick={handleAddNew}
            className="add-address-btn"
          >
            <FaPlus className="me-2" /> Add New Address
          </Button>
        </div>

        {loading ? (
          <div className="text-center py-5">
            <Spinner animation="border" />
            <p className="mt-3">Loading your addresses...</p>
          </div>
        ) : error ? (
          <Alert variant="danger" className="text-center">
            {error}
          </Alert>
        ) : addresses.length === 0 ? (
          <Card className="empty-state text-center py-5">
            <Card.Body>
              <p className="mb-4">You haven't saved any addresses yet.</p>
              <Button 
                variant="dark" 
                onClick={handleAddNew}
                size="lg"
              >
                <FaPlus className="me-2" /> Add Your First Address
              </Button>
            </Card.Body>
          </Card>
        ) : (
          <div className="address-grid">
            {addresses.map((address, index) => (
              <Card key={address.id} className="address-card">
                <Card.Body>
                  <div className="d-flex align-items-center mb-3">
                    <FaHouseChimney className="address-icon me-2" />
                    <h5 className="mb-0">Address {index + 1}</h5>
                  </div>
                  
                  <div className="address-details">
                    <p><strong>Street:</strong> {address.street}</p>
                    <p><strong>City:</strong> {address.city || 'N/A'}</p>
                    <p><strong>State:</strong> {address.state}</p>
                    <p><strong>ZIP Code:</strong> {address.zip}</p>
                    <p><strong>Address:</strong> {address.address || 'N/A'}</p>
                    {address.country && <p><strong>Country:</strong> {address.country}</p>}
                  </div>

                  <div className="d-flex justify-content-between mt-4">
                    <Button 
                      variant="outline-primary" 
                      onClick={() => handleModify(address.id)}
                      className="action-btn"
                    >
                      <FaPen className="me-1" /> Edit
                    </Button>
                    <Button 
                      variant="outline-danger" 
                      onClick={() => handleDelete(address.id)}
                      className="action-btn"
                    >
                      <MdDelete className="me-1" /> Delete
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            ))}
          </div>
        )}
      </Container>
    </>
  );
};

export default SavedAddresses;