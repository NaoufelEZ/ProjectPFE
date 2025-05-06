import { Button, Card, Form } from "react-bootstrap"

const SideSuccessVerify = () => {
  return (
    <div className="login-items-container overflow-auto mt-3">
          <div className="d-flex align-items-center flex-column position-relative">
            <span className="h5 fw-bold">Account Verify</span>
          </div>
            
          <div>
              <Card className="border-0 shadow-sm">
                <Card.Body className="p-4">
                <h2>You Account Verify Now</h2>
              <Button
               variant="primary"
               type="submit"
               className="w-100 py-2 fw-bold text-uppercase"
               style={{
                 background: 'linear-gradient(45deg, #e83e8c, #6f42c1)',
                 border: 'none',
                 letterSpacing: '1px',
               }}
              >Verify</Button>
                </Card.Body>
              </Card>
          </div>
        </div>
  )
}

export default SideSuccessVerify