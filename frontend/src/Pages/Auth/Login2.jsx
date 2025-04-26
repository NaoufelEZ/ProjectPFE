import { faArrowLeft , faClose } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useRef, useState } from 'react'
import googleLogo from '../../Assets/images/icons8-google-48.svg';
import { Link, useNavigate } from 'react-router-dom';
import "./Login2.css";
import useCloseOut from '../../Hooks/useClose';
import { Button, Form } from 'react-bootstrap';
function Login2({setLogin}) {
  const [currentUse,setCurrentUse] = useState("login");
    const loginRef = useRef(null);

    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "unset";
        };
    }, []);

    useCloseOut(loginRef, setLogin);

    return (
        <div ref={loginRef} className="login-content">
            <div className="login-header">
                <h3 className="login-title">{currentUse}</h3>
                <div className="login-close-btn">
                  {
                    currentUse === "login" ?
                    <FontAwesomeIcon
                     className="mb-0"
                        icon={faClose} 
                        onClick={() => setLogin(false)}
                    />
                    :
                    <FontAwesomeIcon
                    className="mb-0"
                        icon={faArrowLeft} 
                        onClick={() => setCurrentUse("login")}
                    />
                  }
                </div>
            </div>
            {currentUse === "login" ?
            <div className="login-items-container overflow-auto mt-3">
              <div className="d-flex align-items-center flex-column">
                <span className="h5">Log in or create an account</span>
                <div role='button' className="d-flex rounded-2 justify-content-center py-1 align-items-center border border-1 w-100 mt-4">
                  <img  className="me-4" src={googleLogo} width={35} height={35} alt='google-logo'/>
                  <span className="font-weight-bold">CONTINUE WITH GOOGLE</span>
                </div>
                <span style={{fontSize:"12px"}} className="text-secondary text-center mt-3">By logging/signing in with my social login, I agree to connect my account in accordance</span>
              </div>
              <div className="d-flex mt-5 align-items-center">
                <span style={{height:".5px"}} className="w-100 bg-light"></span>
                <span className="px-2 mb-1 text-secondary">or</span>
                <span style={{height:".5px"}} className="w-100 bg-light"></span>
              </div>
              <div>
                <Form>
                  <Form.Group>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control className="rounded-2"/>
                  </Form.Group>

                  <Form.Group className="mt-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" className="rounded-2"/>
                  </Form.Group >
                  <Form.Group className="mt-3 d-flex justify-content-end">
                    <span role='button' onClick={()=>setCurrentUse("Forgotten")}>Forgotten your password?</span>
                  </Form.Group>
                  <Form.Group className="mt-3 w-100">
                    <Button className='w-100 rounded-2'>Login</Button>
                  </Form.Group>
                  <Form.Group  role='button' className="text-center mt-3">
                    <span onClick={()=>setCurrentUse("Create account")}>Don’t have an account? <b>Register</b></span>
                  </Form.Group>
                </Form>
              </div>
            </div>
            :
            <div>
              
            </div>
            }
            </div>
    );
};

export default Login2;
