import { useEffect,useState } from 'react';
import { Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaCheckCircle, FaCcVisa, FaTruck, FaReceipt } from 'react-icons/fa';
import { ApiKey, APIURL } from '../../../Api/Api';
import axios from 'axios';
import Cookies from 'universal-cookie';

const VisaOrderConfirmation = () => {
  const cookie = new Cookies();
  const [reference,setReference] = useState("")
  const tokenAuth = cookie.get("auth"); 
  const path = window.location.href;
  const token = path.split("=")[1];
  useEffect(() => {
  const referenceY = window.localStorage.getItem("reference");
  setReference(referenceY);

  }, [token])  
  useEffect(() => {
    if (!reference) {
      console.error("Aucune référence fournie pour la confirmation de commande.");
      return;
    }
  
    axios.get(`${APIURL}/check/payment/${token}`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${tokenAuth}`,
        "x-api-key": ApiKey,
      }
    })
    .then(() => {
      return axios.put(`${APIURL}/order/confirmation/${reference}`, {}, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${tokenAuth}`,
          "x-api-key": ApiKey,
        }
      }).then(()=>window.localStorage.removeItem("card"))
    })
    .catch((err) => {
      console.error("Erreur lors de la vérification ou confirmation :", err);
      navigate("/");
      window.location.reload();
    });
  }, [token,reference]);
  
  
  const navigate = useNavigate();
  const transactionId = `TXN${Math.floor(1000000000 + Math.random() * 9000000000)}`;
  
  return (
    <Container className="thank-you-container">
      <div className="text-center mb-4">
        <FaCheckCircle size={60} className="text-success" />
      </div>
      
      <h1 className="text-center mb-3">PAYMENT SUCCESSFUL!</h1>
      <p className="text-center fs-5 mb-4">Your Visa payment has been processed successfully.</p>
      
      <div className="order-summary-box mb-4">
        <h2 className="h5 mb-3 text-uppercase">Transaction Details</h2>
        <p className="mb-2">
          <FaCcVisa className="me-2 text-primary" />
          Payment method: <span className="fw-medium">Visa ending in ****</span>
        </p>
        <p className="mb-2">
          <FaReceipt className="me-2" />
          Transaction ID: <span className="fw-medium">{transactionId}</span>
        </p>
        <p className="mb-2">
          <FaTruck className="me-2" />
          Delivery: <span className="fw-medium">Standard (3-5 business days)</span>
        </p>
        <p>A receipt has been sent to your email address.</p>
      </div>
      
      <div className="text-center">
        <p className="text-muted mb-4">Thank you for shopping with us! You will receive updates about your order status via email.</p>
        <Button 
          variant="dark" 
          className="btn-black px-4 py-2"
          onClick={() => {
            navigate('/')
            window.localStorage.removeItem("reference");
          }}
        >
          CONTINUE SHOPPING
        </Button>
      </div>
    </Container>
  );
};

export default VisaOrderConfirmation;