import { useEffect, useState } from "react";
import { ApiKey, APIURL, IMAGEURL } from "../../../Api/Api";
import { Button, Form } from "react-bootstrap";
import Cookies from "universal-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import flouci from "../../../Assets/images/flouci.png";
import delivery from "../../../Assets/images/delivery-van.png";

const Checkout = () => {
    const [carts, setCarts] = useState([]);
    const [total, setTotal] = useState(0);
    const [address,setAddress] = useState([]);
    const [payment,setPayment] = useState([{"method":"Flouci","icon":flouci},{"method":"Cash payment on delivery","icon":delivery}]);
    const [paymentChoose,setPaymentChoose] = useState(0);
    const cookie = new Cookies();
    const token = cookie.get("auth");
    const navigate = useNavigate();

    useEffect(() => {
        const storedData = window.localStorage.getItem("card");
        if (storedData) {
            setCarts(JSON.parse(storedData));
        }
    }, []);

    useEffect(() => {
        const totalPrice = carts.reduce((sum, e) => sum + e.price * e.count, 0);
        setTotal(totalPrice);
    }, [carts]);
    const deliveryFee = total <= 150 ? 7 : 0;
    useEffect(()=>{
        axios.get(`${APIURL}/address`,{
            headers:{
                Accept:"application",
                "x-api-key":ApiKey,
                Authorization:`Bearer ${token}`,
            }
        }).then((response)=>setAddress(response.data.data)).catch((err)=>{err.status === 500 && navigate("/")});
    },[]);

        const [selectedAddress, setSelectedAddress] = useState(null);
        const handleSelect = (index) => {
            setSelectedAddress(index);
        };

    return (
        <div className="d-flex w-100 p-3 gap-4">
        <table className="table w-100 align-middle">
            <tbody>
                {carts && carts.length > 0 ? (
                    carts.map((cart, key) => (
                        <tr className="border-1" key={key}>
                            <td className="w-25">
                                <img width={100} height={100} src={`${IMAGEURL}/products/${cart.image}`} alt="cart" />
                            </td>
                            <td className="w-50">x {cart.count} pieces</td>
                            <td className="w-25">{cart.price * cart.count} TND</td>
                        </tr>
                    ))
                
                ) : (
                <tr>
                    <td colSpan={3} className="text-center">Cart is empty</td>
                </tr>
                )}
                <tr className="border-1">
                    <td colSpan={2}>Cart subtotal</td>
                    <td>{total} TND</td>
                </tr>
                <tr className="border-1">
                    <td colSpan={2}>Delivery</td>
                    <td className={`${deliveryFee === 0 ? "text-success fw-bold h5" : "" }`}>{deliveryFee === 0 ? "Free" : deliveryFee + " TND"}</td>
                </tr>
                <tr className="border-1">
                    <td colSpan={2}>Order total</td>
                    <td className="fw-bold">{total + deliveryFee} TND</td>
                </tr>
            </tbody>
        </table>
        <div className="w-75 d-flex flex-column gap-4">
            <h4>Order summary</h4>
            <table className="table w-100">
                <tbody>
                    <tr className="border-1">
                        <h4>Delivery address</h4>
                        <div>
                            <Button type="button">Add New Address</Button>
                            <div style={{height:"200px"}} className="p-1 bg-light mt-2 rounded-2 overflow-x-auto">{address && address.length > 0 ? address.map((e,key)=>(<div className="p-1 bg-white mb-1" key={key}><label className="me-3">Choose as delivery address</label><Form>
                            <Form.Check
                                type="switch"
                                value={e.id}
                                name="address"
                                checked={selectedAddress === key}
                                onChange={() => handleSelect(key)}
                            />
            </Form><p>{e.address}</p><p>{e.state}</p><p>{e.street}</p><p>{e.zip}</p></div>)) : <p>You don't have any registered addresses, you must add a new address!</p>}</div>
                        </div>
                    </tr>
                    <tr className="border-1">
                        <div className="list-group">
                        <h4>Payment method</h4>
                        <div className="mt-3">
                            {payment.map((element,key)=>(
                                <Button key={key} onClick={()=>setPaymentChoose(key)} type="button" className={`list-group-item list-group-item-action mb-2 ${paymentChoose === key && "active"}`}><img className="me-2" width={30} src={element.icon} alt="flouci"/>{element.method}</Button>
                            ))}
                        </div>
                </div>
            </tr>
        </tbody>
    </table>
        <Button className="w-50" type="button">{paymentChoose === 1 ? "Place order" : `Payer (${total + deliveryFee} TND)`}</Button>
        </div>
        </div>
    );
};

export default Checkout;
