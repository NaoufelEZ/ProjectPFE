import axios from "axios"
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { ApiKey } from "../Api/Api";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [email,setEmail] = useState();
  const [password,setPassword] = useState();
  const [error,setError] = useState(false);
  const cookie = new Cookies();
  const nav = useNavigate();
    const handleSubmit = async (e)=>{
      e.preventDefault();
      try{
        await axios.post("http://127.0.0.1:8000/api/v1/login",
          {
              apiKey:ApiKey,
              email : email,
              password : password,
          },
          {
          headers : {
            "Accept": "application/json",
          }
      }
      ).then((data)=>{cookie.set("auth",data.data.token);nav("/")})
      }catch(err){
        setError(true);
      }
      }

  return (
    <div className="d-flex justify-content-center align-items-center flex-column">
    <Form onSubmit={handleSubmit} className='w-50'>
    <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>Email address</Form.Label>
      <Form.Control onChange={(e)=>setEmail(e.target.value)} name='email' value={email} type="email" placeholder="Enter email" />
    </Form.Group>
    <Form.Group className="mb-3" controlId="formBasicPassword">
      <Form.Label>Password</Form.Label>
      <Form.Control onChange={(e)=>setPassword(e.target.value)} name='password' value={password} type="password" placeholder="Password" />
    </Form.Group>
    <Button variant="primary" type="submit">
      Submit
    </Button>
  </Form>
  {error ? <div className="p-3 bg-danger text-white rounded-3">Email or Password are Wrong</div> : ""}
  </div>
  )
}

export default Login