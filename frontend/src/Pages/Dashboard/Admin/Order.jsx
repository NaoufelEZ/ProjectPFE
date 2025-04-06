import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ApiKey, APIURL } from "../../../Api/Api";
import Cookies from "universal-cookie";
import { Accordion, Badge, Button, Form, Table } from "react-bootstrap";
import * as Yup from "yup";
import { useFormik } from "formik";

const deliverySchema = Yup.object().shape({
  order_status: Yup.string().required("Status is required"),
  delivery_company: Yup.string().when("order_status", {
    is: (status) => status === "Shipped" || status === "Delivered",
    then:(schema) => schema.required("Delivery Company is Required"),
    otherwise: (schema) => schema.notRequired(),
  }),
});

const Order = () => {
  const [order, setOrder] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [deliveryCompany, setDeliveryCompany] = useState([]);
  const [orderStatus, setOrderStatus] = useState("Pending");

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
      ? ["Return", "Delivered"]
      : orderStatus === "Delivered"
      ? ["Return"]
      : [orderStatus];

  useEffect(() => {
    axios
      .get(`${APIURL}/order/${ordId}`, {
        headers: {
          Accept: "Application/json",
          Authorization: `Bearer ${token}`,
          "x-api-key": ApiKey,
        },
      })
      .then((response) => {
        const orderData = response.data.data;
        setOrder(orderData);
        setOrderStatus(orderData.status);

        // Calculate total price
        const total = orderData.order_items.reduce((sum, item) => {
          return sum + item.price * item.quantity;
        }, 0);
        setTotalPrice(total);
      })
      .catch((error) => console.error("Error fetching order:", error));
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
      await axios.put(`${APIURL}/order/update/${ordId}`,{
            deliveryStatus:values.order_status,
            deliveryCompany:values.delivery_company,
        },
        {
            headers:{
                Accept:"application/json",
                Authorization: `Bearer ${token}`,
                "x-api-key": ApiKey,
            }
        });
        navigate("/orders")
    },
  });

  const getStatus = (status) => {
    switch (status) {
      case "Delivered":
        return <Badge bg="success">Delivered</Badge>;
      case "Shipped":
        return <Badge bg="info">Shipped</Badge>;
      case "Processing":
        return <Badge bg="primary">Processing</Badge>;
      case "Pending":
        return <Badge bg="warning" text="dark">Pending</Badge>;
      case "Cancelled":
        return <Badge bg="danger">Cancelled</Badge>;
      default:
        return <Badge bg="secondary">{status}</Badge>;
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

  if (!order) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Order Details</h2>
      <p><strong>Order ID: </strong>ORD-{order.id}</p>
      <p><strong>Status:</strong> {getStatus(order.status)}</p>
      <p><strong>Payment Method:</strong> {order.method_payment}</p>
      <p><strong>Delivery Pay:</strong> {order.delivery_pay === 1 ? "True" : "False"}</p>
      <p><strong>Order Date:</strong> {order.order_date}</p>

      <h4>User Information</h4>
      <p><strong>Name:</strong> {order.user?.first_name} {order.user?.last_name}</p>
      <p><strong>Email:</strong> {order.user?.email}</p>
      <p><strong>Phone:</strong> {order.user?.phone}</p>

      <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Address Selected</Accordion.Header>
          <Accordion.Body>
            <p><strong>State:</strong> {order.address.state}</p>
            <p><strong>Address:</strong> {order.address.address}</p>
            <p><strong>Zip:</strong> {order.address.zip}</p>
            <p><strong>Street:</strong> {order.address.street}</p>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      <h4>Order Items</h4>
      <Table className="w-75" hover>
        <thead>
          <tr>
            <th>Product Title</th>
            <th>Color</th>
            <th>Size</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Stock Quantity</th>
            <th>Stock Status</th>
          </tr>
        </thead>
        <tbody>
          {order.order_items.map((item) => (
            <tr key={item.id}>
              <td>{item.product_stock.product.title}</td>
              <td>{item.product_stock.color}</td>
              <td>{item.product_stock.size}</td>
              <td>{item.quantity}</td>
              <td>{item.price}</td>
              <td>{item.product_stock.quantity}</td>
              <td>{getStatusBadge(item.quantity, item.product_stock.quantity)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <strong>Total Price: {totalPrice.toFixed(2)} TND</strong>

      <div>
        <h4>Status Update</h4>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Order Status</Form.Label>
            <Form.Select
              name="order_status"
              value={formik.values.order_status}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={formik.touched.order_status && !!formik.errors.order_status}
              className="w-25"
            >
              <option value="">Select Status</option>
              {OrderStatus.map((item, index) => (
                <option key={index} value={item}>{item}</option>
              ))}
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {formik.errors.order_status}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Delivery Company</Form.Label>
            {
              deliveryCompany && deliveryCompany.length > 0 ? (
                <Form.Select
                  name="delivery_company"
                  value={formik.values.delivery_company}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  isInvalid={formik.touched.delivery_company && !!formik.errors.delivery_company}
                  className="w-25"
                >
                  <option value="">Select Delivery Company</option>
                  {deliveryCompany.map((item, index) => (
                    <option value={item.name} key={index}>{item.name}</option>
                  ))}
                </Form.Select>
              ) : (
                <p>There are no companies</p>
              )
            }
            <Form.Control.Feedback type="invalid">
              {formik.errors.delivery_company}
            </Form.Control.Feedback>
          </Form.Group>

          <Button
            type="submit"
            disabled={order.status === "Return"}
            className="p-2 w-25"
          >
            Save
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Order;
