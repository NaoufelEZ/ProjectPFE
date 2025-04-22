import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useEffect } from 'react';
import { Accordion, Button } from 'react-bootstrap';
import './filter.css';
import { colornames } from 'color-name-list';

const Filter = ({ isOpen, setIsOpen, products = [], setFilterProduct }) => {
  const [sortBy, setSortBy] = useState('');
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [priceRange, setPriceRange] = useState([0, 0]);

  const getHexColor = (colorName) => {
    if (!colorName) return '#cccccc';
    
    const colors = [...new Map(colornames.map(color => [color.name, color])).values()]
    .sort((a, b) => a.name.localeCompare(b.name));
  
    // Filter colors based on search input
    const filteredColors = colors.filter(color =>
      color.name.toLowerCase().includes(colorName.toLowerCase())
    );
    return filteredColors.length > 0 ? filteredColors[0].hex : '#cccccc'; // Default to gray if no match found
   
};

  useEffect(() => {
    if (Array.isArray(products) && products.length > 0) {
      const prices = products.map(product => product.price);
      const minP = Math.min(...prices);
      const maxP = Math.max(...prices);
      setMinPrice(minP);
      setMaxPrice(maxP);
      setPriceRange([minP, maxP]);
    }
  }, [products]);

  const productColors = Array.isArray(products)
    ? [...new Set(products.flatMap(p => (p.product_stock ? p.product_stock.map(s => s.color) : [])))]
    : [];

  const productSizes = Array.isArray(products)
    ? [...new Set(products.flatMap(p => (p.product_stock ? p.product_stock.map(s => s.size) : [])))]
    : [];

  const handleSort = (order) => {
    setSortBy(order);
    let sortedProducts = [...products];

    if (order === 'newIn') {
      sortedProducts.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    } else if (order === 'lowToHigh') {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (order === 'highToLow') {
      sortedProducts.sort((a, b) => b.price - a.price);
    }

    setFilterProduct(sortedProducts);
  };

  const handleColorSelect = (color) => {
    setSelectedColors(prev => prev.includes(color) ? prev.filter(c => c !== color) : [...prev, color]);
  };

  const handleSizeSelect = (size) => {
    setSelectedSizes(prev => prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]);
  };

  const handleFilter = () => {
    const filteredProducts = products.filter(product =>
      product.price >= priceRange[0] && product.price <= priceRange[1] &&
      (selectedColors.length === 0 || product.product_stock?.some(s => selectedColors.includes(s.color))) &&
      (selectedSizes.length === 0 || product.product_stock?.some(s => selectedSizes.includes(s.size)))
    );
    setFilterProduct(filteredProducts);
  };

  const handleClear = () => {
    setSortBy('');
    setSelectedColors([]);
    setSelectedSizes([]);
    setPriceRange([minPrice, maxPrice]);
    setFilterProduct(products);
  };

  return (
    <section className={`filter ${isOpen ? 'show' : ''}`}>
      <div className="filter-content">
        <div className="filter-header">
          <span className="filter-title">Filter</span>
          <FontAwesomeIcon onClick={() => setIsOpen(false)} role="button" className="close-btn" icon={faClose} />
        </div>
        <hr />

        {/* Sort By Section - Now Vertical */}
        <div className="sort-by-section">
          <span className="sort-title">Sort By:</span>
          <div className="sort-options d-flex">
            <Button className={`sort-btn ${sortBy === 'newIn' ? 'active' : ''}`} onClick={() => handleSort('newIn')}>New In</Button>
            <Button className={`sort-btn ${sortBy === 'lowToHigh' ? 'active' : ''}`} onClick={() => handleSort('lowToHigh')}>Low to High</Button>
            <Button className={`sort-btn ${sortBy === 'highToLow' ? 'active' : ''}`} onClick={() => handleSort('highToLow')}>High to Low</Button>
          </div>
        </div>

        {/* Color Filter */}
        <Accordion>
          <Accordion.Button className="accordion-button">Colors</Accordion.Button>
          <Accordion.Body>
            <div className="color-options">
              {productColors.map(color => (
                <button key={color} className={`color-btn ${selectedColors.includes(color) ? 'selected' : ''}`} 
                        onClick={() => handleColorSelect(color)} style={{ backgroundColor: getHexColor(color), border: '2px solid black' }}>
                </button>
              ))}
            </div>
          </Accordion.Body>
        </Accordion>

        {/* Size Filter */}
        <Accordion>
          <Accordion.Button className="accordion-button">Sizes</Accordion.Button>
          <Accordion.Body>
            <div className="size-options">
              {productSizes.map(size => (
                <button key={size} className={`size-btn ${selectedSizes.includes(size) ? 'selected' : ''}`} 
                        onClick={() => handleSizeSelect(size)}>
                  {size}
                </button>
              ))}
            </div>
          </Accordion.Body>
        </Accordion>

        {/* Price Filter */}
        <Accordion>
          <Accordion.Button className="accordion-button">Price</Accordion.Button>
          <Accordion.Body>
            <div className="price-range">
              <div className="price-values mb-3">
                <span>{priceRange[0]} TND</span> - <span>{priceRange[1]} TND</span>
              </div>
              <div className="range-slider">
                <input type="range" min={minPrice} max={maxPrice} value={priceRange[0]} 
                       onChange={(e) => setPriceRange([Math.min(Number(e.target.value), priceRange[1] - 1), priceRange[1]])} />
                <input type="range" min={minPrice} max={maxPrice} value={priceRange[1]} 
                       onChange={(e) => setPriceRange([priceRange[0], Math.max(Number(e.target.value), priceRange[0] + 1)])} />
              </div>
            </div>
          </Accordion.Body>
        </Accordion>

        {/* Apply & Clear Filter Buttons */}
        <div className="filter-actions d-flex gap-3">
          <Button onClick={handleClear} className="clear-btn">Clear</Button>
          <Button onClick={handleFilter} className="apply-btn">Apply Filters</Button>
        </div>
      </div>
    </section>
  );
};

export default Filter;
