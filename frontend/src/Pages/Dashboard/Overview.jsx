import React, { useEffect, useState } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import StatsCard from './StatsCard';
import {
  FaUsers, FaDollarSign,
  FaShoppingCart, FaBoxes
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
    topCategory: '',
  });
  const user = useUser();
  const cookie = new Cookies();
  const token = cookie.get("auth");
  useEffect(()=>{
    if(user && user.role === "Admin"){
    axios.get(`${APIURL}/users`,{
      headers:{
        Accept:"Application/json",
        Authorization:`Bearer ${token}`,
        "x-api-key":ApiKey,
      }
    }).then((response) => {
      setStats(prev => ({
        ...prev,  
        totalCustomers: response.data.data.length
      }));
    });
  }
  },[user])

  useEffect(()=>{
    axios.get(`${APIURL}/products`,{
      headers:{
        Accept:"Application/json",
        Authorization:`Bearer ${token}`,
        "x-api-key":ApiKey,
      }
    }).then((response) => {
      setStats(prev => ({
        ...prev,  
        totalProducts: response.data.data.length
      }));
    });
  },[user])
  return (
    <>
    <Helmet>
      <title>Overview|Nalouti Dashboard</title>
    </Helmet>
    <Row className="stats-row mb-4">
    <Col lg={3} md={6} sm={12} className="mb-4">
      <StatsCard
        title="Total Sales"
        value={`$${stats.totalSales.toLocaleString()}`}
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
    {
      user && user.role === "Admin" ?
    <Col lg={3} md={6} sm={12} className="mb-4">
      <StatsCard
        title="Total Customers"
        value={stats.totalCustomers}
        icon={<FaUsers size={25} />}
        color="warning"
      />
    </Col>
    :
    null
    }
  </Row>

  <Row>
    <Col lg={8} className="mb-4">
      <Card className="h-100 shadow-sm">
        <Card.Header>
          <h5 className="mb-0">Sales Overview</h5>
        </Card.Header>
        <Card.Body>
          <SalesChart />
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
            <span className="text-success fw-bold">${stats.revenue.toLocaleString()}</span>
          </div>
          <div className="d-flex justify-content-between mb-3">
            <span>Top Category:</span>
            <span className="fw-bold">{stats.topCategory}</span>
          </div>
          <div className="d-flex justify-content-between mb-3">
            <span>Low Stock Items:</span>
            <span className="text-warning fw-bold">{stats.lowStockItems}</span>
          </div>
          <div className="d-flex justify-content-between">
            <span>Pending Orders:</span>
            <span className="text-danger fw-bold">{stats.pendingOrders}</span>
          </div>
        </Card.Body>
      </Card>
    </Col>
  </Row>
</>
  )
}


export default Overview;
