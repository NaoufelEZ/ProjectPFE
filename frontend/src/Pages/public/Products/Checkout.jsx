import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Card, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import AddressForm from '../../../Components/AddressForm';
import visaIcon from '../../../Assets/images/visa.svg';
import deliveryIcon from '../../../Assets/images/delivery-van.svg';
import axios from 'axios';
import { ApiKey, APIURL,IMAGEURL } from '../../../Api/Api';
import Cookies from 'universal-cookie';
import './checkout.css'
import useUser from '../../../Hooks/useUser';
import flouci from "../../../Assets/images/flouci.png"

const Checkout = () => {
  // State management
  const [cart, setCart] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [addressError, setaddressError] = useState(true);
  
  const navigate = useNavigate();
  const cookie = new Cookies();
  const token = cookie.get("auth");
  const user = useUser();
  // Payment methods
  const paymentMethods = [
    { id: 'cash', name: 'Cash payment on delivery', icon: deliveryIcon },
    { id: 'credit card', name: 'Credit Card', icon: flouci }
  ];

  // Load data (mock data for demo)
  useEffect(() => {
    // Load cart from localStorage or use mock data
    const storedCart = localStorage.getItem('card');
    if (storedCart) {
      const parsedCart = JSON.parse(storedCart);
      setCart(parsedCart);
    }
  }, []);
  useEffect(()=>{
    axios.get(`${APIURL}/address`,{
        headers:{
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
            "x-api-key":ApiKey,
        },
    }).then((response)=>{
        const addresses = response.data.data;
        setAddresses(addresses)
        const defaultAddress = addresses.find(addr => addr.is_default);
        if (defaultAddress) {
        setSelectedAddressId(defaultAddress.id);
        }
    }
    ).catch(()=>setaddressError(false))
},[]);


  // Calculate total price
  useEffect(() => {
    const total = cart.reduce((sum, item) => sum + (item.price * item.count), 0);
    setTotalPrice(total);
  }, [cart]);

  // Calculate delivery fee
  const deliveryFee = totalPrice <= 150 ? 7 : 0;

  // Handle address selection
  const handleAddressSelect = (addressId) => {
    setSelectedAddressId(addressId);
  };

  // Handle new address added
  const handleAddressAdded = (newAddress) => {
    setAddresses(prev => [...prev, newAddress]);
    setSelectedAddressId(newAddress.id);
  };
  console.log(totalPrice)

 
  

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    
    if (!selectedAddressId) {
      alert('Please select a delivery address');
      return;
    }

    if (!acceptTerms) {
      alert('Please accept the Terms & Conditions');
      return;
    }
    const formData = new FormData();
    formData.append("user_id", user.id);
    formData.append("address_id", selectedAddressId);
    formData.append("paymentChoose", paymentMethod);
    cart.forEach((item) => {
        formData.append("product_stock_id[]", item.stock_id);
        formData.append("price[]", item.price);
        formData.append("quantity[]", item.count);
    });
    if (paymentMethod === 'cash') {
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
            navigate("/checkout/order-confirmation/cash"); 
        } catch (err) {
            console.error("Order error:", err);
        }

    } else {
      const responseOder = await axios.post(`${APIURL}/order/add`, formData,
        {
            headers: {
                Accept: "application/json",
                "x-api-key": ApiKey,
                Authorization: `Bearer ${token}`,
            }
        });
        const reffrence = responseOder.data.data;
       const response = await axios.post(`${APIURL}/payment`,{
          "amount": totalPrice*1000,
          "reffrence": reffrence
        },
        {
        headers:{
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
          "x-api-key":ApiKey,        
        },
      });
      console.log(response)
      const link = response.data.result.link;
      window.location.href = link;
    }
  };

  return (
    <Container className="py-4">
      <h1 className="text-center text-md-start mb-4">CHECKOUT</h1>
      
      <Row>
        {/* Left column - Order Summary */}
        <Col md={6} className="mb-4 mb-md-0">
          <Card className="mb-4 border-0">
            <Card.Body>
              <h2 className="mb-4">ORDER SUMMARY</h2>
              
              {/* Product list */}
              <div className="mb-4">
                {cart.length > 0 ? (
                  cart.map((item) => (
                    <div className="product-item" key={item.id}>
                      <img 
                        src={`${IMAGEURL}/products/${item.image}`} 
                        alt={item.title} 
                        className="product-image" 
                      />
                      <div className="product-details">
                        <h5 className="mb-1">{item.name}</h5>
                        {item.size && <p className="small text-muted mb-1">Size: {item.size}</p>}
                        {item.color && <p className="small text-muted mb-1">Color: {item.color}</p>}
                        <div className="d-flex justify-content-between">
                          <span className="small">Qty: {item.count}</span>
                          <span className="product-price">{item.price.toFixed(2)} TND</span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="product-item">
                    <p>the Card Empty</p>
                  </div>
                )}
              </div>
              
              {/* Order totals */}
              <div className="small mb-3">
                <div className="d-flex justify-content-between mb-2">
                  <span>Subtotal</span>
                  <span>{totalPrice.toFixed(2)} TND</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Delivery</span>
                  <span className={deliveryFee === 0 ? "text-success" : ""}>
                    {deliveryFee === 0 ? "Free" : `${deliveryFee.toFixed(2)} TND`}
                  </span>
                </div>
                <hr />
                <div className="d-flex justify-content-between fw-bold">
                  <span>Total</span>
                  <span>{(totalPrice + deliveryFee).toFixed(2)} TND</span>
                </div>
              </div>
            </Card.Body>
          </Card>
          
          <div className="checkout-section">
            <h3 className="small fw-bold mb-2">ESTIMATED DELIVERY</h3>
            <p className="small">Standard Delivery (3-5 business days)</p>
          </div>
        </Col>
        
        {/* Right column - Checkout Form */}
        <Col md={6}>
          <Form onSubmit={handlePlaceOrder}>
            {/* Delivery Address Section */}
            <div className="checkout-section">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>DELIVERY ADDRESS</h2>
                <Button 
                  variant="link" 
                  className="text-decoration-underline p-0"
                  onClick={() => setShowAddressModal(true)}
                >
                  Add New Address
                </Button>
              </div>
              
              {/* Address list */}
              <div className="mb-4 overflow-auto" style={{ maxHeight: '300px' }}>
                {addressError ? (
                  addresses.map((address, index) => (
                    <Card 
                      key={address.id}
                      className={`address-card mb-3 ${selectedAddressId === address.id ? 'selected' : ''}`}
                      onClick={() => handleAddressSelect(address.id)}
                    >
                      <Card.Body>
                        <Form.Check
                          type="radio"
                          id={`address-${address.id}`}
                          name="address"
                          label={`Address ${index + 1} ${address.is_default ? '(Default)' : ''}`}
                          checked={selectedAddressId === address.id}
                          onChange={() => handleAddressSelect(address.id)}
                          className="mb-2 fw-bold"
                        />
                        <p className="small text-muted mb-1">{address.address}</p>
                        <p className="small text-muted mb-1">{address.state}, {address.street}</p>
                        <p className="small text-muted">ZIP: {address.zip}</p>
                      </Card.Body>
                    </Card>
                  ))
                ) : (
                  <Card className="p-4 text-center">
                    <p>You don't have any registered addresses.</p>
                    <p>Please add a new address to continue.</p>
                  </Card>
                )}
              </div>
            </div>
            
            {/* Payment Method Section */}
            <div className="checkout-section">
              <h2 className="mb-4">PAYMENT METHOD</h2>
              
              {paymentMethods.map(method => (
                <div 
                  key={method.id}
                  className={`payment-method ${paymentMethod === method.id ? 'selected' : ''}`}
                  onClick={() => setPaymentMethod(method.id)}
                >
                  <Form.Check
                    type="radio"
                    id={`payment-${method.id}`}
                    name="paymentMethod"
                    checked={paymentMethod === method.id}
                    onChange={() => setPaymentMethod(method.id)}
                    label={
                      <div className="d-flex align-items-center">
                        <img src={method.icon} alt={method.name} className="payment-method-icon" />
                        <span>{method.name}</span>
                      </div>
                    }
                  />
                </div>
              ))}
            </div>
            
            {/* Terms & Submit */}
            <div className="checkout-section">
              <Form.Group className="mb-4">
                <Form.Check
                  type="checkbox"
                  id="terms"
                  checked={acceptTerms}
                  onChange={(e) => setAcceptTerms(e.target.checked)}
                  label={
                    <span className="small">
                      I have read and accept the <a href="#" className="text-decoration-underline">Terms & Conditions</a> and <a href="#" className="text-decoration-underline">Privacy Policy</a>
                    </span>
                  }
                />
              </Form.Group>
              
              <Button 
                type="submit" 
                variant="dark" 
                className="btn-black w-100 py-3"
              >
                PLACE ORDER
              </Button>
              
              <p className="text-center small text-muted mt-3">
                Your personal data will be processed to manage your purchase and for other purposes described in our privacy policy.
              </p>
            </div>
          </Form>
        </Col>
      </Row>
      
      {/* Address Modal */}
      <Modal 
        show={showAddressModal} 
        onHide={() => setShowAddressModal(false)}
        centered
      >
        <Modal.Body>
          <AddressForm 
            onClose={() => setShowAddressModal(false)} 
            onAddressAdded={handleAddressAdded} 
          />
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default Checkout;