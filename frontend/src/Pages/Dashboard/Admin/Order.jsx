import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ApiKey, APIURL } from "../../../Api/Api";
import Cookies from "universal-cookie";
import { Badge, Button, Card, Col, Container, Form, Row, Table } from "react-bootstrap";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Helmet } from "react-helmet";

const deliverySchema = Yup.object().shape({
  order_status: Yup.string().required("Status is required"),
  delivery_company: Yup.string().when("order_status", {
    is: (status) => status === "Shipped" || status === "Delivered",
    then: (schema) => schema.required("Delivery Company is Required"),
    otherwise: (schema) => schema.notRequired(),
  }),
});

const Order = () => {
  const [order, setOrder] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [deliveryCompany, setDeliveryCompany] = useState([]);
  const [orderStatus, setOrderStatus] = useState("Pending");
  const [checkOrderStatus, setCheckOrderStatus] = useState("Pending");
  const [loading, setLoading] = useState(true);

  const { ordId } = useParams();
  const cookie = new Cookies();
  const token = cookie.get("auth");
  const navigate = useNavigate();

  const OrderStatus =
    orderStatus === "Pending"
      ? ["Cancelled", "Processing", "Pending", "Shipped"]
      : orderStatus === "Processing"
      ? ["Cancelled", "Processing", "Shipped"]
      : orderStatus === "Shipped"
      ? ["Return", "Delivered", "Shipped"]
      : orderStatus === "Delivered"
      ? ["Return"]
      : [orderStatus];

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get(`${APIURL}/order/${ordId}`, {
          headers: {
            Accept: "Application/json",
            Authorization: `Bearer ${token}`,
            "x-api-key": ApiKey,
          },
        });
        const orderData = response.data.data;
        setOrder(orderData);
        setOrderStatus(orderData.status);
        setCheckOrderStatus(orderData.status);

        const total = orderData.order_items.reduce((sum, item) => {
          return sum + item.price * item.quantity;
        }, 0);
        setTotalPrice(total);
      } catch (error) {
        console.error("Error fetching order:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [ordId, token]);

  useEffect(() => {
    axios
      .get(`${APIURL}/delivery-company`, {
        headers: {
          Accept: "Application/json",
          Authorization: `Bearer ${token}`,
          "x-api-key": ApiKey,
        },
      })
      .then((response) => setDeliveryCompany(response.data.data))
      .catch((error) => console.error("Error fetching delivery companies:", error));
  }, [ordId]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      order_status: order?.status || "",
      delivery_company: order?.delivery_company || "",
    },
    validationSchema: deliverySchema,
    onSubmit: async (values) => {
      try {
        await axios.put(
          `${APIURL}/order/update/${ordId}`,
          {
            deliveryStatus: values.order_status,
            deliveryCompany: values.delivery_company,
          },
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
              "x-api-key": ApiKey,
            },
          }
        );
        navigate("/dashboard/orders");
      } catch (error) {
        console.error("Error updating order:", error);
      }
    },
  });
  console.log(formik.values.delivery_company)

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

  const getStatusBadge = (orderQuantity, stockQuantity) => {
    if (stockQuantity > orderQuantity) {
      return <Badge bg="success">In Stock</Badge>;
    } else if (stockQuantity === orderQuantity) {
      return <Badge bg="warning">Stock Low</Badge>;
    } else {
      return <Badge bg="danger">Out of Stock</Badge>;
    }
  };

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3">Loading order details...</p>
        </div>
      </Container>
    );
  }

  if (!order) {
    return (
      <Container className="py-5">
        <Card>
          <Card.Body className="text-center">
            <h4>Order not found</h4>
            <Button variant="primary" onClick={() => navigate("/dashboard/orders")}>
              Back to Orders
            </Button>
          </Card.Body>
        </Card>
      </Container>
    );
  }

  return (
    <>
    <Helmet>
      <title>Update Order | Nalouti Dashboard</title>
    </Helmet>
    <Container className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">Order Details</h2>
        <Button variant="outline-secondary" onClick={() => navigate("/dashboard/orders")}>
          Go back
        </Button>
      </div>

      <Card className="mb-4">
        <Card.Body>
          <Row>
            <Col md={6}>
              <h5 className="mb-3">Order Information</h5>
              <div className="mb-3">
                <span className="text-muted">Order ID:</span>{" "}
                <strong>ORD-{order.id}</strong>
              </div>
              <div className="mb-3">
                <span className="text-muted">Status:</span>{" "}
                {getStatus(order.status)}
              </div>
              <div className="mb-3">
                <span className="text-muted">Payment Method:</span>{" "}
                <strong>{order.method_payment}</strong>
              </div>
              <div className="mb-3">
                <span className="text-muted">Delivery Pay:</span>{" "}
                <strong>{order.delivery_pay === 1 ? "Yes" : "No"}</strong>
              </div>
              <div className="mb-3">
                <span className="text-muted">Order Date:</span>{" "}
                <strong>{new Date(order.order_date).toLocaleString()}</strong>
              </div>
            </Col>
            <Col md={6}>
              <h5 className="mb-3">Customer Information</h5>
              <div className="mb-3">
                <span className="text-muted">Name:</span>{" "}
                <strong>
                  {order.user?.first_name} {order.user?.last_name}
                </strong>
              </div>
              <div className="mb-3">
                <span className="text-muted">Email:</span>{" "}
                <strong>{order.user?.email}</strong>
              </div>
              <div className="mb-3">
                <span className="text-muted">Phone:</span>{" "}
                <strong>{order.user?.phone}</strong>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <Card className="mb-4">
        <Card.Header>
          <h5 className="mb-0">Shipping Address</h5>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col md={4}>
              <div className="mb-2">
                <span className="text-muted">State:</span>{" "}
                <strong>{order.address.state}</strong>
              </div>
            </Col>
            <Col md={4}>
              <div className="mb-2">
                <span className="text-muted">Street:</span>{" "}
                <strong>{order.address.street}</strong>
              </div>
            </Col>
            <Col md={4}>
              <div className="mb-2">
                <span className="text-muted">ZIP Code:</span>{" "}
                <strong>{order.address.zip}</strong>
              </div>
            </Col>
          </Row>
          <div>
            <span className="text-muted">Full Address:</span>{" "}
            <strong>{order.address.address}</strong>
          </div>
        </Card.Body>
      </Card>

      <Card className="mb-4">
        <Card.Header>
          <h5 className="mb-0">Order Items</h5>
        </Card.Header>
        <Card.Body>
          <div className="table-responsive">
            <Table hover className="mb-4">
              <thead className="table-light">
                <tr>
                  <th>Product</th>
                  <th>Color</th>
                  <th>Size</th>
                  <th>Qty</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {order.order_items.map((item) => (
                  <tr key={item.id}>
                    <td>{item.product_stock.product.title}</td>
                    <td>{item.product_stock.color}</td>
                    <td>{item.product_stock.size}</td>
                    <td>{item.quantity}</td>
                    <td>{item.price.toFixed(2)} TND</td>
                    <td>{item.product_stock.quantity}</td>
                    <td>
                      {getStatusBadge(item.quantity, item.product_stock.quantity)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
          <div className="text-end">
            <h5>
              <span className="text-muted me-2">Fee:</span>
              {order.delivery_pay ? "9.9 TND" : "0"}
            </h5>
            <h5>
              <span className="text-muted me-2">Total Price:</span>
              {order.delivery_pay ? (totalPrice + 9.9).toFixed(2) : totalPrice.toFixed(2) } TND
            </h5>
          </div>
        </Card.Body>
      </Card>

      <Card>
        <Card.Header>
          <h5 className="mb-0">Update Order Status</h5>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={formik.handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Order Status</Form.Label>
                  <Form.Select
                    name="order_status"
                    value={formik.values.order_status}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={
                      formik.touched.order_status && !!formik.errors.order_status
                    }
                  >
                    <option value="">Select Status</option>
                    {OrderStatus.map((item, index) => (
                      <option key={index} value={item}>
                        {item}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.order_status}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Delivery Company</Form.Label>
                  {deliveryCompany && deliveryCompany.length > 0 ? (
                    <Form.Select
                      name="delivery_company"
                      value={formik.values.delivery_company}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      isInvalid={
                        formik.touched.delivery_company &&
                        !!formik.errors.delivery_company
                      }
                      disabled={
                        checkOrderStatus !== "Pending" &&
                        checkOrderStatus !== "Processing"
                      }
                    >
                      <option value="">Select Delivery Company</option>
                      {deliveryCompany.map((item, index) => (
                        <option value={item.id} key={index}>
                          {item.name}
                        </option>
                      ))}
                    </Form.Select>
                  ) : (
                    <p className="text-muted">No delivery companies available</p>
                  )}
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.delivery_company}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <div className="d-flex justify-content-end">
              <Button
                type="submit"
                disabled={order.status === "Return"}
                variant="primary"
                className="px-4"
              >
                Update Order
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
    </>
  );
};

export default Order;