import { useEffect, useState } from "react";
import dataTun from "../../../Assets/TunisianLocation/data.json";
import { Button, Form } from "react-bootstrap";
import { ApiKey, APIURL } from "../../../Api/Api";
import axios from "axios";
import Cookies from "universal-cookie";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const Address = () => {
    const [gov, setGov] = useState([]);
    const [data, setData] = useState([]);
    const [cite, setCite] = useState([]);
    const [deleg, setDeleg] = useState([]);
    const [selectedGov, setSelectedGov] = useState("");
    const [selectedDeleg, setSelectedDeleg] = useState("");
    const [selectedCite, setSelectedCite] = useState("");
    const [zip, setZip] = useState("");
    const [addresse, setAddresse] = useState("");
    const cookie = new Cookies();
    const token = cookie.get("auth");

    useEffect(() => {
        setGov([...new Set(dataTun.map((e) => e.Gov))]);
        setData(dataTun);
    }, []);

    useEffect(() => {
        if (selectedGov) {
            setDeleg([
                ...new Set(
                    data.filter((e) => e.Gov === selectedGov).map((e) => e.Deleg)
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
            setZip(
                data.filter(
                    (e) => e.Gov === selectedGov && e.Deleg === selectedDeleg && e.Cite === selectedCite
                )
            );
        } else {
            setZip([]);
        }
    }, [selectedCite]);

    const handleAddAddresse = async (e) => {
        e.preventDefault();
        try {
            await axios.post(
                `${APIURL}/address/add`,
                {
                    address: addresse,
                    state: selectedGov,
                    zip: zip[0]?.zip || "",
                    street: selectedCite,
                },
                {
                    headers: {
                        Accept: "application/json",
                        "x-api-key": ApiKey,
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            // ✅ Show success SweetAlert
            Swal.fire({
                title: "Success!",
                text: "Your address has been added successfully.",
                icon: "success",
                confirmButtonText: "OK",
            });

        } catch (err) {
            console.error(err);

            // ❌ Show error SweetAlert
            Swal.fire({
                title: "Error!",
                text: "Something went wrong. Please try again.",
                icon: "error",
                confirmButtonText: "OK",
            });
        }
    };

    return (
        <div>
            <Form onSubmit={handleAddAddresse}>
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

                <input type="text" value={selectedCite && zip.length > 0 ? zip[0].zip : ""} readOnly />
                <input type="text" onChange={(e) => setAddresse(e.target.value)} value={addresse} />

                <Button type="submit">Add Address</Button>
            </Form>
        </div>
    );
};

export default Address;
