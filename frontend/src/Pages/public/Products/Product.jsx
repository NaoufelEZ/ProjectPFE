import { useEffect, useState } from "react";
import { ApiKey, APIURL, IMAGEURL } from "../../../Api/Api";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./productStyle.css";
import Header from "../../../Components/Header";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Loading from "../../../Components/Loading";
import Err404 from "../Errors/Err404";
import {colornames} from "color-name-list";

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
    const [change, setChange] = useState(0);
    const [sizeWithQuantity, setSizeWithQuantity] = useState([]);
    const [select, setSelect] = useState(() => {
        const data = localStorage.getItem("card");
        return data ? JSON.parse(data) : [];
    });

    const MySwal = withReactContent(Swal);

    // Color to hex mapping function
    const getHexColor = (colorName) => {
        if (!colorName) return '#cccccc';
        
        // Common color mappings
        const colorMap = {
            'white': '#ffffff',
            'black': '#000000',
            'red': '#ff0000',
            'blue': '#0000ff',
            'green': '#008000',
            'yellow': '#ffff00',
            'pink': '#ffc0cb',
            'purple': '#800080',
            'orange': '#ffa500',
            'brown': '#a52a2a',
            'gray': '#808080',
            'grey': '#808080',
            'espresso': '#4a3123',
            'beige': '#f5f5dc',
            'navy': '#000080',
            'maroon': '#800000',
            'teal': '#008080',
            'olive': '#808000',
            'nocturnal blue': '#324b55',
        };

        // Check if we have an exact match in our map
        const lowerColor = colorName.toLowerCase();
        if (colorMap[lowerColor]) {
            return colorMap[lowerColor];
        }

        // Try to find the nearest color from the library
        try {
            const colornames = colornames(lowerColor)[0];
            if (colornames) {
                return colornames.hex;
            }
        } catch (e) {
            console.warn(`Couldn't find color for: ${colorName}`);
        }

        // Default fallback
        return '#cccccc';
    };

    const updateSizeOptions = (selectedColor, stockData) => {
        const sizeOptions = stockData
            .filter(product => product.color === selectedColor)
            .map(product => ({
                size: product.size,
                quantity: product.quantity
            }));
        
        setSizeWithQuantity(sizeOptions);
        setSize(sizeOptions.map(item => item.size));
    };

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
                    updateSizeOptions(firstProduct.color, productData.product_stock);
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
            updateSizeOptions(selectedColor, data.product_stock);
        }
    };

    const handleClick = () => {
        setChange(prev => prev + 1);
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

        // Check stock availability
        if (selectedStock.quantity < count) {
            MySwal.fire({
                toast: true,
                position: "bottom-end",
                icon: "error",
                title: "Not enough stock available!",
                showConfirmButton: false,
                timer: 3000,
            });
            return;
        }

        const items = JSON.parse(localStorage.getItem("card")) || [];
        const newItem = {
            id: id,
            stock_id: selectedStock.id,
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
                                title={e}
                            >
                                <div 
                                    className="color-option" 
                                    style={{ backgroundColor: getHexColor(e) }}
                                    aria-label={`Select color ${e}`}
                                />
                            </div>
                        ))}
                    </div>
                </div>
                
                <div className="size-selection">
                    <h3>Size</h3>
                    <div className="size-options">
                        {sizeWithQuantity.map((item, key) => {
                            const isOutOfStock = item.quantity === 0;
                            const isFewLeft = item.quantity > 0 && item.quantity < 5;
                            
                            return (
                                <button
                                    key={key}
                                    onClick={() => { 
                                        if (!isOutOfStock) {
                                            setSelectedSize(item.size); 
                                            setSizeVerify(false); 
                                        }
                                    }}
                                    className={`size-option ${selectedSize === item.size ? 'selected' : ''} ${
                                        isOutOfStock ? 'out-of-stock' : ''
                                    }`}
                                    disabled={isOutOfStock}
                                >
                                    {item.size}
                                    {isOutOfStock && <span className="stock-indicator">X</span>}
                                    {isFewLeft && <span className="stock-indicator text-center">Low</span>}
                                </button>
                            );
                        })}
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
            <Header change={change} />
            {loading ? <Loading /> : (error ? <Err404 /> : dataFetch)}
        </div>
    );
};

export default Product;