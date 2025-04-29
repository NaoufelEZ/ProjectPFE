import { faClose, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useEffect } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import './filter.css';
import { colornames } from 'color-name-list';

const Filter = ({ isOpen, setIsOpen, products = [], setFilterProduct }) => {
  // Check if props are valid
  const validProducts = Array.isArray(products) ? products : [];
  const validSetFilterProduct = typeof setFilterProduct === 'function' ? setFilterProduct : () => {};
  const validSetIsOpen = typeof setIsOpen === 'function' ? setIsOpen : () => {};
  
  const [sortBy, setSortBy] = useState('');
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [priceRange, setPriceRange] = useState([0, 0]);
  const [expandedSection, setExpandedSection] = useState(null);

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
    if (validProducts.length > 0) {
      const prices = validProducts.map(product => product.price).filter(p => !isNaN(p));
      if (prices.length > 0) {
        const minP = Math.min(...prices);
        const maxP = Math.max(...prices);
        setMinPrice(minP);
        setMaxPrice(maxP);
        setPriceRange([minP, maxP]);
      }
    }
  }, [validProducts]);

  const productColors = validProducts.length > 0
    ? [...new Set(validProducts.flatMap(p => (p.product_stock ? p.product_stock.map(s => s.color) : [])))]
    : [];

  const productSizes = validProducts.length > 0
    ? [...new Set(validProducts.flatMap(p => (p.product_stock ? p.product_stock.map(s => s.size) : [])))]
    : [];

  const handleSort = (order) => {
    setSortBy(order);
    let sortedProducts = [...validProducts];

    if (order === 'newIn') {
      sortedProducts.sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0));
    } else if (order === 'lowToHigh') {
      sortedProducts.sort((a, b) => (a.price || 0) - (b.price || 0));
    } else if (order === 'highToLow') {
      sortedProducts.sort((a, b) => (b.price || 0) - (a.price || 0));
    }

    validSetFilterProduct(sortedProducts);
  };

  const handleColorSelect = (color) => {
    setSelectedColors(prev => prev.includes(color) ? prev.filter(c => c !== color) : [...prev, color]);
  };

  const handleSizeSelect = (size) => {
    setSelectedSizes(prev => prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]);
  };

  const handleFilter = () => {
    const filteredProducts = validProducts.filter(product =>
      (product.price >= priceRange[0] && product.price <= priceRange[1]) &&
      (selectedColors.length === 0 || (product.product_stock && product.product_stock.some(s => selectedColors.includes(s.color)))) &&
      (selectedSizes.length === 0 || (product.product_stock && product.product_stock.some(s => selectedSizes.includes(s.size))))
    );
    validSetFilterProduct(filteredProducts);
    setIsOpen(false);
  };

  const handleClear = () => {
    setSortBy('');
    setSelectedColors([]);
    setSelectedSizes([]);
    setPriceRange([minPrice, maxPrice]);
    validSetFilterProduct(validProducts);
  };

  const toggleSection = (section) => {
    if (expandedSection === section) {
      setExpandedSection(null);
    } else {
      setExpandedSection(section);
    }
  };

  const handlePriceChange = (value) => {
    setPriceRange(value);
  };

  const filteredCount = validProducts.filter(product =>
    (product.price >= priceRange[0] && product.price <= priceRange[1]) &&
    (selectedColors.length === 0 || (product.product_stock && product.product_stock.some(s => selectedColors.includes(s.color)))) &&
    (selectedSizes.length === 0 || (product.product_stock && product.product_stock.some(s => selectedSizes.includes(s.size))))
  ).length;

  return (
    <section className={`filter ${isOpen ? 'show' : ''}`}>
      <div className="filter-content">
        <div className="filter-header">
          <span className="filter-title">Filter</span>
          <FontAwesomeIcon onClick={() => validSetIsOpen(false)} role="button" className="close-btn" icon={faClose} />
        </div>

        {/* Sort By Section */}
        <div className="filter-section">
          <div className="section-header">
            <span className="section-title">Sort by</span>
          </div>
          <div className="sort-options">
            <button 
              className={`sort-pill ${sortBy === 'newIn' ? 'active' : ''}`} 
              onClick={() => handleSort('newIn')}
            >
              New In
            </button>
            <button 
              className={`sort-pill ${sortBy === 'lowToHigh' ? 'active' : ''}`}
              onClick={() => handleSort('lowToHigh')}
            >
              Price low to high
            </button>
            <button 
              className={`sort-pill ${sortBy === 'highToLow' ? 'active' : ''}`}
              onClick={() => handleSort('highToLow')}
            >
              Price high to low
            </button>
          </div>
        </div>

        {/* Collapsible Sections */}
        <div className="collapsible-section">
          <div className="section-header" onClick={() => toggleSection('color')}>
            <span className="section-title">Colour</span>
            <FontAwesomeIcon 
              icon={expandedSection === 'color' ? faMinus : faPlus} 
              className="section-icon" 
            />
          </div>
          {expandedSection === 'color' && (
            <div className="section-content">
              <div className="color-options">
                {productColors.slice(0,8).map(color => (
                  <button 
                    key={color} 
                    className={`color-btn ${selectedColors.includes(color) ? 'selected' : ''}`} 
                    onClick={() => handleColorSelect(color)} 
                    style={{ backgroundColor: getHexColor(color) }}
                  >
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="collapsible-section">
          <div className="section-header" onClick={() => toggleSection('size')}>
            <span className="section-title">Size</span>
            <FontAwesomeIcon 
              icon={expandedSection === 'size' ? faMinus : faPlus} 
              className="section-icon" 
            />
          </div>
          {expandedSection === 'size' && (
            <div className="section-content">
              <div className="size-options">
                {productSizes.map(size => (
                  <button 
                    key={size} 
                    className={`size-btn ${selectedSizes.includes(size) ? 'selected' : ''}`} 
                    onClick={() => handleSizeSelect(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="collapsible-section">
          <div className="section-header" onClick={() => toggleSection('price')}>
            <span className="section-title">Price</span>
            <FontAwesomeIcon 
              icon={expandedSection === 'price' ? faMinus : faPlus} 
              className="section-icon" 
            />
          </div>
          {expandedSection === 'price' && (
            <div className="section-content">
              <div className="price-range">
                <div className="price-values">
                  <span>{priceRange[0]} TND</span> - <span>{priceRange[1]} TND</span>
                </div>
                <div className="rc-slider-container">
                  <Slider
                    range
                    min={minPrice}
                    max={maxPrice}
                    value={priceRange}
                    onChange={handlePriceChange}
                    className="price-range-slider"
                    handleStyle={[
                      { 
                        borderColor: '#212529',
                        backgroundColor: '#212529'
                      }, 
                      { 
                        borderColor: '#212529',
                        backgroundColor: '#212529'
                      }
                    ]}
                    trackStyle={{ backgroundColor: '#212529' }}
                    railStyle={{ backgroundColor: '#e5e5e5' }}
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="filter-actions">
          <button onClick={handleClear} className="clear-btn">CLEAR</button>
          <button  onClick={handleFilter} className="results-btn">
            SEE RESULTS ({filteredCount})
          </button>
        </div>
      </div>
    </section>
  );
};

export default Filter;