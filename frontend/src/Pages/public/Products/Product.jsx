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
        <div className="product-container">
            <div className="product-gallery">
                <div className="main-image">
                    <img src={`${IMAGEURL}/products/${selectedImage}`} alt={data.title} />
                </div>
            </div>
            
            <div className="product-details">
                <h1 className="product-title">{data.title}</h1>
                
                <div className="price-container">
                    {discount === 0 ? (
                        <span className="current-price">{data.price.toFixed(2)} TND</span>
                    ) : (
                        <>
                            <span className="current-price">{(data.price - discount).toFixed(2)} TND</span>
                            <span className="original-price">{data.price.toFixed(2)} TND</span>
                            <span className="discount-badge">-{data.discount}%</span>
                        </>
                    )}
                </div>
                
                <div className="color-selection">
                    <h3>Color: <span className="selected-color">{color}</span></h3>
                    <div className="color-options">
                        {uniqueColor.map((e, index) => (
                            <div 
                                key={index} 
                                onClick={() => handleColorSelect(e)} 
                                className={`color-option-container ${color === e ? 'selected' : ''}`}
                            >
                                <div 
                                    className="color-option" 
                                    style={{ backgroundColor: e }}
                                    aria-label={`Select color ${e}`}
                                />
                            </div>
                        ))}
                    </div>
                </div>
                
                <div className="size-selection">
                    <h3>Size</h3>
                    <div className="size-options">
                        {size.map((e, key) => (
                            <button
                                key={key}
                                onClick={() => { setSelectedSize(e); setSizeVerify(false); }}
                                className={`size-option ${selectedSize === e ? 'selected' : ''}`}
                            >
                                {e}
                            </button>
                        ))}
                    </div>
                    {sizeVerify && <p className="size-error">Please select a size</p>}
                </div>
                
                <div className="quantity-selection">
                    <h3>Quantity</h3>
                    <div className="quantity-selector">
                        <button 
                            onClick={() => count !== 1 && setCount(prev => prev - 1)}
                            disabled={count === 1}
                        >
                            -
                        </button>
                        <span>{count}</span>
                        <button onClick={() => setCount(prev => prev + 1)}>+</button>
                    </div>
                </div>
                
                <button className="add-to-cart" onClick={handleClick}>
                    Add to Cart
                </button>
                
                <div className="product-description">
                    <h3>Product Details</h3>
                    <p>{data.description || "No description available."}</p>
                </div>
            </div>
        </div>
    ) : null;

    return (
        <div className="product-page">
            <Header />
            {loading ? <Loading /> : (error ? <Err404 /> : dataFetch)}
        </div>
    );
};

export default Product;