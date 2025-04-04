import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ApiKey, APIURL } from "../../../Api/Api";
import Cookies from "universal-cookie";
import { Accordion, Badge, Button, Form, Table } from "react-bootstrap";

const Order = () => {
    const [order, setOrder] = useState(null);
    const [totalPrice, setTotalPrice] = useState(0);
    const [deliveryCompany,setDeliveryCompany] = useState([]);
    const [orderStatusSelected,setOrderStatusSelected] = useState("Pending");
    
    const { ordId } = useParams();
    const cookie = new Cookies();
    const token = cookie.get("auth");

    const OrderStatus = (orderStatusSelected === "Pending" || orderStatusSelected === "Processing" ) ? 
        ["Cancelled","Processing","Pending","Shipped","Delivered"]
        :
        orderStatusSelected === "Shipped"|| orderStatusSelected === "Delivered" ?
        ["Return"]
        :
        [orderStatusSelected]


    
    useEffect(() => {
        axios.get(`${APIURL}/order/${ordId}`, {
            headers: {
                Accept: "Application/json",
                Authorization: `Bearer ${token}`,
                "x-api-key": ApiKey,
            }
        })
        .then((response) => {
            const orderData = response.data.data;
            setOrder(orderData);
            setOrderStatusSelected(orderData.status);

            // Calculate total price
            const total = orderData.order_items.reduce((sum, item) => {
                return sum + item.price * item.quantity;
            }, 0);
            setTotalPrice(total);
        })
        .catch(error => console.error("Error fetching order:", error));
    }, [ordId, token]);

    const getStatus = (status) => {
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

    useEffect(()=>{

        axios.get(`${APIURL}/delivery-company`, {
            headers: {
                Accept: "Application/json",
                Authorization: `Bearer ${token}`,
                "x-api-key": ApiKey,
            }
        })
        .then((response) => setDeliveryCompany(response.data.data))
        .catch(error => console.error("Error fetching order:", error));

    },[ordId]);

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
                    {order.order_items.map(item => (
                        <tr key={item.id}>
                            <td>{item.product_stock.product_id}</td> 
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
                <h4>Status</h4>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Select value={orderStatusSelected} onChange={(e)=>setOrderStatusSelected(e.target.value)} className="w-25">
                            {
                                OrderStatus.map((item,index)=>(
                                    <option key={index} value={item}>{item}</option>
                                ))
                            }
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <h4>Delivery Company</h4>
                        {
                            deliveryCompany && deliveryCompany.length > 0 ?
                        <Form.Select className="w-25">
                            <option value="" selected disabled>Selected Company</option>
                            {
                                deliveryCompany.map((item,index)=>(
                                    <option value={item.id} key={index}>{item.name}</option>
                                ))
                            }
                        </Form.Select>
                        :
                        <span>There are Not Company</span>
                        }
                    </Form.Group>
                    <Button disabled={order.status === "Return"} className="p-2 w-25">Save</Button>
                </Form>
            </div>
        </div>
    );
};

export default Order;
