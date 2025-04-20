import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { 
  Badge, 
  Table, 
  Spinner, 
  Button,
  Container
} from 'react-bootstrap';
import { ApiKey, APIURL } from '../../../Api/Api';
import './Purchases.css';

const Purchases = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [seenOrders, setSeenOrders] = useState({}); // <-- new state
  console.log(seenOrders)

  const cookie = new Cookies();
  const token = cookie.get("auth");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${APIURL}/user/order`, {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
            "x-api-key": ApiKey,
          }
        });
        const ordersData = response.data.data;
        setOrders(ordersData);

        // Check for seen status for each order
        const seenStatus = {};
        await Promise.all(
          ordersData.map(async (order) => {
            try {
              const check = await axios.get(`${APIURL}/order/check/${order.id}`, {
                headers: {
                  Accept: "application/json",
                  Authorization: `Bearer ${token}`,
                  "x-api-key": ApiKey,
                }
              });
              seenStatus[order.id] = check.data.data === true;
            } catch (err) {
              seenStatus[order.id] = false;
            }
          })
        );
        setSeenOrders(seenStatus);
      } catch (err) {
        setError("Failed to load orders. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [token]);

  const getStatusColor = (status) => {
    const statusColors = {
      Delivered: "success",
      Shipped: "primary",
      Processing: "warning",
      Pending: "secondary",
      Cancelled: "danger"
    };
    return statusColors[status] || "dark";
  };

  const toggleOrderDetails = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  return (
    <>
      <Helmet>
        <title>My Purchases | Nalouti Store</title>
      </Helmet>

      <Container className="purchases-container">
        <h3 className="purchases-title">Order History</h3>
        
        {loading ? (
          <div className="text-center py-5">
            <Spinner animation="border" />
            <p className="mt-2">Loading your orders...</p>
          </div>
        ) : error ? (
          <div className="alert alert-danger">{error}</div>
        ) : orders.length === 0 ? (
          <div className="empty-state">
            <p>No orders found</p>
            <Button href="/products">Start Shopping</Button>
          </div>
        ) : (
          <div className="table-responsive">
            <Table striped hover className="purchases-table">
              <thead>
                <tr>
                  <th>Order #</th>
                  <th>Date</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Actions</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <React.Fragment key={order.id}>
                    <tr>
                      <td>#{order.id}</td>
                      <td>{new Date(order.order_date).toLocaleDateString()}</td>
                      <td>{order.total_price} TND</td>
                      <td>
                        <Badge 
                          pill 
                          bg={getStatusColor(order.status)}
                          className="status-badge"
                        >
                          {order.status}
                        </Badge>
                      </td>
                      <td>
                        <Button
                          variant="outline-primary"
                          size="sm"
                          onClick={() => toggleOrderDetails(order.id)}
                        >
                          {expandedOrder === order.id ? 'Hide' : 'View'}
                        </Button>
                      </td>
                      <td className="align-middle">
                        {seenOrders[order.id] && (
                          <div
                            style={{ width: "10px", height: "10px" }}
                            className="bg-danger rounded-circle"
                          ></div>
                        )}
                      </td>
                    </tr>
                    {expandedOrder === order.id && (
                      <tr className="order-details">
                        <td colSpan="6">
                          <div className="details-content">
                            <h6>Order Items:</h6>
                            {order.items?.map((item) => (
                              <div key={item.id} className="order-item">
                                <span>{item.name}</span>
                                <span>{item.quantity} × {item.price} TND</span>
                              </div>
                            ))}
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </Table>
          </div>
        )}
      </Container>
    </>
  );
};

export default Purchases;
