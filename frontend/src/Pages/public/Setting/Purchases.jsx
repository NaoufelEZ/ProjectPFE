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
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [seenOrders, setSeenOrders] = useState({});

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
        console.error(err)
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [token]);
  useEffect(() => {
    axios.put(`${APIURL}/order/update/check`, {}, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        "x-api-key": ApiKey,
      }
    })
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
  const calculateTotalPrice = (items) => {
  if (!items) return 0;
  return items.reduce((total, item) => total + (item.price * item.quantity), 0);
};
console.log(orders)

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
        ) : orders.length === 0 ? (
          <div className="empty-state">
            <p>No orders found</p>
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
                      <td>{calculateTotalPrice(order.order_items).toFixed(2)} TND</td>
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
                            {order.order_items?.map((item) => (
                              <div key={item.id} className="order-item">
                                <span>{item.product_stock.product?.title}</span>
                                <span>{item.quantity} × {item.price.toFixed(2)} TND</span>
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
