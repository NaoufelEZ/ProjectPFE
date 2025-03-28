import { faClose, faHeart, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useRef, useState } from 'react'
import { IMAGEURL } from '../Api/Api';
import { useNavigate } from 'react-router-dom';
import "./basket.css";
import useCloseOut from '../Hooks/useClose';


const Basket = (props) => {
    const [storage, setStorage] = useState([]);
    const [total, setTotal] = useState(0);
    const navigate = useNavigate();
    const basketRef = useRef(null);

    useEffect(() => {
        const storedData = window.localStorage.getItem("card");
        if (storedData) {
            setStorage(JSON.parse(storedData));
        }
    }, []);

    useEffect(() => {
        const totalPrice = storage.reduce((sum, e) => sum + e.price * e.count, 0);
        setTotal(totalPrice);
    }, [storage]);

    const deliveryFee = total <= 150 ? 7 : 0;

    const handleDelete = (product) => {
        const newStorage = storage.filter((e, key) => key !== product);
        setStorage(newStorage);
        window.localStorage.setItem("card", JSON.stringify(newStorage));
    };

    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "unset";
        };
    }, []);

    useCloseOut(basketRef, props.setBasket);

    return (
        <div
            ref={basketRef}
            className="w-25 bg-light position-absolute end-0 top-0 z-3 p-3 d-flex flex-column"
            style={{ height: "100vh", maxHeight: "100vh", overflow: "hidden" }}
        >
            {/* Close Button */}
            <div className="w-100 d-flex justify-content-end p-3">
                <span role="button" onClick={() => props.setBasket(prev => false)}>
                    <FontAwesomeIcon className="h5" icon={faClose} />
                </span>
            </div>

            {/* Basket Header */}
            <div className="w-100 d-flex justify-content-between mb-3">
                <h3>Basket</h3>
                {props.token && (
                    <div role="button" className="p-2 border rounded-pill d-flex align-items-center">
                        <FontAwesomeIcon className="text-danger h6 mb-0 me-1" icon={faHeart} />
                        <span>Wishlist</span>
                    </div>
                )}
            </div>

            {/* Basket Items - Scrollable Section */}
            <div className="d-flex flex-column flex-grow-1">
                {storage && storage.length > 0 ? (
                    <>
                        <div className="overflow-y-scroll flex-grow-1" style={{ maxHeight: "50vh" }}>
                            {storage.map((e, key) => (
                                <div key={key} className="d-flex mb-2">
                                    <div className="me-2">
                                        <img className="rounded-3" width={120} height={100} src={`${IMAGEURL}/products/${e.image}`} alt="product" />
                                    </div>
                                    <div className="w-50">
                                        <div className="d-flex justify-content-between">
                                            <p className="h6 fw-bold">{parseFloat(e.price * e.count).toFixed(2)} TND</p>
                                            <FontAwesomeIcon role="button" onClick={() => handleDelete(key)} className="h6" icon={faTrash} />
                                        </div>
                                        <p>{e.title}</p>
                                        <div style={{ fontSize: "14px" }} className="d-flex justify-content-between w-25 text-secondary">
                                            <span>{e.size}</span>
                                            <span>{e.count}x</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Checkout Section - Stays Fixed at the Bottom */}
                        <div className="py-3 border-top bg-light">
                            <div className="d-flex justify-content-between">
                                <span>Subtotal:</span>
                                <span className="fw-bold">{total.toFixed(2)} TDN</span>
                            </div>
                            <div className="d-flex justify-content-between">
                                <span>Delivery costs</span>
                                <span className={`${deliveryFee === 0 && "text-success h5"} fw-bold`}>
                                    {deliveryFee === 0 ? "Free" : deliveryFee + " TND"}
                                </span>
                            </div>
                            <div className="d-flex justify-content-between">
                                <span>Total</span>
                                <span className="fw-bold">{(total + deliveryFee).toFixed(2)} TDN</span>
                            </div>
                            <div className="w-100 mt-3 d-flex justify-content-center">
                                <span onClick={() => { props.token ? navigate("/checkout") : navigate("/login") }} role="button" className="bg-success p-2 w-100 text-center text-white rounded-pill">
                                    Process order
                                </span>
                            </div>
                        </div>
                    </>
                ) : (
                    <p>Cart is Empty</p>
                )}
            </div>
        </div>
    );
};

export default Basket;
