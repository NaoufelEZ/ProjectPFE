import React, { useEffect, useState } from 'react';
import { Card, Col, Row, Modal, Button, Table } from 'react-bootstrap';
import StatsCard from './StatsCard';
import {
  FaUsers, FaDollarSign,
  FaShoppingCart, FaBoxes,
  FaFire
} from 'react-icons/fa';
import SalesChart from './SalesChart';
import axios from 'axios';
import { ApiKey, APIURL } from '../../Api/Api';
import Cookies from 'universal-cookie';
import useUser from '../../Hooks/useUser';
import { Helmet } from 'react-helmet-async';

const Overview = () => {
  const [stats, setStats] = useState({
    totalSales: 0,
    totalOrders: 0,
    totalProducts: 0,
    totalCustomers: 0,
    lowStockItems: 0,
    pendingOrders: 0,
    revenue: 0,
    topProducts: [],
  });

  const [showTopProductModal, setShowTopProductModal] = useState(false);

  const user = useUser();
  const cookie = new Cookies();
  const token = cookie.get("auth");

  // Function to calculate low stock items
  const calculateLowStock = (products) => {
    return products.filter(product =>
      product.product_stock &&
      product.product_stock.some(stock => stock.quantity <= 10)
    ).length;
  };
  

  useEffect(() => {
    if (user && user.role === "Admin") {
      axios.get(`${APIURL}/users`, {
        headers: {
          Accept: "Application/json",
          Authorization: `Bearer ${token}`,
          "x-api-key": ApiKey,
        }
      }).then((response) => {
        setStats(prev => ({
          ...prev,
          totalCustomers: response.data.data.length
        }));
      });
    }
  }, [user]);

  useEffect(() => {
    axios.get(`${APIURL}/products`, {
      headers: {
        Accept: "Application/json",
        Authorization: `Bearer ${token}`,
        "x-api-key": ApiKey,
      }
    }).then((response) => {
      const products = response.data.data;
      const lowStockCount = calculateLowStock(products);
      setStats(prev => ({
        ...prev,
        totalProducts: products.length,
        lowStockItems: lowStockCount
      }));
    });
  }, [user]);
  

  useEffect(() => {
    axios.get(`${APIURL}/orders`, {
      headers: {
        Accept: "Application/json",
        Authorization: `Bearer ${token}`,
        "x-api-key": ApiKey,
      }
    }).then((response) => {
      const orders = response.data.data;
      const totalOrders = orders.length;
      const pendingOrders = orders.filter(order => order.status === "Pending").length;

      const validOrders = orders.filter(order => {
        const isOnlinePaidAndShipped = order.method_payment === "credit card" && order.status === "Shipped";
        const isCashOnDeliveryAndDelivered = order.method_payment === "Cash" && order.status === "Delivered";
        return isOnlinePaidAndShipped || isCashOnDeliveryAndDelivered;
      });

      let totalSales = 0;
      let monthRevenue = 0;
      const productSalesMap = {};
      const now = new Date();
      const currentMonth = now.getMonth();
      const currentYear = now.getFullYear();

      validOrders.forEach(order => {
        const orderDate = new Date(order.order_date);
        const isMTD = orderDate.getMonth() === currentMonth && orderDate.getFullYear() === currentYear;

        order.order_items.forEach(item => {
          const product = item.product_stock.product;
          const productId = product.id;
          const quantity = item.quantity;
          const revenue = item.price * quantity;

          totalSales += revenue;
          if (isMTD) {
            monthRevenue += revenue;
          }

          if (!productSalesMap[productId]) {
            productSalesMap[productId] = {
              ...product,
              quantitySold: 0,
              totalRevenue: 0
            };
          }

          productSalesMap[productId].quantitySold += quantity;
          productSalesMap[productId].totalRevenue += revenue;
        });
      });

      const topProducts = Object.values(productSalesMap)
        .sort((a, b) => b.quantitySold - a.quantitySold)
        .slice(0, 10);

      setStats(prev => ({
        ...prev,
        totalOrders,
        totalSales,
        revenue: monthRevenue,
        pendingOrders,
        topProducts,
      }));
    });
  }, [user]);

  return (
    <>
      <Helmet>
        <title>Overview | Nalouti Dashboard</title>
      </Helmet>

      {/* Stats Cards */}
      <Row className="stats-row mb-4">
        <Col lg={3} md={6} sm={12} className="mb-4">
          <StatsCard
            title="Total Sales"
            value={`${stats.totalSales.toLocaleString()} TND`}
            icon={<FaDollarSign size={25} color='green' />}
            color="primary"
          />
        </Col>
        <Col lg={3} md={6} sm={12} className="mb-4">
          <StatsCard
            title="Total Orders"
            value={stats.totalOrders}
            icon={<FaShoppingCart size={25} color='grey' />}
            color="success"
          />
        </Col>
        <Col lg={3} md={6} sm={12} className="mb-4">
          <StatsCard
            title="Total Products"
            value={stats.totalProducts}
            icon={<FaBoxes size={25} />}
            color="info"
          />
        </Col>
        {user && user.role === "Admin" && (
          <Col lg={3} md={6} sm={12} className="mb-4">
            <StatsCard
              title="Total Customers"
              value={stats.totalCustomers}
              icon={<FaUsers size={25} />}
              color="warning"
            />
          </Col>
        )}
      </Row>

      {/* Chart and Quick Stats */}
      <Row>
        <Col lg={8} className="mb-4">
          <Card className="h-100 shadow-sm">
            <Card.Header>
              <h5 className="mb-0">Sales Overview</h5>
            </Card.Header>
            <Card.Body>
              <SalesChart APIURL={APIURL} token={token} ApiKey={ApiKey} />
            </Card.Body>
          </Card>
        </Col>

        <Col lg={4}>
          <Card className="mb-4 shadow-sm">
            <Card.Header>
              <h5 className="mb-0">Quick Stats</h5>
            </Card.Header>
            <Card.Body>
              <div className="d-flex justify-content-between mb-3">
                <span>Revenue (MTD):</span>
                <span className="text-success fw-bold">{stats.revenue.toLocaleString()} TND</span>
              </div>

              <div className="d-flex justify-content-between align-items-center mb-3">
                <span>Top Product Sales:</span>
                {stats.topProducts.length > 0 ? (
                  <span
                    role="button"
                    onClick={() => setShowTopProductModal(true)}
                    className="text-primary fw-bold d-flex align-items-center"
                  >
                    <FaFire className="me-2" /> {stats.topProducts[0].title}
                  </span>
                ) : (
                  <span>-</span>
                )}
              </div>

              <div className="d-flex justify-content-between mb-3">
                <span>Low Stock Items:</span>
                <span className="text-danger fw-bold">{stats.lowStockItems}</span>
              </div>

              {stats.pendingOrders > 0 && (
                <div className="d-flex justify-content-between">
                  <span>Pending Orders:</span>
                  <span className="text-warning fw-bold">{stats.pendingOrders}</span>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Modal for Top Products */}
      <Modal show={showTopProductModal} onHide={() => setShowTopProductModal(false)} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Top 10 Product Sales</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Product Title</th>
                <th>Quantity Sold</th>
                <th>Total Revenue (TND)</th>
              </tr>
            </thead>
            <tbody>
              {stats.topProducts.map((product, idx) => (
                <tr key={product.id}>
                  <td>{idx + 1}</td>
                  <td>{product.title}</td>
                  <td>{product.quantitySold}</td>
                  <td>{product.totalRevenue.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowTopProductModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Overview;
