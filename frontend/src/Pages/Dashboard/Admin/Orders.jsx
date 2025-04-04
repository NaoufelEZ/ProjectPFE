import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Table, Badge, Button, Pagination, Form, Dropdown, InputGroup } from 'react-bootstrap';
import { FaEye, FaTruck, FaCheck, FaTimes } from 'react-icons/fa';
import { ApiKey, APIURL } from '../../../Api/Api';
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';


const Orders = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [orders,setOrders] = useState([]);
  const [ordersFilter,setOrdersFilter] = useState([]);
  const [orderSelected,setOrderSelected] = useState("");
  const itemsPerPage = 6;

  const cookie = new Cookies();
  const token = cookie.get("auth");
  const navigate = useNavigate();

  useEffect(()=>{
    axios.get(`${APIURL}/orders`,{
      headers:{
        Accept:"Application/json",
        Authorization:`Bearer ${token}`,
        "x-api-key":ApiKey,
      }
    }).then((response)=>{setOrders(response.data.data);setOrdersFilter(response.data.data)

    }).catch((err)=>console.log(err))
  },[]);

  useEffect(()=>{
    setOrdersFilter(orders.filter((element)=>element.status === orderSelected));
  },[orderSelected])
  // Mock orders data

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

  const getActionButtons = (status) => {
    switch (status) {
      case 'Pending':
        return (
          <>
            <Button variant="outline-primary" size="sm" className="me-1" title="Process Order">
              <FaCheck />
            </Button>
            <Button variant="outline-danger" size="sm" title="Cancel Order">
              <FaTimes />
            </Button>
          </>
        );
      case 'Processing':
        return (
          <Button variant="outline-info" size="sm" title="Mark as Shipped">
            <FaTruck />
          </Button>
        );
      case 'Shipped':
        return (
          <Button variant="outline-success" size="sm" title="Mark as Delivered">
            <FaCheck />
          </Button>
        );
      default:
        return (
          <Button variant="outline-secondary" size="sm" title="View Details">
            <FaEye />
          </Button>
        );
    }
  };
  const handleChecked = async (id) => {

    await axios.put(`${APIURL}/order/checked/${id}`, {
    }, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        "x-api-key": ApiKey,
      }
    })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching order:", error);
      });
  }


  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = ordersFilter.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(ordersFilter.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);


  return (
    <>
    <Helmet>
      <title>Orders | Nalouti Dashboard</title>
    </Helmet>
    <div className="w-100 p-2">
    <div className="d-flex justify-content-between align-items-center">
      <span className="fw-bold h5">Order Management</span>
      <Form.Select onChange={(e)=>setOrderSelected(e.target.value)} className="w-25">
        <option value="" selected disabled>All Orders</option>
        <option value="Pending">Pending</option>
        <option value="Cancelled">Cancelled</option>
        <option value="Processing">Processing</option>
        <option value="Shipped">Shipped</option>
        <option value="Delivered">Delivered</option>
        <option value="Return">Return</option>
      </Form.Select>
    </div>
    <hr/>
      <div className="table-responsive">
        <Table hover>
          <thead>
            <tr>
              <th></th>
              <th>Ref</th>
              <th>Customer</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.length > 0 ? currentItems.map((order,index) => (
              <tr key={index}>
                <td><InputGroup.Checkbox className="bg-white"/></td>
                <td>ORD-{order.id}</td>
                <td>{order.user.first_name + " " + order.user.last_name}</td>
                <td>{order.order_date.split(" ")[0]}</td>
                <td>{getStatusBadge(order.status)}</td>
                <td onClick={(id)=>{navigate(`${order.id}`);handleChecked(id)}}><FaEye role='button' color="green" size={20} /></td>
              </tr>
            ))
            :
            <tr>
              <td className="text-center" colSpan={6}>Order Not Found</td>
            </tr>
            }
          </tbody>
        </Table>
      </div>

      <div className="d-flex justify-content-between align-items-center mt-3">
        <div>
          Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, ordersFilter.length)} of {ordersFilter.length} orders
        </div>
        <Pagination>
          <Pagination.First
            onClick={() => paginate(1)}
            disabled={currentPage === 1}
          />
          <Pagination.Prev
            onClick={() => paginate(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
          />

          {[...Array(totalPages).keys()].map(number => (
            <Pagination.Item
              key={number + 1}
              active={number + 1 === currentPage}
              onClick={() => paginate(number + 1)}
            >
              {number + 1}
            </Pagination.Item>
          ))}

          <Pagination.Next
            onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
          />
          <Pagination.Last
            onClick={() => paginate(totalPages)}
            disabled={currentPage === totalPages}
          />
        </Pagination>
      </div>
    </div>
    </>
  );
};

export default Orders;
