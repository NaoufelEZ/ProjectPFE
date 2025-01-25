import axios from 'axios';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import { ApiKey } from '../Api/Api';
import Cookies from 'universal-cookie';


const Register = () => {
    const nav = useNavigate();
    const cookie = new Cookies();
    const [fName,setFname] = useState();
    const [lName,setLname] = useState();
    const [email,setEmail] = useState();
    const [password,setPassword] = useState();
    const [phone,setPhone] = useState();
    const [loading,setLodging] = useState(false);
    const  handleSubmit = async (e)=>{
        e.preventDefault();
        setLodging(true);
        try{
        await axios.post("http://127.0.0.1:8000/api/v1/register",
            {
                "apiKey":ApiKey,
                "first_name" : fName,
                "last_name" : lName,
                "email" : email,
                "phone" : phone,
                "password" : password,
            },
            {
            headers : {
              "Accept": "application/json",
            }
        }
        ).then((data)=>{cookie.set("auth",data.data.token);nav("/verify")})
    }catch(err){
        setLodging(false);
        console.log(err);
    }
    }
    
  return (
    <div className="d-flex justify-content-center align-items-center">
    <Form onSubmit={handleSubmit} className='w-50'>
    <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>First Name</Form.Label>
      <Form.Control onChange={(e)=>setFname(e.target.value)} name='fName'  value={fName} type="text" placeholder="Enter First Name" />
      <Form.Label>Last Name</Form.Label>
      <Form.Control onChange={(e)=>setLname(e.target.value)} name='lName' value={lName} type="text" placeholder="Enter Last Name" />
    </Form.Group>
    <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>Email address</Form.Label>
      <Form.Control onChange={(e)=>setEmail(e.target.value)} name='email' value={email} type="email" placeholder="Enter email" />
    </Form.Group>
    <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>Phone</Form.Label>
      <Form.Control onChange={(e)=>setPhone(e.target.value)} name='phone' value={phone} type="text" placeholder="Enter email" />
    </Form.Group>
    <Form.Group className="mb-3" controlId="formBasicPassword">
      <Form.Label>Password</Form.Label>
      <Form.Control onChange={(e)=>setPassword(e.target.value)} name='password' value={password} type="password" placeholder="Password" />
    </Form.Group>
    <Button variant="primary" type="submit">
      Submit
    </Button>
  </Form>
  {loading ? "loading" : ""}
  </div>
  )
}

export default Register