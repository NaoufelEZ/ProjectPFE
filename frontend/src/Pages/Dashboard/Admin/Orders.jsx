import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Table, Badge, Button, Pagination, Form, Card, Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import { FaEye, FaFilePdf } from 'react-icons/fa';
import { ApiKey, APIURL } from '../../../Api/Api';
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import './Orders.css';

const Orders = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [orders, setOrders] = useState([]);
  const [ordersFilter, setOrdersFilter] = useState([]);
  const [orderSelected, setOrderSelected] = useState("");
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const itemsPerPage = 10;
  const cookie = new Cookies();
  const token = cookie.get("auth");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${APIURL}/orders`, {
          headers: {
            Accept: "Application/json",
            Authorization: `Bearer ${token}`,
            "x-api-key": ApiKey,
          },
        });
        setOrders(response.data.data);
        setOrdersFilter(response.data.data);
      } catch (err) {
        setError("Failed to load orders. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [token]);

  useEffect(() => {
    setOrdersFilter(
      orderSelected
        ? orders.filter((element) => element.status === orderSelected)
        : orders
    );
    setSelectedOrders([]);
    setSelectAll(false);
    setCurrentPage(1);
  }, [orderSelected, orders]);

  const getStatusBadge = (status) => {
    const badgeClasses = {
      Delivered: 'success',
      Shipped: 'info',
      Processing: 'primary',
      Pending: 'warning text-dark',
      Cancelled: 'danger',
      Return: 'secondary'
    };
    return <Badge bg={badgeClasses[status] || 'secondary'} className="status-badge">{status}</Badge>;
  };

  const handleViewOrder = async (id) => {
    try {
      const order = orders.find((order) => order.id === id);
      if (order && order.status !== "Pending") {
        navigate(`${id}`);
        return;
      }
      await axios.put(`${APIURL}/order/checked/${id}`, {}, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
          "x-api-key": ApiKey,
        },
      });
      navigate(`${id}`);
    } catch (err) {
      setError("Failed to view order details.");
    }
  };

  const generateSinglePDF = (order) => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text(`Order Details - ORD-${order.id}`, 14, 20);
    doc.setFontSize(12);
    doc.text(`Customer: ${order.user.first_name} ${order.user.last_name}`, 14, 35);
    doc.text(`Order Date: ${new Date(order.order_date).toLocaleDateString()}`, 14, 42);
    doc.text(`Status: ${order.status}`, 14, 49);
    doc.text(`Payment Method: ${order.method_payment}`, 14, 56);
    const addressY = 66;
    doc.setFontSize(14);
    doc.text('Shipping Address:', 14, addressY);
    doc.setFontSize(12);
    doc.text(`Name: ${order.shipping_address?.full_name || 'N/A'}`, 14, addressY + 8);
    doc.text(`Phone: ${order.shipping_address?.phone || 'N/A'}`, 14, addressY + 15);
    doc.text(`City: ${order.shipping_address?.city || 'N/A'}`, 14, addressY + 22);
    doc.text(`Address: ${order.shipping_address?.address || 'N/A'}`, 14, addressY + 29);
    const tableStartY = addressY + 40;
    
    autoTable(doc, {
      startY: tableStartY,
      head: [['Product', 'Quantity', 'Price', 'Total']],
      body: order.order_items.map(item => [
        item.product_stock.product.title,
        item.quantity,
        `${item.price.toFixed(2)} TND`,
        `${(item.price * item.quantity).toFixed(2)} TND`
      ]),
      styles: { fontSize: 10 },
      headStyles: { fillColor: [41, 128, 185] }
    });
    
    const total = order.order_items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    doc.text(`Total: ${total.toFixed(2)} TND`, 14, doc.lastAutoTable.finalY + 10);
    doc.save(`order-${order.id}.pdf`);
  };

  const generateBulkPDF = () => {
    if (selectedOrders.length === 0) return;
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text(`Orders Report - ${new Date().toLocaleDateString()}`, 14, 20);
    const selectedOrdersData = orders.filter(order => selectedOrders.includes(order.id));
    
    autoTable(doc, {
      startY: 30,
      head: [['Order ID', 'Customer', 'Date', 'Status', 'Total']],
      body: selectedOrdersData.map(order => [
        `ORD-${order.id}`,
        `${order.user.first_name} ${order.user.last_name}`,
        new Date(order.order_date).toLocaleDateString(),
        order.status,
        `${order.order_items.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2)} TND`
      ]),
      styles: { fontSize: 10 },
      headStyles: { fillColor: [41, 128, 185] }
    });
    
    doc.save(`orders-report-${new Date().toISOString().slice(0, 10)}.pdf`);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = ordersFilter.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(ordersFilter.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedOrders([]);
    } else {
      const allIds = currentItems.map(order => order.id);
      setSelectedOrders(allIds);
    }
    setSelectAll(!selectAll);
  };

  const handleCheckboxChange = (orderId) => {
    setSelectedOrders(prev =>
      prev.includes(orderId)
        ? prev.filter(id => id !== orderId)
        : [...prev, orderId]
    );
  };

  return (
    <>
      <Helmet>
        <title>Orders | Nalouti Dashboard</title>
      </Helmet>
      <Container fluid className="py-4">
        <Row className="align-items-center mb-4">
          <Col><h2 className="fancy-title">🧾 Order Management</h2></Col>
          <Col className="d-flex justify-content-end gap-2">
            {selectedOrders.length > 0 && (
              <Button variant="outline-danger" onClick={generateBulkPDF}>
                <FaFilePdf className="me-2" /> Export Selected
              </Button>
            )}
            <Form.Select
              onChange={(e) => setOrderSelected(e.target.value)}
              className="fancy-filter"
            >
              <option value="">All Orders</option>
              <option value="Pending">Pending</option>
              <option value="Cancelled">Cancelled</option>
              <option value="Processing">Processing</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
              <option value="Return">Return</option>
            </Form.Select>
          </Col>
        </Row>

        {loading ? (
          <div className="text-center py-5">
            <Spinner animation="border" variant="primary" />
            <p className="mt-3">Loading orders...</p>
          </div>
        ) : error ? (
          <Alert variant="danger" className="text-center">
            <p>{error}</p>
            <Button onClick={() => window.location.reload()}>Retry</Button>
          </Alert>
        ) : (
          <Card className="shadow fancy-card">
            <Card.Body>
              <div className="table-responsive">
                <Table hover className="fancy-table mb-0">
                  <thead>
                    <tr>
                      <th><Form.Check checked={selectAll} onChange={handleSelectAll} /></th>
                      <th>Order Ref</th>
                      <th>Customer</th>
                      <th>Date</th>
                      <th>Status</th>
                      <th>Total</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentItems.length > 0 ? (
                      currentItems.map(order => (
                        <tr key={order.id}>
                          <td><Form.Check checked={selectedOrders.includes(order.id)} onChange={() => handleCheckboxChange(order.id)} /></td>
                          <td><strong>ORD-{order.id}</strong></td>
                          <td>{order.user.first_name} {order.user.last_name}</td>
                          <td>{new Date(order.order_date).toLocaleDateString()}</td>
                          <td>{getStatusBadge(order.status)}</td>
                          <td>{order.order_items.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)} TND</td>
                          <td>
                            <div className="d-flex gap-2">
                              <Button variant="outline-primary" size="sm" onClick={() => handleViewOrder(order.id)}><FaEye /></Button>
                              <Button variant="outline-secondary" size="sm" onClick={() => generateSinglePDF(order)}><FaFilePdf /></Button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={7} className="text-center py-4">
                          <div className="text-muted">No orders found</div>
                          {orderSelected && (
                            <Button variant="link" onClick={() => setOrderSelected("")}>Clear filters</Button>
                          )}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </div>
              {ordersFilter.length > 0 && (
                <div className="d-flex justify-content-between align-items-center mt-4">
                  <div className="text-muted">
                    Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, ordersFilter.length)} of {ordersFilter.length} orders
                  </div>
                  <Pagination>
                    <Pagination.First onClick={() => paginate(1)} disabled={currentPage === 1} />
                    <Pagination.Prev onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} />
                    {[...Array(totalPages).keys()].map(number => (
                      <Pagination.Item key={number + 1} active={number + 1 === currentPage} onClick={() => paginate(number + 1)}>
                        {number + 1}
                      </Pagination.Item>
                    ))}
                    <Pagination.Next onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages} />
                    <Pagination.Last onClick={() => paginate(totalPages)} disabled={currentPage === totalPages} />
                  </Pagination>
                </div>
              )}
            </Card.Body>
          </Card>
        )}
      </Container>
    </>
  );
};

export default Orders;