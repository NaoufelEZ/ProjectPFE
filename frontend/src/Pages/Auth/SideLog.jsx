import { faArrowLeft, faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef, useState } from 'react';
import './Login2.css';
import useCloseOut from '../../Hooks/useClose';
import LeftLogin from './SideLogin';
import SideRegister from './SideRegister';
import SideVerify from './SideVerify';
import SideForgotten from './SideForgotten';
import SideNewPassword from './SideNewPassword';
import SideForgottenVerify from './SideForgottenVerify';
import SideAccountVerify from './SideAccountVerify';

function SideLog({ setLog, currentUse, setCurrentUse }) {
  const loginRef = useRef(null);
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  useCloseOut(loginRef, setLog);
  console.log(currentUse.log)


  return (
    <div ref={loginRef} className="login-content">
      <div className="login-header">
        <h3 className="login-title text-capitalize">{currentUse.log}</h3>
        <div className="login-close-btn">
          {currentUse.log === 'login' ? (
            <FontAwesomeIcon className="mb-0" icon={faClose} onClick={() => setLog(false)} />
          ) : (
            <FontAwesomeIcon className="mb-0" icon={faArrowLeft} onClick={() => setCurrentUse({log:"login"})} />
          )}
        </div>
      </div>
      {currentUse.log === 'login' ? (
         <LeftLogin currentUse={setCurrentUse} />
      ): currentUse.log === 'register' ? (
      <SideRegister currentUse={setCurrentUse}/>
      ) : currentUse.log === "verify" ? (
        <SideVerify currentUse={currentUse} setCurrentUse={setCurrentUse}  />
      ) : currentUse.log === "forgotten" ?  (
        <SideForgotten setCurrentUse={setCurrentUse} />
      ) : currentUse.log === "Forgotten Verify" ? (
        <SideForgottenVerify currentUse={currentUse} setCurrentUse={setCurrentUse} />
      ) : currentUse.log === "account Verify" ? (
          <SideAccountVerify currentUse={currentUse} setCurrentUse={setCurrentUse} />
      ) : (
        <SideNewPassword currentUse={currentUse} setCurrentUse={setCurrentUse} />

      )
      }
  </div>
  );
}

export default SideLog;
