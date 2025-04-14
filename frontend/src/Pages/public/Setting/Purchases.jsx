import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { ApiKey, APIURL } from '../../../Api/Api';
import { Badge } from 'react-bootstrap';

const Purchases = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const cookie = new Cookies();
  const token = cookie.get("auth");

  useEffect(() => {
    axios.get(`${APIURL}/user/order`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        "x-api-key": ApiKey,
      }
    })
    .then((res) => {
      setOrders(res.data.data);
      setError("");
    })
    .catch((err) => {
      console.error(err);
      setError("No orders found or an error occurred.");
    })
    .finally(() => setLoading(false));
  }, [token]);

  const getStatus = (status) => {
      switch (status) {
        case "Delivered":
          return <Badge bg="success" className="fs-6 p-2">Delivered</Badge>;
        case "Shipped":
          return <Badge bg="info" className="fs-6 p-2">Shipped</Badge>;
        case "Processing":
          return <Badge bg="primary" className="fs-6 p-2">Processing</Badge>;
        case "Pending":
          return <Badge bg="warning" text="dark" className="fs-6 p-2">Pending</Badge>;
        case "Cancelled":
          return <Badge bg="danger" className="fs-6 p-2">Cancelled</Badge>;
        default:
          return <Badge bg="secondary" className="fs-6 p-2">{status}</Badge>;
      }
    };

  return (
    <>
      <Helmet>
        <title>My Purchases | Nalouti Store</title>
      </Helmet>
      <div className="w-50 mt-4">
        <h3>My Purchases</h3>
        {loading ? (
          <p>Loading your orders...</p>
        ) : error ? (
          <p className="text-danger">{error}</p>
        ) : (
          <div className="d-flex w-100 border border-1 p-2 rounded-2">
            {orders.map(order => (
              <>
              <div key={order.id}>
                <strong>Order #{order.id}</strong> - Total: {order.total_price ?? 'N/A'} TND
              </div>
              <div className="d-flex justify-content-end w-50 align-items-center ">
                <strong>Status:</strong>{getStatus(order.status)}
              </div>
              </>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Purchases;
