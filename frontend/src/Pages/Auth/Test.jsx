import axios from 'axios'
import React from 'react'
import { Button } from 'react-bootstrap'
import { APIURL } from '../../Api/Api'

const Test = () => {
    const handleClick = () =>{
        window.location.href = `http://127.0.0.1:8000/login-google`;
    }
  return (
    <div>
        <Button onClick={handleClick}>
            google
        </Button>
    </div>
  )
}

export default Test