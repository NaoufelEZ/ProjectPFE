import { useEffect, useState } from "react";
import { ApiKey, APIURL, IMAGEURL } from "../../../Api/Api";
import { Button, Form } from "react-bootstrap";
import Cookies from "universal-cookie";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import flouci from "../../../Assets/images/flouci.png";
import delivery from "../../../Assets/images/delivery-van.png";
import AddressBox from "./AddressBox";

const Checkout = () => {
    const [carts, setCarts] = useState([]);
    const [total, setTotal] = useState(0);
    const [address,setAddress] = useState([]);
    const [payment,setPayment] = useState([{"method":"Flouci","icon":flouci},{"method":"Cash payment on delivery","icon":delivery}]);
    const [paymentChoose,setPaymentChoose] = useState(1);
    const [popup,setPopup] = useState(false);
    const [user,setUser] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const cookie = new Cookies();
    const token = cookie.get("auth");
    const navigate = useNavigate();

    useEffect(() => {
        const storedData = window.localStorage.getItem("card");
        if (storedData) {
            setCarts(JSON.parse(storedData));
        }
    }, []);
    useEffect(()=>{
        axios.get(`${APIURL}/user`,{
          headers:{
            Accept:"application/json",
            Authorization:`Bearer ${token}`,
            "x-api-key":ApiKey,
          }
        }).then((response)=>setUser(response.data.data));
      },[]);

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
        }).then((response)=>setAddress(response.data.data))
        .catch((err)=>{err.status === 500 && navigate("/")});
    },[]);

        const handleSelect = (index) => {
            axios.put(`${APIURL}/address/default/update/${index}`,{},{
                headers:{
                    Accept:"application",
                    "x-api-key":ApiKey,
                    Authorization:`Bearer ${token}`,
                }
            })
            setSelectedAddress(index);
        };
       const formData = new FormData();
       formData.append("user_id",user.id);
       formData.append("address_id",selectedAddress);
       formData.append("paymentChoose",payment[paymentChoose].method);
       carts.forEach((item)=>{
        formData.append("product_id[]",item.id);
        formData.append("color[]",item.color);
        formData.append("size[]",item.size);
        formData.append("price[]",item.price);
        formData.append("quantity[]",item.count);
    });
    //    for (let [key, value] of formData.entries()) {
    //     console.log(`${key}: ${value}`);
    // }
       const handleOrder = async (e)=>{
        e.preventDefault();
        if(selectedAddress !== null){
        try{
        await axios.post(`${APIURL}/order/add`,formData,
            {
                headers:{
                    Accept:"application",
                    "x-api-key":ApiKey,
                    Authorization:`Bearer ${token}`,
                    }
            });
            localStorage.removeItem("card");
            navigate("/");
        }catch(err){
            console.log(err)
        }
        }
       }
    return (
        <Form onSubmit={handleOrder} className="d-flex w-100 p-3 gap-4">
        {popup ? <div style={{height:"100vh"}} className="position-absolute w-100 d-flex justify-content-center align-items-center "><AddressBox setOpen={setPopup} /></div> : null}
        <table className="table w-100 align-middle">
            <tbody>
                {carts && carts.length > 0 ? (
                    carts.map((cart, key) => (
                        <tr className="border-1" key={key}>
                            <td className="w-25">
                                <img width={100} height={100} src={`${IMAGEURL}/products/${cart.image}`} alt="cart" />
                            </td>
                            <td className="w-50">x {cart.count} pieces</td>
                            <td className="w-25">{(cart.price * cart.count).toFixed(2)} TND</td>
                        </tr>
                    ))
                
                ) : (
                <tr>
                    <td colSpan={3} className="text-center">Cart is empty</td>
                </tr>
                )}
                <tr className="border-1">
                    <td colSpan={2}>Cart subtotal</td>
                    <td>{(total).toFixed(2)} TND</td>
                </tr>
                <tr className="border-1">
                    <td colSpan={2}>Delivery</td>
                    <td className={`${deliveryFee === 0 ? "text-success fw-bold h5" : "" }`}>{deliveryFee === 0 ? "Free" : deliveryFee + " TND"}</td>
                </tr>
                <tr className="border-1">
                    <td colSpan={2}>Order total</td>
                    <td className="fw-bold">{(total + deliveryFee).toFixed(2)} TND</td>
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
                            <Button onClick={()=>setPopup(prev => true)} type="button">Add New Address</Button>
                            <div style={{ height:address && address.length > 0 ? "200px" : "auto"}} className="p-1 bg-light mt-2 rounded-2 overflow-x-auto">{address && address.length > 0 ? address.map((e,key)=>(<div className="p-1 bg-white mb-1" key={key}><label className="me-3">Choose as delivery address</label><Form>
                            <Form.Check
                                type="switch"
                                value={e.id}
                                name="address"
                                checked={selectedAddress === e.id}
                                onChange={() => handleSelect(e.id)}
                            />
                        </Form><p>{e.address}</p><p>{e.state}</p><p>{e.street}</p><p>{e.zip}</p></div>)) : <p>You don't have any registered addresses, you must add a new address!</p>}</div>
                        </div>
                    </tr>
                    <tr className="border-1">
                        <div className="list-group">
                        <h4>Payment method</h4>
                        <div className="mt-3">
                            {payment.map((element,key)=>(
                                <Button key={key} onClick={()=>setPaymentChoose(key)} disabled={element.method === "Flouci"} type="button" className={`list-group-item list-group-item-action mb-2  ${paymentChoose === key && "active"}`}><img className="me-2" width={30} src={element.icon} alt="method"/>{element.method}{element.method === "Flouci" && " (Coming Soon)"}</Button>
                            ))}
                        </div>
                </div>
            </tr>
        </tbody>
    </table>
        <Button className="w-50" type="submit">{paymentChoose === 1 ? "Place order" : `Payer (${total + deliveryFee} TND)`}</Button>
        </div>
        </Form>
    );
};

export default Checkout;
