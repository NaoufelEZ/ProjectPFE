import React from 'react'
import { bouncy } from 'ldrs'

const Loading = () => {
    bouncy.register()
  return (

    <div style={{height:"100vh"}} className="w-100 d-flex justify-content-around align-items-center">
        <l-bouncy size="45" speed="1.75" color="black"></l-bouncy>
    </div>
  )
}

export default Loading