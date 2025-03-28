import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { ApiKey, APIURL } from '../../../Api/Api';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { Link, Navigate } from 'react-router-dom';

const SavedAddresses = () => {
  const [addresses, setAddresses] = useState([]);
  const [error, setError] = useState(false);
  const cookie = new Cookies();
  const token = cookie.get("auth");

  useEffect(() => {
    axios
      .get(`${APIURL}/address`, {
        headers: {
          Accept: "application/json",
          "x-api-key": ApiKey,
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setAddresses(response.data.data);
      })
      .catch(() => setError(true));
  }, [token]);

  // Function to delete an address
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${APIURL}/address/delete/${id}`, {
        headers: {
          Accept: "application/json",
          "x-api-key": ApiKey,
          Authorization: `Bearer ${token}`,
        },
      });
    window.location.reload();
    } catch (error) {
      console.error("Error deleting address:", error);
    }
  };

  // Function to modify an address (redirecting to a form)
  const handleModify = (id) => {
    window.location.href = `/edit-address/${id}`;
  };

  return (
    <>
      <Helmet>
        <title>Saved Addresses | Nalouti Store</title>
      </Helmet>
      <section className="w-50 mx-auto">
        <h3>Saved Addresses</h3>
        <div className="d-flex flex-column align-items-center mt-3">
          {error || addresses.length === 0 ? (
            <div>
              <span>There are no saved addresses.</span>
              <div className="mt-4 d-flex justify-content-center">
                <Link
                  to="/setting/address"
                  role="button"
                  className="p-3 bg-black text-white rounded-3 text-center"
                >
                  <span>Add Address</span>
                </Link>
              </div>
            </div>
          ) : (
            <ul className="list-group w-100">
              {addresses.map((address, index) => (
                <li key={address.id} className="list-group-item d-flex flex-column">
                  <h5 className="mb-2">🏠 Address {index + 1}</h5>
                  <p className="mb-1"><strong>Street:</strong> {address.street}</p>
                  <p className="mb-1"><strong>State:</strong> {address.state}</p>
                  <p className="mb-1"><strong>ZIP Code:</strong> {address.zip}</p>
                  
                  <div className="d-flex justify-content-between mt-2">
                    <button 
                      className="btn btn-warning me-2" 
                      onClick={() => handleModify(address.id)}
                    >
                      ✏ Modify
                    </button>
                    <button 
                      className="btn btn-danger" 
                      onClick={() => handleDelete(address.id)}
                    >
                      ❌ Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </>
  );
};

export default SavedAddresses;
