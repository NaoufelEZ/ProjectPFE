import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { ApiKey, APIURL } from '../../../Api/Api';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { Link } from 'react-router-dom';

const SavedAddresses = () => {
  const [addresses,setAddresses] = useState([]);
  const [error,setError] = useState(false);
  const cookie = new Cookies();
  const token = cookie.get("auth")
  useEffect(()=>{
    axios.get(`${APIURL}/address`,{
      headers:{
          Accept:"application",
          "x-api-key":ApiKey,
          Authorization:`Bearer ${token}`,
      }
  }).then((response)=>setAddresses(response.data.data)
).catch(()=>setError(true))
  },[token]);
  return (
    <>
      <Helmet>
      <title>Saved Addresses|Nalouti Store</title>
      </Helmet>
      <section className='w-50'>
      <h3>Saved Addresses</h3>
        <div className="d-flex justify-content-center mt-3">
        {error ? 
        <div >
          <div>
          <span>there are not address saved</span>
          </div>
          <div className="mt-4 d-flex justify-content-center">
          <Link to="/setting/address" role='button' className="p-3 bg-black text-white rounded-3 text-center">
            <span>Add Address</span>
          </Link>
          </div>
        </div>
        : addresses
      }
        </div>
        
      </section>
    </>
  )
}

export default SavedAddresses