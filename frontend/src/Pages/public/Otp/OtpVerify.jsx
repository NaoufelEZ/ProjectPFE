import React, { useEffect, useState } from 'react'
import { OtpInput } from 'reactjs-otp-input';
import './otpStyle.css'
import { useNavigate, useParams } from 'react-router-dom';
import { Form,Button } from 'react-bootstrap';
import axios from 'axios';
import { ApiKey,APIURL } from '../../../Api/Api';

const OtpVerify = () => {
  const [error,setError] = useState(false);
  const {hash} = useParams();
  const nav = useNavigate();
  useEffect(()=>{
      axios.get(`${APIURL}/register_Url_verify/${hash}`,{
        params:{
          apiKey:ApiKey,
        },
        headers:{
          "Accept": "application/json",
        }
    }).catch(()=>nav("/",{replace:true}));
  },[nav,hash])
  const handleVerify = async (e)=>{
    e.preventDefault();
    try{
    await axios.put(`${APIURL}/register_send_verify/${hash}`,{
      apiKey:ApiKey,
      code:otp
    },
    {
    headers:{
      "Accept": "application/json",
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
  const [otp,setOtp] = useState();
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

export default OtpVerify;