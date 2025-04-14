import { faClose, faHeart, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useRef, useState } from 'react'
import { IMAGEURL } from '../Api/Api';
import { useNavigate } from 'react-router-dom';
import "./basket.css";
import useCloseOut from '../Hooks/useClose';
import useUser from '../Hooks/useUser';

const Basket = (props) => {
    const [storage, setStorage] = useState([]);
    const [total, setTotal] = useState(0);
    const navigate = useNavigate();
    const basketRef = useRef(null);
    const user = useUser();

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
    const freeDeliveryThreshold = 150;

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
            className="basket-content"
        >
            {/* Header Section */}
            <div className="basket-header">
                <div className="close-btn">
                    <FontAwesomeIcon 
                        icon={faClose} 
                        onClick={() => props.setBasket(false)}
                    />
                </div>
                <div className="basket-title-container">
                    <h3 className="basket-title">Basket</h3>
                    {props.token && (
                        <div className="wishlist-btn">
                            <FontAwesomeIcon className="heart-icon" icon={faHeart} />
                            <span onClick={()=>navigate("/wishlist")}>Wishlist</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Items Section */}
            <div className="basket-items-container">
                {storage && storage.length > 0 ? (
                    <>
                        <div className="items-scrollable">
                            {storage.map((e, key) => (
                                <div key={key} className="basket-item">
                                    <img 
                                        className="item-image" 
                                        src={`${IMAGEURL}/products/${e.image}`} 
                                        alt="product" 
                                    />
                                    <div className="item-details">
                                        <div className="item-header">
                                            <p className="item-price">{parseFloat(e.price * e.count).toFixed(2)} TND</p>
                                            <FontAwesomeIcon 
                                                className="delete-icon" 
                                                icon={faTrash} 
                                                onClick={() => handleDelete(key)} 
                                            />
                                        </div>
                                        <p className="item-title">{e.title}</p>
                                        <div className="item-meta">
                                            <span className="item-size">{e.size}</span>
                                            <span className="item-quantity">{e.count}x</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Delivery Notice */}
                        {total < freeDeliveryThreshold && (
                            <div className="delivery-notice">
                                Add {(freeDeliveryThreshold - total).toFixed(2)} TND more to get free delivery
                            </div>
                        )}

                        {/* Checkout Section */}
                        <div className="checkout-section">
                            <div className="price-row">
                                <span>Subtotal:</span>
                                <span className="price">{total.toFixed(2)} TND</span>
                            </div>
                            <div className="price-row">
                                <span>Delivery costs</span>
                                <span className={`price ${deliveryFee === 0 ? "free-delivery" : ""}`}>
                                    {deliveryFee === 0 ? "Free" : deliveryFee + " TND"}
                                </span>
                            </div>
                            <div className="total-row">
                                <span>Total</span>
                                <span className="total-price">{(total + deliveryFee).toFixed(2)} TND</span>
                            </div>

                            {user && !user.email_verify && (
                                <div className="email-warning-box">
                                <p>Please verify your email to proceed with checkout.</p>
                                <div className="triangle"></div>
                                </div>
                            )}


                            <button 
                            disabled={user?.email_verify}
                                className="checkout-btn"
                                onClick={() => props.token ? user.email_verify ? navigate("/checkout") : null : navigate("/login")}
                            >
                                Process order
                            </button>
                        </div>
                    </>
                ) : (
                    <div className="empty-basket">
                        <p>Your basket is empty</p>
                        <button 
                            className="continue-shopping-btn"
                            onClick={() => props.setBasket(false)}
                        >
                            Continue Shopping
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Basket;