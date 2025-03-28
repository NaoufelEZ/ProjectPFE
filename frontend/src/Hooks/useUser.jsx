import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import axios from "axios";
import { ApiKey, APIURL } from "../Api/Api";
import { useNavigate } from "react-router-dom"; 

function useUser() {
    const cookie = new Cookies();
    const token = cookie.get("auth");
    const [user, setUser] = useState(null);
    const navigate = useNavigate(); 

    useEffect(() => {
        if (token) {
            axios.get(`${APIURL}/user`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "x-api-key": ApiKey,
                },
            })
            .then((response) => setUser(response.data.data))
            .catch(() => {
                cookie.remove("auth", { path: "/" });
                navigate("/");
            });
        }
    }, [token, navigate]);

    return user;
}
export default useUser;