import { useEffect, useState } from "react";
import { ApiKey, APIURL, IMAGEURL } from "../../../Api/Api";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./productStyle.css";
import Header from "../../../Components/Header";
import { Button } from "react-bootstrap";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Loading from "../../../Components/Loading";
import Err404 from "../Errors/Err404";

const Product = () => {
    const { id } = useParams();
    const [data, setData] = useState(null);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);
    const [uniqueColor, setUniqueColor] = useState([]);
    const [selectedImage, setSelectedImage] = useState("");
    const [color, setColor] = useState("");
    const [size, setSize] = useState([]);
    const [selectedSize, setSelectedSize] = useState(null);
    const [count, setCount] = useState(1);
    const [discount, setDiscount] = useState(0);
    const [sizeVerify, setSizeVerify] = useState(false);
    const [select, setSelect] = useState(() => {
        const data = localStorage.getItem("card");
        return data ? JSON.parse(data) : [];
    });

    const MySwal = withReactContent(Swal);
    const nav = useNavigate();

    useEffect(() => {
        axios
            .get(`${APIURL}/products/product/${id}`, {
                headers: {
                    Accept: "application/json",
                    "x-api-key": ApiKey
                }
            })
            .then((response) => {
                const productData = response.data.data;
                setData(productData);
                setLoading(false);

                // Extract unique colors from stock
                const colors = [...new Set(productData.product_stock.map(product => product.color))];
                setUniqueColor(colors);

                if (productData.product_stock.length > 0) {
                    const firstProduct = productData.product_stock[0];
                    setColor(firstProduct.color);
                    setSelectedImage(firstProduct.product_picture);

                    // Get available sizes for the first color
                    const sizeOptions = productData.product_stock
                        .filter(product => product.color === firstProduct.color)
                        .map(product => product.size);
                    setSize([...new Set(sizeOptions)]);
                }
            })
            .catch(() => setError(true))
            .finally(() => setLoading(false));
    }, [id]);

    useEffect(() => {
        if (data) {
            const productDiscount = data.discount !== 0 ? (data.price / 100) * data.discount : 0;
            setDiscount(productDiscount);
        }
    }, [data]);

    const handleColorSelect = (selectedColor) => {
        setColor(selectedColor);
        setSelectedSize(null);
        setSizeVerify(false);

        // Find the corresponding image and available sizes
        const stockForSelectedColor = data.product_stock.filter(product => product.color === selectedColor);
        if (stockForSelectedColor.length > 0) {
            setSelectedImage(stockForSelectedColor[0].product_picture);
            const newSizeOptions = stockForSelectedColor.map(product => product.size);
            setSize([...new Set(newSizeOptions)]);
        }
    };

    const handleClick = () => {
        if (!selectedSize) {
            setSizeVerify(true);
            return;
        }

        // Find the matching product stock entry
        const selectedStock = data.product_stock.find(
            (product) => product.color === color && product.size === selectedSize
        );

        if (!selectedStock) {
            MySwal.fire({
                toast: true,
                position: "bottom-end",
                icon: "error",
                title: "Stock not found for selected color and size!",
                showConfirmButton: false,
                timer: 3000,
            });
            return;
        }

        const items = JSON.parse(localStorage.getItem("card")) || [];
        const newItem = {
            id: id, // product_id
            stock_id: selectedStock.id, // product_stock.id
            title: data.title,
            price: discount === 0 ? data.price : data.price - discount,
            image: selectedImage,
            color: color,
            size: selectedSize,
            count: count
        };

        const existingItem = items.find(item =>
            item.stock_id === newItem.stock_id
        );

        if (!existingItem) {
            const updatedCart = [...items, newItem];
            setSelect(updatedCart);
            localStorage.setItem("card", JSON.stringify(updatedCart));

            MySwal.fire({
                toast: true,
                position: "bottom-end",
                icon: "success",
                title: "The product has been added to the basket!",
                showConfirmButton: false,
                timer: 3000,
            });
        } else {
            MySwal.fire({
                toast: true,
                position: "bottom-end",
                icon: "error",
                title: "Required quantity exceeds the available quantity!",
                showConfirmButton: false,
                timer: 3000,
            });
        }
    };

    const dataFetch = data ? (
        <div className="d-flex w-100 bg-light text-dark p-3">
            <div className="me-3">
                <img width={500} src={`${IMAGEURL}/products/${selectedImage}`} alt="product" />
            </div>
            <div className="w-100 mb-4">
                <p>{data.title}</p>
                {discount === 0 ? (
                    <p>{data.price.toFixed(2)} TND</p>
                ) : (
                    <div>
                        <span className="h5 text-black me-3">{(data.price - discount).toFixed(2)}</span>
                        <span className="text-decoration-line-through text-secondary">{data.price}</span>
                    </div>
                )}
                <p>Color</p>
                <p>{color}</p>
                <div className="d-flex w-100 gap-1">
                    {uniqueColor.map((e, index) => (
                        <div key={index} onClick={() => handleColorSelect(e)} className="border border-1 border-dark rounded-circle p-1 s">
                            <span role="button" className={`${color === e && "sizing"} rounded-circle d-block`} style={{ height: "30px", width: "30px", backgroundColor: e }}></span>
                        </div>
                    ))}
                </div>
                <p>Size</p>
                <div className="d-flex">
                    {size.map((e, key) => (
                        <div key={key} onClick={() => { setSelectedSize(e); setSizeVerify(false); }} role="button" style={{ height: "30px", width: "30px" }} className={`${selectedSize === e && "bg-dark text-white"} bg-light rounded-circle text-dark me-2 d-flex justify-content-center align-items-center border border-2`}>
                            {e}
                        </div>
                    ))}
                </div>
                {sizeVerify && <p className="text-danger">Select a size</p>}
                <span className="mb-3">Quantity</span>
                <div style={{ width: "100px" }} className="p-2 border-white d-flex justify-content-between align-items-center bg-white rounded-4 text-dark mb-3">
                    <span className="user-select-none" role="button" onClick={() => count !== 1 && setCount(prev => prev - 1)}>-</span>
                    <span>{count}</span>
                    <span className="user-select-none" role="button" onClick={() => setCount(prev => prev + 1)}>+</span>
                </div>
                <Button onClick={handleClick} type="button">Add to Cart</Button>
            </div>
        </div>
    ) : null;

    return (
        <div>
            <Header />
            {loading ? <Loading /> : (error ? <Err404 /> : dataFetch)}
        </div>
    );
};

export default Product;
