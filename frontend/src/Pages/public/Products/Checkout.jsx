import { useEffect, useState } from "react";
import { IMAGEURL } from "../../../Api/Api";

const Checkout = () => {
    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(0);
    const deliveryFee = 7;

    useEffect(() => {
        const storedData = window.localStorage.getItem("card");
        if (storedData) {
            setCart(JSON.parse(storedData));
        }
    }, []);

    useEffect(() => {
        const totalPrice = cart.reduce((sum, e) => sum + e.price, 0);
        setTotal(totalPrice);
    }, [cart]);

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center py-10 px-5">
            <div className="w-full max-w-5xl bg-white shadow-2xl rounded-2xl p-8">
                <h1 className="text-4xl font-bold text-center mb-8">Checkout</h1>
                {cart.length > 0 ? (
                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Cart Items */}
                        <div className="col-span-1 p-6 border rounded-xl shadow-lg bg-gray-50">
                            <h2 className="text-xl font-semibold mb-4">Your Cart</h2>
                            <div className="space-y-4 max-h-96 overflow-auto">
                                {cart.map((e, key) => (
                                    <div key={key} className="flex items-center gap-4 border-b pb-3">
                                        <img
                                            width={64}
                                            height={64}
                                            src={`${IMAGEURL}/products/${e.image}`}
                                            alt="product"
                                            className="w-20 h-20 rounded-lg object-cover"
                                        />
                                        <div>
                                            <h3 className="font-medium text-lg">{e.title}</h3>
                                            <p className="text-gray-600">{e.price} TND</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        
                        {/* Delivery Address */}
                        <div className="col-span-1 p-6 border rounded-xl shadow-lg bg-gray-50">
                            <h2 className="text-xl font-semibold mb-4">Delivery Address</h2>
                            <div className="space-y-3">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="radio" name="address" className="form-radio text-blue-600" checked />
                                    <span>Mannouba, Borj El Amri, 1113, Tunisia</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="radio" name="address" className="form-radio text-blue-600" />
                                    <span>Monastir, Bekalta, 5090, Tunisia</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="radio" name="address" className="form-radio text-blue-600" />
                                    <span>Medenine, Medenine Nord, 4100, Tunisia</span>
                                </label>
                                <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">Add New Address</button>
                            </div>
                        </div>

                        {/* Order Summary */}
                        <div className="col-span-1 p-8 border rounded-xl shadow-xl bg-gradient-to-br from-blue-200 to-blue-50">
                            <h2 className="text-2xl font-extrabold mb-6 text-center text-blue-900">Order Summary</h2>
                            <div className="space-y-6 p-6 bg-white rounded-xl shadow-md border border-blue-200">
                                <div className="flex justify-between text-gray-700 font-semibold text-lg">
                                    <span>Subtotal:</span>
                                    <span>{total.toFixed(2)} TND</span>
                                </div>
                                <div className="flex justify-between text-gray-700 font-semibold text-lg">
                                    <span>Delivery Fee:</span>
                                    <span>{deliveryFee} TND</span>
                                </div>
                                <hr className="my-4 border-gray-300" />
                                <div className="flex justify-between text-3xl font-extrabold text-blue-900">
                                    <span>Total:</span>
                                    <span>{(total + deliveryFee).toFixed(2)} TND</span>
                                </div>
                            </div>
                            
                            {/* Payment Method */}
                            <h2 className="text-xl font-semibold mt-6 mb-4">Payment Method</h2>
                            <div className="space-y-3">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="radio" name="payment" className="form-radio text-blue-600" checked />
                                    <span>Credit Card (Online Payment)</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="radio" name="payment" className="form-radio text-blue-600" />
                                    <span>Cash on Delivery</span>
                                </label>
                            </div>

                            <button className="mt-8 w-full bg-gradient-to-r from-blue-600 to-blue-800 text-white py-4 rounded-lg text-xl font-bold hover:from-blue-700 hover:to-blue-900 transition-transform transform hover:scale-105 shadow-lg hover:shadow-xl">Confirm Order</button>
                        </div>
                    </div>
                ) : (
                    <p className="text-center text-gray-500 text-lg">Your cart is empty</p>
                )}
            </div>
        </div>
    );
};

export default Checkout;
