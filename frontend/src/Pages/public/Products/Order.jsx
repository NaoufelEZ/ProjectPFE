import { useEffect, useState } from "react";
import dataTun from "../../../Assets/TunisianLocation/data.json";

const Order = () => {
    const [gov, setGov] = useState([]); 
    const [data, setData] = useState([]); 
    const [cite, setCite] = useState([]); 
    const [deleg, setDeleg] = useState([]); 
    const [selectedGov, setSelectedGov] = useState("");
    const [selectedDeleg, setSelectedDeleg] = useState("");
    const [selectedCite, setSelectedCite] = useState("");
    const [zip, setZip] = useState("");

    useEffect(() => {
        setGov([...new Set(dataTun.map((e) => e.Gov))]); // Extract unique Gov names
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

    return (
        <div>
            <select onChange={(e) => setSelectedGov(e.target.value)}>
                <option value="" disabled selected>
                    Select Governorate
                </option>
                {gov.map((e, key) => (
                    <option key={key} value={e}>
                        {e}
                    </option>
                ))}
            </select>

            <select onChange={(e) => setSelectedDeleg(e.target.value)} disabled={!selectedGov}>
                <option value="" disabled selected>
                    Select Delegation
                </option>
                {deleg.map((e, key) => (
                    <option key={key} value={e}>
                        {e}
                    </option>
                ))}
            </select>

            <select onChange={(e) => setSelectedCite(e.target.value)} disabled={!selectedDeleg}>
                <option value="" disabled selected>
                    Select Cite
                </option>
                {cite.map((e, key) => (
                    <option key={key} value={e}>
                        {e}
                    </option>
                ))}
            </select>
            <input type="text" value={(selectedCite && zip) && zip[0].zip}/>
        </div>
    );
};

export default Order;
