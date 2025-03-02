import { useEffect, useRef, useState } from "react";
import dataTun from "../../../Assets/TunisianLocation/data.json";
import { Button, Form, Row, Toast } from "react-bootstrap";
import { ApiKey, APIURL } from "../../../Api/Api";
import axios from "axios";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import useCloseOut from "../../../Hook/useClose";

const AddressBox = () => {
    const [gov, setGov] = useState([]); 
    const [data, setData] = useState([]); 
    const [cite, setCite] = useState([]); 
    const [deleg, setDeleg] = useState([]); 
    const [selectedGov, setSelectedGov] = useState("");
    const [selectedDeleg, setSelectedDeleg] = useState("");
    const [selectedCite, setSelectedCite] = useState("");
    const [zip, setZip] = useState("");
    const [address, setAddress] = useState("");
    const [show,setShow] = useState(true);
    const cookie = new Cookies();
    const token = cookie.get("auth");
    const navigate = useNavigate();
    const toastRef = useRef(null);

    useEffect(() => {
        setGov([...new Set(dataTun.map((e) => e.Gov))]); 
        setData(dataTun);
    }, []);

    useEffect(() => {
        if (selectedGov) {
            setDeleg([
                ...new Set(
                    data
                        .filter((e) => e.Gov === selectedGov) 
                        .map((e) => e.Deleg) 
                ),
            ]);
        } else {
            setDeleg([]); 
        }
    }, [selectedGov]);

    useEffect(() => {
        if (selectedDeleg) {
            setCite([
                ...new Set(
                    data
                        .filter((e) => e.Gov === selectedGov && e.Deleg === selectedDeleg)
                        .map((e) => e.Cite) 
                ),
            ]);
        } else {
            setCite([]); 
        }
    }, [selectedDeleg]);

    useEffect(() => {
        if (selectedCite) {
            setZip(data.filter((e) => e.Gov === selectedGov && e.Deleg === selectedDeleg && e.Cite === selectedCite));
        } else {
            setCite([]); 
        }
    }, [selectedCite]);
    const handleAddAddress = async (e)=>{
        e.preventDefault();
        try{
        await axios.post(`${APIURL}/address/add`,{
            "address":address,
            "state":selectedGov,
            "zip":zip[0].zip,
            "street":selectedCite
        },
    {
        headers:{
            Accept:"application/json",
            "x-api-key":ApiKey,
            Authorization:`Bearer ${token}`,
        }
    })
    navigate("/checkout");
    }catch(err){
    console.error(err)
    }
    }
    useCloseOut(toastRef,setShow);
    
  return (
        <Toast ref={toastRef} show={show} onClose={()=>setShow(false)}>
        <Toast.Header>
            <strong className="me-auto">Add Address</strong>
        </Toast.Header>
        <Toast.Body>
        <Form onSubmit={handleAddAddress}>
            <Form.Group className="mb-3">
                <Form.Control placeholder="Address" type="text" value={address} onChange={(e)=>setAddress(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3 d-flex gap-3">
                <Form.Select  onChange={(e) => setSelectedGov(e.target.value)}>
                    <option value="" disabled selected>
                        Select Governorate
                    </option>
                    {gov.map((e, key) => (
                    <option key={key} value={e}>
                        {e}
                    </option>
                    ))}
                </Form.Select>
                <Form.Select  onChange={(e) => setSelectedDeleg(e.target.value)} disabled={!selectedGov}>
                <option value="" disabled selected>
                    Select Delegation
                </option>
                {deleg.map((e, key) => (
                    <option key={key} value={e}>
                        {e}
                    </option>
                ))}
            </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3 d-flex gap-3">
                <Form.Select  onChange={(e) => setSelectedCite(e.target.value)} disabled={!selectedDeleg}>
                    <option value="" disabled selected>
                        Select Cite
                    </option>
                    {cite.map((e, key) => (
                        <option key={key} value={e}>
                            {e}
                        </option>
                    ))}
                </Form.Select>
                <Form.Control placeholder="Zip Code" disabled={selectedCite.length === 0} type="text" value={(selectedCite && zip) && zip[0].zip}/>
            </Form.Group>
                <Button className="w-100" type="submit">Add Address</Button>
            </Form>
        </Toast.Body>

        </Toast>
  )
}

export default AddressBox