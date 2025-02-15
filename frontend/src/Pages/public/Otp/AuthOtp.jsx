import React, { useState } from 'react'
import { Button } from 'react-bootstrap';
import { Form, useNavigate, useParams } from 'react-router-dom';
import { OtpInput } from 'reactjs-otp-input';
import { ApiKey,APIURL } from '../../../Api/Api';
import axios from 'axios';

const AuthOtp = () => {
  const [otp,setOtp] = useState();
  const [error,setError] = useState();
  const nav = useNavigate();
  const {hash} = useParams();
  const handleVerify = async (e)=>{
    e.preventDefault();
    try{
    await axios.put(`${APIURL}/register_send_verify/${hash}`,{
      code:otp
    },
    {
    headers:{
      "Accept": "application/json",
      "x-api-key":ApiKey
    }
  })
  nav("/login",{replace:true});
  }catch(err){
    console.log(err);
    const errCode = err.response.data.status;
    if(errCode === 422){
      setError(true)
    }
  }
  }
  return (
    <div className="otp d-flex">
      <Form onSubmit={handleVerify}>
        <OtpInput
        onChange={setOtp} 
        value={otp}
        numInputs={6}
        isInputNum={true}
        renderSeparator={<span>-</span>}
        renderInput={(props) => <input {...props} />}
          />
        <Button variant="primary" type="submit">Verify</Button>
      </Form>
      {error ? <p className='text-danger'>Otp are Wrong</p> : ""}
    </div>
  )
}

export default AuthOtp