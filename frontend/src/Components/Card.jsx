import { useEffect, useState } from "react"

const Card = () => {
    const [cart,setCart] = useState();
    useEffect(()=>{
        setCart(JSON.parse(localStorage.getItem("card")));
    },[])
  return (
    <div>
    {cart ? cart.map((e)=>(
        <p>{e.color}</p>
    )) :""}
    </div>
  )
}

export default Card