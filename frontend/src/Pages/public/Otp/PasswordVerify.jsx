import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom';
import { OtpInput } from 'reactjs-otp-input'
import { ApiKey, APIURL } from '../../../Api/Api';

const PasswordVerify = () => {
    const [errorEx,setErrorEx] = useState(false);
    const [error,setError] = useState(false);
    const [errorWrong,setErrorWrong] = useState(false);
    const [otp,setOtp] = useState();
    const [loading,setLoading] = useState(false);
    const {token} = useParams();
    const nav = useNavigate();
    const [time,setTime] = useState(60);
    useEffect(() => {
        if (time > 0) {
            const timer = setTimeout(() => {
                setTime(prev => prev - 1);
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [time]);
   
    useEffect(()=>{
        axios.get(`${APIURL}/password_verify_token/${token}`,{
            headers:{
                Accept:"application/json",
                "x-api-key":ApiKey
            }
        }).then((data)=>console.log(data)).catch(()=>setError(true))
        
    },[token]);
    const handleVerify = async (e) => {
        e.preventDefault();
        try{
        await axios.put(`${APIURL}/password_verify/${token}`,{
            code:otp
        },
        {
        headers:{
            Accept: "application/json",
            "x-api-key":ApiKey
        }
        });
        nav(`/password/change/${token}`);
        }catch(err){
            if(err.response.data.status === 410){
                setErrorEx(true)
            }else{
                setErrorWrong(true)
            }
        }
    }
    const handleReSend = async ()=>{
        try{
        const res = await axios.put(`${APIURL}/password/reseed/${token}`,
            {},
           { 
            headers:{
            Accept: "application/json",
            "x-api-key":ApiKey
            }
        });
        console.log(res)
        setTime(prev => prev + 60);
    }catch(err){
        console.log(err)
    }
    }

  return (
    <>
    {!error &&
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
          <div className="d-50 d-flex justify-content-around">
          <Button variant="primary" type="submit">Verify</Button>
          <Button onClick={handleReSend} disabled={time !== 0} variant="primary" type="button">{time ? time : "Re-send"}</Button>  
          </div>

      {errorEx ? <p className='text-danger'>Code Is Expiry</p> : errorWrong ? "Code is Wrong" : ""}
      </Form>
    </div>
    }
    </>
  )
}

export default PasswordVerify