import {useState,useEffect} from 'react'

const BasketUi = () => {
  const [basket,setBasket] = useState([]);
  useEffect(()=>{
    const item = window.localStorage.getItem("card");
    if (item) {
      setBasket(JSON.parse(item));
    }
  },[]);
  return (
    <div role="button" className="position-relative">
      <svg width="25" height="25" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path pid="0" fill-rule="evenodd" clip-rule="evenodd" d="M20 23V12.808l-1.994 1.912-.006-.006V21H2V7h8.52a5.606 5.606 0 0 1-.5-2H7.17a3.001 3.001 0 0 1 3.085-1.99c.211-.686.55-1.312.988-1.854A5.002 5.002 0 0 0 5.1 5H0v18h20ZM15.758 1c-2.035 0-3.748 1.61-3.748 3.66 0 .986.398 1.925 1.11 2.598l4.887 4.69 4.897-4.7A3.6 3.6 0 0 0 24 4.66C24.005 2.609 22.29 1 20.251 1c-.84 0-1.617.272-2.244.732A3.797 3.797 0 0 0 15.758 1ZM14.01 4.66c0-.883.755-1.66 1.748-1.66.603 0 1.127.289 1.443.72l.806 1.096.806-1.097A1.78 1.78 0 0 1 20.251 3c1 0 1.751.778 1.748 1.656v.003c0 .442-.175.856-.509 1.174l-3.483 3.344-3.505-3.365-.007-.006a1.568 1.568 0 0 1-.485-1.147Z" fill="currentColor"></path>
      </svg> 
      <span className="position-absolute h6 m-0 user-select-none" style={{top:"25%",left:"25%"}} aria-hidden="true" data-qa-anchor="cartItemNumber">{basket ? basket.length > 9 ? "9+" : basket.length : "0" }</span>
    </div>
  )
}

export default BasketUi