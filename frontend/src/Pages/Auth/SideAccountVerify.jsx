import { Button, Card, Form } from "react-bootstrap"
import { Slide, toast, ToastContainer } from "react-toastify"
import { OtpInput } from "reactjs-otp-input"
import Loading from "../../Components/Loading";
import { ApiKey, APIURL } from "../../Api/Api";
import axios from "axios";
import { useState } from "react";
import Cookies from "universal-cookie";

const SideAccountVerify = ({ setCurrentUse }) => {
    const [otp,setOtp] = useState();
    const [loading, setLoading] = useState(false);
    const cookie = new Cookies();
    const token = cookie.get("auth");
    const notify = () => toast.error("Incorrect combination of user name and password.");
    const handleVerify = async (e)=>{
      e.preventDefault();
      setLoading(true)
      try{
      await axios.put(`${APIURL}/store_otp`,{
        otp:otp
      },
      {
      headers:{
        Accept: "application/json",
        Authorization:`Bearer ${token}`,
        "x-api-key":ApiKey
      }
    })
    setCurrentUse({log:"success verify"})
    }catch(err){
      console.log(err);
      const errCode = err.response.data.status;
      if(errCode === 422){
        notify();
      }
    }finally{
      setLoading(false);
    }
    };
  
  return (
    <div className="login-items-container overflow-auto mt-3">
          <div className="d-flex align-items-center flex-column position-relative">
           <ToastContainer position="top-center" closeButton={false} autoClose={2000} hideProgressBar={true} transition={Slide} />
            <span className="h5 fw-bold">Verify</span>
            <span style={{fontSize:"12px"}}>We'll send you instructions by email so that you can reset it</span>
          </div>
            
          <div>
            {loading ? (
              <Loading />
            ) : (
              <Card className="border-0 shadow-sm">
                <Card.Body className="p-4">
                <Form className="sideOtp" onSubmit={handleVerify}>
                <OtpInput
                      onChange={setOtp} 
                      value={otp}
                      numInputs={6}
                      isInputNum={true}
                      renderSeparator={<span>-</span>}
                      renderInput={(props) => <input {...props} />}
                    />

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
            </Form>
                </Card.Body>
              </Card>
            )}
          </div>
        </div>
  )
}

export default SideAccountVerify