import axios from "axios";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { ApiKey, APIURL } from "../../Api/Api";
import Loading from "../../Components/Loading";
import { useNavigate } from "react-router-dom";

const ForgetPassword = () => {
  const [email,setEmail] = useState();
  const [error,setError] = useState(false);
  const [loading,setLoading] = useState(false);
  const nav = useNavigate();
  const handleSend = async (e)=>{
    e.preventDefault();
    setLoading(true);
    try{
    const res = await axios.post(`${APIURL}/password/seed`,{
      email:email
    },
    {
      headers:{
        "Accept": "application/json",
        "x-api-key":ApiKey
      }
    });
    nav(`/password/verify/${res.data.token}`);
  }catch(err){
    setError(true)
    setLoading(false);
  }
  }
  return (
    <>
    {!loading ?
    <div className="w-100 d-flex justify-content-center">
        <Form className="w-50" onSubmit={handleSend}>
            <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control type="text" onChange={(e)=>setEmail(e.target.value)} value={email} />
            </Form.Group>
            <div className="d-flex justify-content-center">
            <Button variant="primary" type="submit">Submit</Button>
            </div>
            {error && <p>Email is wrong</p>}
        </Form>
    </div>
    : <Loading />}
    </>
  )
}

export default ForgetPassword