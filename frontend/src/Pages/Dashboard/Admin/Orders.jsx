import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Table, Badge, Button, Pagination, Form } from 'react-bootstrap';
import { FaEye } from 'react-icons/fa';
import { ApiKey, APIURL } from '../../../Api/Api';
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const Orders = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [orders, setOrders] = useState([]);
  const [ordersFilter, setOrdersFilter] = useState([]);
  const [orderSelected, setOrderSelected] = useState("");
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  const itemsPerPage = 6;
  const cookie = new Cookies();
  const token = cookie.get("auth");
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${APIURL}/orders`, {
      headers: {
        Accept: "Application/json",
        Authorization: `Bearer ${token}`,
        "x-api-key": ApiKey,
      }
    }).then((response) => {
      setOrders(response.data.data);
      setOrdersFilter(response.data.data);
    }).catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    setOrdersFilter(
      orderSelected
        ? orders.filter((element) => element.status === orderSelected)
        : orders
    );
    setSelectedOrders([]); // reset on filter change
    setSelectAll(false);
  }, [orderSelected, orders]);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Delivered':
        return <Badge bg="success">Delivered</Badge>;
      case 'Shipped':
        return <Badge bg="info">Shipped</Badge>;
      case 'Processing':
        return <Badge bg="primary">Processing</Badge>;
      case 'Pending':
        return <Badge bg="warning" text="dark">Pending</Badge>;
      case 'Cancelled':
        return <Badge bg="danger">Cancelled</Badge>;
      default:
        return <Badge bg="secondary">{status}</Badge>;
    }
  };

  const handleChecked = async (id) => {
    try {
      await axios.put(`${APIURL}/order/checked/${id}`, {}, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
          "x-api-key": ApiKey,
        }
      });
      navigate(`${id}`);
    } catch (err) {
      console.log(err);
    }
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = ordersFilter.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(ordersFilter.length / itemsPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    setSelectAll(false);
    setSelectedOrders([]);
  };

  // Checkbox logic
  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedOrders([]);
    } else {
      const allIds = currentItems.map((order) => order.id);
      setSelectedOrders(allIds);
    }
    setSelectAll(!selectAll);
  };

  const handleCheckboxChange = (orderId) => {
    if (selectedOrders.includes(orderId)) {
      setSelectedOrders(selectedOrders.filter(id => id !== orderId));
    } else {
      setSelectedOrders([...selectedOrders, orderId]);
    }
  };

  return (
    <>
      <Helmet>
        <title>Orders | Nalouti Dashboard</title>
      </Helmet>

      <div className="w-100 p-2">
        <div className="d-flex justify-content-between align-items-center">
          <span className="fw-bold h5">Order Management</span>
          <Form.Select onChange={(e) => setOrderSelected(e.target.value)} className="w-25">
            <option value="" selected disabled>All Orders</option>
            <option value="Pending">Pending</option>
            <option value="Cancelled">Cancelled</option>
            <option value="Processing">Processing</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
            <option value="Return">Return</option>
          </Form.Select>
        </div>

        <hr />

        <div className="table-responsive">
          <Table hover>
            <thead>
              <tr>
                <th>
                  <Form.Check
                    type="checkbox"
                    checked={selectAll}
                    onChange={handleSelectAll}
                  />
                </th>
                <th>Ref</th>
                <th>Customer</th>
                <th>Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {currentItems.length > 0 ? currentItems.map((order, index) => (
                <tr key={index}>
                  <td>
                    <Form.Check
                      type="checkbox"
                      checked={selectedOrders.includes(order.id)}
                      onChange={() => handleCheckboxChange(order.id)}
                    />
                  </td>
                  <td>ORD-{order.id}</td>
                  <td>{order.user.first_name + " " + order.user.last_name}</td>
                  <td>{order.order_date.split(" ")[0]}</td>
                  <td>{getStatusBadge(order.status)}</td>
                  <td>
                    <FaEye role="button" color="green" size={20} onClick={() => handleChecked(order.id)} />
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={6} className="text-center">No orders found</td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>

        <div className="d-flex justify-content-between align-items-center mt-3">
          <div>
            Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, ordersFilter.length)} of {ordersFilter.length} orders
          </div>
          <Pagination>
            <Pagination.First onClick={() => paginate(1)} disabled={currentPage === 1} />
            <Pagination.Prev onClick={() => paginate(Math.max(1, currentPage - 1))} disabled={currentPage === 1} />
            {[...Array(totalPages).keys()].map(number => (
              <Pagination.Item
                key={number + 1}
                active={number + 1 === currentPage}
                onClick={() => paginate(number + 1)}
              >
                {number + 1}
              </Pagination.Item>
            ))}
            <Pagination.Next onClick={() => paginate(Math.min(totalPages, currentPage + 1))} disabled={currentPage === totalPages} />
            <Pagination.Last onClick={() => paginate(totalPages)} disabled={currentPage === totalPages} />
          </Pagination>
        </div>
      </div>
    </>
  );
};

export default Orders;
