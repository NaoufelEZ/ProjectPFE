import { Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaCheckCircle, FaMoneyBillWave, FaTruck } from 'react-icons/fa';

const CashOrderConfirmation = () => {
  const navigate = useNavigate();
  
  return (
    <Container className="thank-you-container">
      <div className="text-center mb-4">
        <FaCheckCircle size={60} className="text-success" />
      </div>
      
      <h1 className="text-center mb-3">THANK YOU FOR YOUR ORDER!</h1>
      <p className="text-center fs-5 mb-4">Your cash payment on delivery has been set up successfully.</p>
      
      <div className="order-summary-box mb-4">
        <h2 className="h5 mb-3 text-uppercase">Order Summary</h2>
        <p className="mb-2">
          <FaMoneyBillWave className="me-2 text-success" />
          Payment method: <span className="fw-medium">Cash on delivery</span>
        </p>
        <p className="mb-2">
          <FaTruck className="me-2" />
          Delivery: <span className="fw-medium">Standard (3-5 business days)</span>
        </p>
        <p>You will receive your order confirmation via email shortly.</p>
      </div>
      
      <div className="text-center">
        <p className="text-muted mb-4">The delivery person will collect the payment when your order arrives. Please have the exact amount ready.</p>
        <Button 
          variant="dark" 
          className="btn-black px-4 py-2"
          onClick={() => navigate('/')}
        >
          CONTINUE SHOPPING
        </Button>
      </div>
    </Container>
  );
};

export default CashOrderConfirmation;