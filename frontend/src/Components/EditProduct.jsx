import React, { useState, useEffect, useRef } from 'react';
import { ApiKey, APIURL, IMAGEURL } from '../Api/Api';
import useCloseOut from '../Hooks/useClose';
import { FaArrowLeft } from 'react-icons/fa';
import axios from 'axios';
import { colornames } from 'color-name-list';
import './edit-product.css';

const EditProduct = ({ product, index, setShowEdit, storage, setStorage }) => {
  const [size, setSize] = useState(product.size);
  const [color, setColor] = useState(product.color);
  const [quantity, setQuantity] = useState(product.count);
  const [productSizes, setProductSizes] = useState([]);
  const [productColors, setProductColors] = useState([]);
  const [selectProduct, setSelectProduct] = useState();
  const editRef = useRef(null);

  useCloseOut(editRef, setShowEdit);
  console.log(product)

  const getHexColor = (inputColor) => {
    if (!inputColor) return "#cccccc";
    const colors = [...new Map(colornames.map(c => [c.name, c])).values()]
      .sort((a, b) => a.name.localeCompare(b.name));
    const filteredColors = colors.filter(c => 
      c.name.toLowerCase().includes(inputColor.toLowerCase())
    );
    return filteredColors.length > 0 ? filteredColors[0].hex : "#cccccc";
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = "unset"; };
  }, []);

  useEffect(() => {
    axios.get(`${APIURL}/products/product/${product.id}`, {
      headers: {
        Accept: "application/json",
        "x-api-key": ApiKey,
      }
    })
    .then((response) => {
      const productData = response.data.data;
      setSelectProduct(productData);
      const sizes = [...new Set(productData.product_stock.map((e) => e.size))];
      const colors = [...new Set(productData.product_stock.map((e) => e.color))];
      setProductSizes(sizes);
      setProductColors(colors);
    })
    .catch((error) => {
      console.error("Error fetching product:", error);
    });
  }, []);

  const handleQuantityChange = (type) => {
    setQuantity(prev => type === 'increase' ? prev + 1 : Math.max(prev - 1, 1));
  };

  const handleSave = () => {
    const updatedStorage = [...storage];
    updatedStorage[index] = {
      ...product,
      size,
      color,
      count: quantity
    };
    window.localStorage.setItem("card", JSON.stringify(updatedStorage));
    setStorage(updatedStorage);
    setShowEdit(false);
  };
  console.log(selectProduct)

  return (
    <div className="edit-product-overlay">
      <div ref={editRef} className="edit-product-content">
        {/* Header */}
        <div className="edit-header">
          <button className="back-button" onClick={() => setShowEdit(false)}>
            <FaArrowLeft className="back-icon me-3" /> Edit
          </button>
        </div>

        {/* Product Details */}
        <div className="edit-product-details">
          <div className="product-images-container">
          {selectProduct?.product_stock[0]?.holder_product_picture && (
            <img 
                src={`${IMAGEURL}/products/${selectProduct.product_stock[0].holder_product_picture}`} 
                alt="Second view" 
                className="product-image" 
            />
        )}

            <img src={`${IMAGEURL}/products/${product.image}`} alt={product.title} className="product-image" />
          </div>
          <div className="product-info">
            <p className="product-price">{parseFloat(product.price).toFixed(2)} TND</p>
            <h3 className="product-title">{product.title}</h3>
          </div>
        </div>

        {/* Size Selection */}
        <div className="size-selection">
          <h4>Size</h4>
          <div className="size-options">
            {productSizes.map((sizeOption) => (
              <button
                key={sizeOption}
                className={`size-button ${size === sizeOption ? 'selected' : ''}`}
                onClick={() => setSize(sizeOption)}
              >
                {sizeOption}
              </button>
            ))}
          </div>
        </div>

        {/* Color Selection */}
        <div className="size-selection">
          <h4>Color</h4>
          <div className="color-options">
            {productColors.map((colorOption) => (
              <button
                key={colorOption}
                style={{ backgroundColor: getHexColor(colorOption) }}
                className={`color-button ${color === colorOption ? 'selected' : ''}`}
                onClick={() => setColor(colorOption)}
              >
                {color === colorOption && <span className="checkmark">✓</span>}
              </button>
            ))}
          </div>
        </div>

        {/* Quantity */}
        <div className="quantity-selection">
          <h4>Quantity</h4>
          <div className="quantity-controls">
            <button 
              className="quantity-button" 
              onClick={() => handleQuantityChange('decrease')}
              disabled={quantity <= 1}
            >
              -
            </button>
            <span className="quantity-value">{quantity}</span>
            <button 
              className="quantity-button"
              onClick={() => handleQuantityChange('increase')}
            >
              +
            </button>
          </div>
        </div>

        {/* Save */}
        <div className="save-button-container">
          <button className="save-button" onClick={handleSave}>SAVE</button>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
