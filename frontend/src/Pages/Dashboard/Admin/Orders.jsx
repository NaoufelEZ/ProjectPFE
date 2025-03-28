import React, { useState } from 'react';
import { Table, Badge, Button, Pagination, Form, Dropdown } from 'react-bootstrap';
import { FaEye, FaTruck, FaCheck, FaTimes } from 'react-icons/fa';

const Orders = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Mock orders data
  const ordersData = [
    { id: 'ORD-2025-0001', customer: 'John Smith', date: '2025-03-20', items: 3, total: 89.97, status: 'Delivered' },
    { id: 'ORD-2025-0002', customer: 'Emma Johnson', date: '2025-03-21', items: 1, total: 49.99, status: 'Processing' },
    { id: 'ORD-2025-0003', customer: 'Michael Brown', date: '2025-03-21', items: 2, total: 39.98, status: 'Shipped' },
    { id: 'ORD-2025-0004', customer: 'Olivia Davis', date: '2025-03-22', items: 5, total: 154.95, status: 'Pending' },
    { id: 'ORD-2025-0005', customer: 'William Miller', date: '2025-03-22', items: 2, total: 99.98, status: 'Delivered' },
    { id: 'ORD-2025-0006', customer: 'Sophia Wilson', date: '2025-03-23', items: 1, total: 79.99, status: 'Pending' },
    { id: 'ORD-2025-0007', customer: 'James Moore', date: '2025-03-23', items: 3, total: 59.97, status: 'Processing' },
    { id: 'ORD-2025-0008', customer: 'Isabella Taylor', date: '2025-03-24', items: 2, total: 39.98, status: 'Shipped' },
    { id: 'ORD-2025-0009', customer: 'Benjamin Anderson', date: '2025-03-24', items: 4, total: 199.96, status: 'Pending' },
    { id: 'ORD-2025-0010', customer: 'Mia Thomas', date: '2025-03-24', items: 1, total: 49.99, status: 'Cancelled' },
    { id: 'ORD-2025-0011', customer: 'Charlotte Jackson', date: '2025-03-24', items: 3, total: 149.97, status: 'Processing' },
    { id: 'ORD-2025-0012', customer: 'Daniel White', date: '2025-03-25', items: 2, total: 99.98, status: 'Pending' },
    { id: 'ORD-2025-0013', customer: 'Amelia Harris', date: '2025-03-25', items: 1, total: 19.99, status: 'Pending' },
    { id: 'ORD-2025-0014', customer: 'Henry Martin', date: '2025-03-25', items: 5, total: 249.95, status: 'Processing' },
    { id: 'ORD-2025-0015', customer: 'Elizabeth Thompson', date: '2025-03-25', items: 3, total: 149.97, status: 'Pending' },
  ];

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

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = ordersData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(ordersData.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="w-100 p-2">
    <div className="d-flex justify-content-between align-items-center">
      <span className="fw-bold h5">Order Management</span>
      <Form.Select className="w-25">
        <option>All Orders</option>
        <option>Pending</option>
        <option>Cancelled</option>
        <option>Processing</option>
        <option>Shipped</option>
        <option>Delivered</option>
      </Form.Select>
    </div>
    <hr/>
      <div className="table-responsive">
        <Table hover>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Date</th>
              <th>Items</th>
              <th>Total</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map(order => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.customer}</td>
                <td>{formatDate(order.date)}</td>
                <td>{order.items}</td>
                <td>${order.total.toFixed(2)}</td>
                <td>{getStatusBadge(order.status)}</td>
                <td>
                  {getActionButtons(order.status)}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <div className="d-flex justify-content-between align-items-center mt-3">
        <div>
          Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, ordersData.length)} of {ordersData.length} orders
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
  );
};

export default Orders;
