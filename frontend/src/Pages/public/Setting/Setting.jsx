import React from 'react';
import Header from "../../../Components/Header";
import { Outlet } from 'react-router-dom';
import LeftBar from '../../../Components/LeftBar';

const Setting = () => {
  return (
    <>
    <Header />
    <div className="d-flex w-100 mt-5 gap-5">
    <LeftBar />
    <Outlet />
    </div>
    </>
  )
}

export default Setting