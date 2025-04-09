import { useEffect, useState } from "react";
import { ApiKey, APIURL, IMAGEURL } from "../../../Api/Api";
import { Button, Form } from "react-bootstrap";
import Cookies from "universal-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import flouci from "../../../Assets/images/flouci.png";
import delivery from "../../../Assets/images/delivery-van.png";
import AddressBox from "./AddressBox";

const Checkout = () => {
    const [carts, setCarts] = useState([]);
    const [total, setTotal] = useState(0);
    const [address, setAddress] = useState([]);
    const [payment, setPayment] = useState([
        { "method": "Flouci", "icon": flouci },
        { "method": "Cash payment on delivery", "icon": delivery }
    ]);
    const [paymentChoose, setPaymentChoose] = useState(1);
    const [popup, setPopup] = useState(false);
    const [user, setUser] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const cookie = new Cookies();
    const token = cookie.get("auth");
    const navigate = useNavigate();

    useEffect(() => {
        const storedData = window.localStorage.getItem("card");
        if (storedData) {
            setCarts(JSON.parse(storedData));
        }
    }, []);

    useEffect(() => {
        axios.get(`${APIURL}/user`, {
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
                "x-api-key": ApiKey,
            }
        }).then((response) => setUser(response.data.data));
    }, [token]);

    useEffect(() => {
        const totalPrice = carts.reduce((sum, e) => sum + e.price * e.count, 0);
        setTotal(totalPrice);
    }, [carts]);

    const deliveryFee = total <= 150 ? 7 : 0;

    const fetchAddresses = async () => {
        try {
            const response = await axios.get(`${APIURL}/address`, {
                headers: {
                    Accept: "application/json",
                    "x-api-key": ApiKey,
                    Authorization: `Bearer ${token}`,
                }
            });
            setAddress(response.data.data);
            
            // Set the default address if one exists
            const defaultAddress = response.data.data.find(addr => addr.is_default);
            if (defaultAddress) {
                setSelectedAddress(defaultAddress.id);
            }
        } catch (err) {
            if (err.response?.status === 500) {
                navigate("/");
            }
        }
    };

    useEffect(() => {
        fetchAddresses();
    }, [token, navigate]);

    const handleSelect = async (index) => {
        try {
            await axios.put(`${APIURL}/address/default/update/${index}`, {}, {
                headers: {
                    Accept: "application/json",
                    "x-api-key": ApiKey,
                    Authorization: `Bearer ${token}`,
                }
            });
            setSelectedAddress(index);
            // Refresh addresses to update the default status
            fetchAddresses();
        } catch (err) {
            console.error("Error updating default address:", err);
        }
    };

    const handleAddressAdded = (newAddress) => {
        // Update the addresses list with the new address
        setAddress(prev => [...prev, newAddress]);
        // Select the new address by default
        setSelectedAddress(newAddress.id);
    };

    const formData = new FormData();
    formData.append("user_id", user.id);
    formData.append("address_id", selectedAddress);
    formData.append("paymentChoose", payment[paymentChoose].method);
    carts.forEach((item) => {
        formData.append("product_stock_id[]", item.stock_id);
        formData.append("price[]", item.price);
        formData.append("quantity[]", item.count);
    });

    const handleOrder = async (e) => {
        e.preventDefault();
        if (selectedAddress !== null) {
            try {
                await axios.post(`${APIURL}/order/add`, formData,
                    {
                        headers: {
                            Accept: "application/json",
                            "x-api-key": ApiKey,
                            Authorization: `Bearer ${token}`,
                        }
                    });
                localStorage.removeItem("card");
                navigate("/order-confirmation"); // Redirect to confirmation page
            } catch (err) {
                console.error("Order error:", err);
                alert("There was an error placing your order. Please try again.");
            }
        } else {
            alert("Please select a delivery address");
        }
    };

    return (
        <div className="container-fluid p-3">
            <Form onSubmit={handleOrder} className="d-flex flex-column flex-lg-row gap-4">
                {popup && (
                    <div style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: "rgba(0,0,0,0.5)",
                        zIndex: 1000,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                        <AddressBox
                            setOpen={setPopup}
                            onAddressAdded={handleAddressAdded}
                        />
                    </div>
                )}
                
                <div className="w-100 w-lg-50">
                    <h3 className="mb-4">Order Summary</h3>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Quantity</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {carts && carts.length > 0 ? (
                                carts.map((cart, key) => (
                                    <tr className="border-1" key={key}>
                                        <td className="w-25">
                                            <img 
                                                width={100} 
                                                height={100} 
                                                src={`${IMAGEURL}/products/${cart.image}`} 
                                                alt={cart.name} 
                                                className="img-thumbnail"
                                            />
                                            <span className="ms-2">{cart.name}</span>
                                        </td>
                                        <td className="w-25">x {cart.count}</td>
                                        <td className="w-25">{(cart.price * cart.count).toFixed(2)} TND</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={3} className="text-center">Your cart is empty</td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                    <div className="mt-4 p-3 bg-light rounded">
                        <div className="d-flex justify-content-between mb-2">
                            <span>Cart subtotal:</span>
                            <span>{total.toFixed(2)} TND</span>
                        </div>
                        <div className="d-flex justify-content-between mb-2">
                            <span>Delivery:</span>
                            <span className={deliveryFee === 0 ? "text-success fw-bold" : ""}>
                                {deliveryFee === 0 ? "Free" : deliveryFee + " TND"}
                            </span>
                        </div>
                        <div className="d-flex justify-content-between mt-3 pt-2 border-top">
                            <strong>Order total:</strong>
                            <strong>{(total + deliveryFee).toFixed(2)} TND</strong>
                        </div>
                    </div>
                </div>

                <div className="w-100 w-lg-50">
                    <div className="mb-4">
                        <h4 className="mb-3">Delivery Address</h4>
                        <Button 
                            onClick={() => setPopup(true)} 
                            type="button"
                            variant="outline-primary"
                            className="mb-3"
                        >
                            Add New Address
                        </Button>
                        
                        <div 
                            style={{ 
                                height: address?.length > 0 ? "300px" : "auto",
                                maxHeight: "300px"
                            }} 
                            className="p-3 bg-light rounded overflow-auto"
                        >
                            {address && address.length > 0 ? (
                                address.map((e, key) => (
                                    <div 
                                        className={`p-3 mb-3 bg-white rounded ${selectedAddress === e.id ? "border border-primary" : ""}`} 
                                        key={key}
                                    >
                                        <div className="form-check">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="address"
                                                id={`address-${e.id}`}
                                                checked={selectedAddress === e.id}
                                                onChange={() => handleSelect(e.id)}
                                            />
                                            <label className="form-check-label" htmlFor={`address-${e.id}`}>
                                                <strong>Address {key + 1} {e.is_default && "(Default)"}</strong>
                                            </label>
                                        </div>
                                        <p className="mb-1">{e.address}</p>
                                        <p className="mb-1">{e.state}, {e.street}</p>
                                        <p className="mb-0">Zip: {e.zip}</p>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center p-4">
                                    <p>You don't have any registered addresses.</p>
                                    <p>Please add a new address to continue.</p>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="mb-4">
                        <h4 className="mb-3">Payment Method</h4>
                        <div className="list-group">
                            {payment.map((element, key) => (
                                <button
                                    key={key}
                                    onClick={() => setPaymentChoose(key)}
                                    disabled={element.method === "Flouci"}
                                    type="button"
                                    className={`list-group-item list-group-item-action mb-2 d-flex align-items-center ${paymentChoose === key ? "active" : ""}`}
                                >
                                    <img className="me-3" width={30} src={element.icon} alt="method" />
                                    <span>
                                        {element.method}
                                        {element.method === "Flouci" && " (Coming Soon)"}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>

                    <Button 
                        type="submit" 
                        variant="primary" 
                        size="lg" 
                        className="w-100 mt-3"
                        disabled={!selectedAddress || carts.length === 0}
                    >
                        {paymentChoose === 1 ? 
                            `Place Order (${(total + deliveryFee).toFixed(2)} TND)` : 
                            `Pay with ${payment[paymentChoose].method} (${(total + deliveryFee).toFixed(2)} TND)`}
                    </Button>
                </div>
            </Form>
        </div>
    );
};

export default Checkout;