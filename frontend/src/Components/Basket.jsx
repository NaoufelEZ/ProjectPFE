import { faClose, faHeart, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { IMAGEURL } from '../Api/Api';
import { useNavigate } from 'react-router-dom';

const Basket = (props) => {
    const [storage,setStorage] = useState([]);
    const [total,setTotal] = useState(0);
    const navigate = useNavigate();

    useEffect(()=>{
        const storedData = window.localStorage.getItem("card");
        if (storedData) {
            setStorage(JSON.parse(storedData));
        }
    },[])
    useEffect(() => {
        const totalPrice = storage.reduce((sum, e) => sum + e.price, 0);
        setTotal(totalPrice);
      }, [storage]);
      const handleDelete = (product)=>{
        console.log(product)

      }
  return (
    <div style={{height:"100vh"}} className="w-25 bg-light position-absolute end-0 top-0 z-3 p-3">
            <div className="w-100 d-flex justify-content-end p-3">
            <span role="button" onClick={()=>props.setBasket(prev => false)}><FontAwesomeIcon className="h5" icon={faClose} /></span>
            </div>
            <div className="w-100 d-flex d-flex justify-content-between mb-3">
                <h3>Basket</h3>
               {props.token && <div role="button" className="p-2 border rounded-pill d-flex align-items-center">
                    <FontAwesomeIcon className="text-danger h6 mb-0 me-1" icon={faHeart} />
                    <span>Wishlist</span>
                    </div>}
            </div>
            <div>
                {storage && storage.length > 0 ? <><div style={{height:"320px"}} className="overflow-y-scroll">{ storage.map((e,key)=>(
                   <div key={key} className="d-flex mb-2">
                    <div className="me-2">
                        <img className="rounded-3" width={120} height={100} src={`${IMAGEURL}/products/${e.image}`} alt="product" />
                    </div>
                    <div className="w-50">
                        <div className="d-flex justify-content-between">
                            <p className="h6 fw-bold">{e.price} TND</p>
                            <FontAwesomeIcon role="button" onClick={()=>handleDelete(key)} className="h6" icon={faTrash} />
                        </div>
                        <p>{e.title}</p>
                    </div>
                    </div> 
                ))}
                </div>
                <div className="py-2">
                    <div className="d-flex justify-content-between">
                    <span>Subtotal:</span>
                    <span className="fw-bold">{total} TDN</span>
                    </div>
                    <div className="d-flex justify-content-between">
                    <span>Delivery costs</span>
                    <span className="fw-bold">7 TDN</span>
                    </div>
                    <div className="d-flex justify-content-between">
                    <span>Total</span>
                    <span className="fw-bold">{total + 7} TDN</span>
                    </div>
                   <div className="w-100 mt-3 d-flex justify-content-center">
                    <span onClick={()=>{props.token ? navigate("/order") : navigate("/login")}} role="button" className="bg-success p-2 w-100 text-center text-white rounded-pill">Process order</span>
                   </div>
                </div>
                </>
                :<p>Cart is Empty</p>

                }
            </div>
            </div>
  )
}

export default Basket