import { faClose, faHeart, faPen, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { IMAGEURL } from '../Api/Api';
import { useNavigate } from 'react-router-dom';
import "./basket.css";
import useCloseOut from '../Hooks/useClose';
import useUser from '../Hooks/useUser';
import { BasketContext } from '../Context/BasketContext';
import EditProduct from './EditProduct'; // Import the new component

const Basket = (props) => {
    const [storage, setStorage] = useState([]);
    const [total, setTotal] = useState(0);
    const [showEdit, setShowEdit] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [editingIndex, setEditingIndex] = useState(null);
    const navigate = useNavigate();
    const basketRef = useRef(null);
    const user = useUser();
    const {setBasketChange} = useContext(BasketContext)

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

    const handleDelete = (productIndex) => {
        setBasketChange(prev => prev + 1)
        const newStorage = storage.filter((e, key) => key !== productIndex);
        setStorage(newStorage);
        window.localStorage.setItem("card", JSON.stringify(newStorage));
    };

    // New function to handle editing
    const handleEdit = (product, index) => {
        setEditingProduct(product);
        setEditingIndex(index);
        setShowEdit(true);
    };

    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "unset";
        };
    }, []);
    console.log(user)


    return (
        <>
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
                                                <div>
                                                <FontAwesomeIcon 
                                                    className="edit-icon me-3" 
                                                    icon={faPen} 
                                                    onClick={() => handleEdit(e, key)} 
                                                />
                                                <span className="border border-1 me-3"></span>
                                                <FontAwesomeIcon 
                                                    className="delete-icon" 
                                                    icon={faTrash} 
                                                    onClick={() => handleDelete(key)} 
                                                />
                                                </div>
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
                                disabled={user ? user.email_verify === true && false : false}
                                    className="checkout-btn"
                                    onClick={() => {
                                        console.log("first")
                                        if(user){
                                            console.log("first")
                                            if(user.email_verify ){
                                                navigate("/checkout");
                                            }

                                        }else{
                                            console.log("first error")
                                            props.setBasket(false);
                                            props.login(true);
                                            
                                        }
                                        }
                                
                                }
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
            
            {/* Render the Edit Product component when showEdit is true */}
            {showEdit && editingProduct && (
                <EditProduct 
                    product={editingProduct}
                    index={editingIndex}
                    setShowEdit={setShowEdit}
                    storage={storage}
                    setStorage={setStorage}
                />
            )}
        </>
    );
};

export default Basket;