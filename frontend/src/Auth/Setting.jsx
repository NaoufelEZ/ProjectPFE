import React from 'react'
import Header from '../Component/Header'
import { Outlet } from 'react-router-dom'
import LeftBar from '../Component/LeftBar'

const Setting = () => {
  return (
    <>
    <Header />
    <div className="d-flex justify-content-between w-50">
    <LeftBar />
    <Outlet />
    </div>
    </>
  )
}

export default Setting