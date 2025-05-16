import React, { useEffect, useState } from "react";
import { Form, Button, Row, Col, InputGroup, Alert, Card, Container, Dropdown, Spinner } from "react-bootstrap";
import axios from "axios";
import { ApiKey, APIURL, IMAGEURL } from "../../../Api/Api";
import Cookies from "universal-cookie";
import { Helmet } from "react-helmet-async";
import { useParams, useNavigate } from "react-router-dom";
import { colornames } from "color-name-list";
import { IoArrowBack } from "react-icons/io5";

const ProductForm = () => {
  const { idProd } = useParams();
  const navigate = useNavigate();
  const [isEditMode, setIsEditMode] = useState(false);
  const [category, setCategory] = useState([]);
  const [subcategory, setSubCategory] = useState([]);
  const [detail, setDetail] = useState([]);
  const [colorSearch, setColorSearch] = useState("");
  const [colorSelects, setColorSelects] = useState([
    { 
      name: "", 
      productImage: null, 
      productImageUrl: "", 
      holderImage: null,
      holderImageUrl: "",
      sizes: [{ size: "", quantity: "" }] 
    },
  ]);
  const [product, setProduct] = useState({
    title: "",
    description: "",
    category: "",
    subcategory: "",
    detail: "",
    price: "",
    discount: "",
  });
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Get unique color names
  const colors = [...new Map(colornames.map(color => [color.name, color])).values()]
    .sort((a, b) => a.name.localeCompare(b.name));

  const filteredColors = colors.filter(color =>
    color.name.toLowerCase().includes(colorSearch.toLowerCase())
  );

  const cookie = new Cookies();
  const token = cookie.get("auth");

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${APIURL}/category`, {
          headers: { "x-api-key": ApiKey }
        });
        setCategory(response.data.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  // Fetch subcategories when category changes
  useEffect(() => {
    const fetchSubcategories = async () => {
      if (product.category) {
        try {
          const response = await axios.get(
            `${APIURL}/admin/category/${product.category}/subcategory`,
            { headers: { Authorization: `Bearer ${token}`, "x-api-key": ApiKey } }
          );
          setSubCategory(response.data.data);
        } catch (err) {
          console.error("Error fetching subcategories:", err);
        }
      }
    };
    fetchSubcategories();
  }, [product.category, token]);

  // Fetch details when subcategory changes
  useEffect(() => {
    const fetchDetails = async () => {
      if (product.category && product.subcategory) {
        try {
          const response = await axios.get(
            `${APIURL}/admin/category/${product.category}/subcategory/${product.subcategory}`,
            { headers: { Authorization: `Bearer ${token}`, "x-api-key": ApiKey } }
          );
          setDetail(response.data.data);
        } catch (error) {
          console.error("Error fetching details:", error);
        }
      }
    };
    fetchDetails();
  }, [product.category, product.subcategory, token]);

  // Fetch product data if in edit mode
  useEffect(() => {
    const fetchProduct = async () => {
      if (idProd) {
        setIsLoading(true);
        try {
          const response = await axios.get(`${APIURL}/products/product/${idProd}`, {
            headers: { Authorization: `Bearer ${token}`, "x-api-key": ApiKey }
          });
          
          const data = response.data.data;
          setProduct({
            title: data.title || "",
            description: data.description || "",
            price: data.price || "",
            discount: data.discount || "",
            category: data.details?.category?.id || "",
            subcategory: data.details?.subcategory?.id || "",
            detail: data.details?.id || "",
          });

          const transformedColorSelects = [];
          const uniqueColors = [...new Set(data.product_stock?.map(stock => stock.color) || [])];
          
          uniqueColors.forEach(colorName => {
            const colorItems = data.product_stock?.filter(stock => stock.color === colorName) || [];
            const firstColorItem = colorItems[0] || {};
            
            transformedColorSelects.push({
              name: colorName,
              productImage: null,
              productImageUrl: firstColorItem.product_picture || "",
              holderImage: null,
              holderImageUrl: firstColorItem.holder_product_picture || "",
              sizes: colorItems.map(item => ({
                size: item.size || "",
                quantity: item.quantity || "",
                stock_id: item.id || ""
              }))
            });
          });

          setColorSelects(transformedColorSelects.length > 0 ? transformedColorSelects : [
            { 
              name: "", 
              productImage: null, 
              productImageUrl: "", 
              holderImage: null,
              holderImageUrl: "",
              sizes: [{ size: "", quantity: "" }] 
            }
          ]);
          
          setIsEditMode(true);
          setMessage({ type: "success", text: "Product loaded successfully" });
          setTimeout(() => setMessage(null), 3000);
          
        } catch (err) {
          setMessage({ type: "danger", text: err.response?.data?.message || "Failed to load product" });
        } finally {
          setIsLoading(false);
        }
      }
    };
    fetchProduct();
  }, [idProd, token]);

  // Helper functions
  const addColorSelect = () => {
    setColorSelects([...colorSelects, { 
      name: "", 
      productImage: null, 
      productImageUrl: "", 
      holderImage: null,
      holderImageUrl: "",
      sizes: [{ size: "", quantity: "" }] 
    }]);
  };

  const removeColorSelect = (index) => {
    if (colorSelects.length <= 1) return;
    setColorSelects(colorSelects.filter((_, i) => i !== index));
  };

  const handleProductChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleColorChange = (colorIndex, colorName) => {
    setColorSelects(prev => 
      prev.map((item, index) => 
        index === colorIndex ? { ...item, name: colorName } : item
      )
    );
    setColorSearch("");
  };

  const handleImageChange = (colorIndex, file, type) => {
    if (!file) return;
    
    if (!file.type.match('image.*')) {
      setMessage({ type: "danger", text: "Only image files are allowed" });
      return;
    }
    
    if (file.size > 2 * 1024 * 1024) {
      setMessage({ type: "danger", text: "Image must be less than 2MB" });
      return;
    }

    setColorSelects(prev => 
      prev.map((item, index) => 
        index === colorIndex ? { 
          ...item, 
          [type === 'product' ? 'productImage' : 'holderImage']: file,
          [type === 'product' ? 'productImageUrl' : 'holderImageUrl']: URL.createObjectURL(file)
        } : item
      )
    );
  };

  const clearExistingImage = (colorIndex, type) => {
    setColorSelects(prev => 
      prev.map((item, index) => 
        index === colorIndex ? { 
          ...item, 
          [type === 'product' ? 'productImage' : 'holderImage']: null,
          [type === 'product' ? 'productImageUrl' : 'holderImageUrl']: ""
        } : item
      )
    );
  };

  const addSizeSelect = (colorIndex) => {
    setColorSelects(prev => 
      prev.map((item, index) => 
        index === colorIndex 
          ? { ...item, sizes: [...item.sizes, { size: "", quantity: "" }] }
          : item
      )
    );
  };

  const removeSizeSelect = (colorIndex, sizeIndex) => {
    setColorSelects(prev => 
      prev.map((item, index) => 
        index === colorIndex 
          ? { 
              ...item, 
              sizes: item.sizes.filter((_, i) => i !== sizeIndex) 
            } 
          : item
      )
    );
  };

  const handleSizeChange = (colorIndex, sizeIndex, field, value) => {
    setColorSelects(prev => 
      prev.map((item, index) => 
        index === colorIndex 
          ? { 
              ...item, 
              sizes: item.sizes.map((size, i) => 
                i === sizeIndex ? { ...size, [field]: value } : size
              ) 
            } 
          : item
      )
    );
  };

  const validateForm = () => {
    // Validate basic product info
    if (!product.title || !product.description || !product.price || !product.detail) {
      return false;
    }

    // Validate color variants
    return colorSelects.every(color => {
      const hasColor = !!color.name;
      const hasImage = color.productImage || color.productImageUrl;
      const hasValidSizes = color.sizes.every(size => size.size && size.quantity);
      
      return hasColor && hasImage && hasValidSizes;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    if (!validateForm()) {
      setMessage({ type: "danger", text: "Please fill all required fields" });
      setIsLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("title", product.title);
    formData.append("description", product.description);
    formData.append("price", product.price);
    formData.append("discount", product.discount || "0");
    formData.append("details_id", product.detail);

    // Prepare stock data - format to match backend expectations
    const colorsArray = [];
    const sizesArray = [];
    const quantityArray = [];
    const stockIdArray = [];
    const productPicturesArray = [];
    const holderPicturesArray = [];
    const existingProductPicturesArray = [];
    const existingHolderPicturesArray = [];

    colorSelects.forEach((colorItem) => {
      // For each size variant
      colorItem.sizes.forEach((sizeItem) => {
        colorsArray.push(colorItem.name);
        sizesArray.push(sizeItem.size);
        quantityArray.push(sizeItem.quantity);
        
        // Add stock_id if available (for edit mode)
        if (sizeItem.stock_id) {
          stockIdArray.push(sizeItem.stock_id);
        }
        
        // Handle product images
        if (colorItem.productImage) {
          productPicturesArray.push(colorItem.productImage);
          existingProductPicturesArray.push("");
        } else if (colorItem.productImageUrl) {
          productPicturesArray.push(null);
          existingProductPicturesArray.push(colorItem.productImageUrl);
        }
        
        // Handle holder images
        if (colorItem.holderImage) {
          holderPicturesArray.push(colorItem.holderImage);
          existingHolderPicturesArray.push("");
        } else if (colorItem.holderImageUrl) {
          holderPicturesArray.push(null);
          existingHolderPicturesArray.push(colorItem.holderImageUrl);
        } else {
          holderPicturesArray.push(null);
          existingHolderPicturesArray.push("");
        }
      });
    });

    // Append arrays to formData
    colorsArray.forEach((color, index) => {
      formData.append(`colors[${index}]`, color);
      formData.append(`sizes[${index}]`, sizesArray[index]);
      formData.append(`quantity[${index}]`, quantityArray[index]);
      
      if (stockIdArray[index]) {
        formData.append(`stock_id[${index}]`, stockIdArray[index]);
      }
      
      if (productPicturesArray[index]) {
        formData.append(`product_pictures[${index}]`, productPicturesArray[index]);
      }
      
      if (holderPicturesArray[index]) {
        formData.append(`holder_pictures[${index}]`, holderPicturesArray[index]);
      }
      
      formData.append(`existing_product_pictures[${index}]`, existingProductPicturesArray[index]);
      formData.append(`existing_holder_pictures[${index}]`, existingHolderPicturesArray[index]);
    });

    try {
      const url = isEditMode 
        ? `${APIURL}/product/update/${idProd}` 
        : `${APIURL}/product/add`;
      
      const response = await axios.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
          "x-api-key": ApiKey,
        },
      });

      setMessage({ 
        type: "success", 
        text: response.data?.message || `Product ${isEditMode ? 'updated' : 'added'} successfully!` 
      });
      
      setTimeout(() => navigate(-1), 2000);
    } catch (error) {
      const errorMsg = error.response?.data?.message || 
                     error.message || 
                     "Failed to save product";
      setMessage({ type: "danger", text: errorMsg });
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>{isEditMode ? "Edit Product" : "Add Product"} | Dashboard</title>
      </Helmet>
      
      <Container fluid className="py-4">
        <Button 
          variant="outline-secondary" 
          onClick={() => navigate(-1)}
          className="mb-3"
        >
          <IoArrowBack className="me-2" /> Back
        </Button>
        
        <Card className="shadow-sm">
          <Card.Header className="bg-white py-3">
            <h5 className="mb-0 fw-bold">
              {isEditMode ? 'Edit' : 'Add'} Product
            </h5>
          </Card.Header>
          
          <Card.Body>
            {message && (
              <Alert variant={message.type} dismissible onClose={() => setMessage(null)}>
                {message.text}
              </Alert>
            )}

            {isLoading ? (
              <div className="text-center py-5">
                <Spinner animation="border" variant="primary" />
                <p className="mt-2">Loading...</p>
              </div>
            ) : (
              <Form onSubmit={handleSubmit} encType="multipart/form-data">
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Product Name *</Form.Label>
                      <Form.Control 
                        type="text" 
                        name="title" 
                        value={product.title} 
                        onChange={handleProductChange} 
                        required
                      />
                    </Form.Group>
                  </Col>
                  
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Price *</Form.Label>
                      <InputGroup>
                        <InputGroup.Text>$</InputGroup.Text>
                        <Form.Control 
                          type="number" 
                          name="price" 
                          value={product.price} 
                          onChange={handleProductChange} 
                          min="0"
                          step="0.01"
                          required
                        />
                      </InputGroup>
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label>Description *</Form.Label>
                  <Form.Control 
                    as="textarea" 
                    rows={3} 
                    name="description" 
                    value={product.description} 
                    onChange={handleProductChange} 
                    required
                  />
                </Form.Group>

                <Row>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>Category *</Form.Label>
                      <Form.Select 
                        value={product.category} 
                        name="category" 
                        onChange={handleProductChange}
                        required
                      >
                        <option value="">Select Category</option>
                        {category.map(item => (
                          <option key={item.id} value={item.id}>{item.category}</option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  
                  <Col md={4}>
                    {product.category && (
                      <Form.Group className="mb-3">
                        <Form.Label>Subcategory *</Form.Label>
                        <Form.Select 
                          value={product.subcategory} 
                          name="subcategory" 
                          onChange={handleProductChange}
                          required
                        >
                          <option value="">Select Subcategory</option>
                          {subcategory.filter(e => e.subcategories !== "New").map(item => (
                            <option key={item.id} value={item.id}>{item.subcategories}</option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    )}
                  </Col>
                  
                  <Col md={4}>
                    {product.subcategory && detail.length > 0 && (
                      <Form.Group className="mb-3">
                        <Form.Label>Detail *</Form.Label>
                        <Form.Select 
                          value={product.detail} 
                          name="detail" 
                          onChange={handleProductChange}
                          required
                        >
                          <option value="">Select Detail</option>
                          {detail.map(item => (
                            <option key={item.id} value={item.id}>{item.categoryDetails}</option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    )}
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Discount (%)</Form.Label>
                      <InputGroup>
                        <Form.Control 
                          type="number" 
                          min={0} 
                          max={100}
                          name="discount" 
                          value={product.discount} 
                          onChange={handleProductChange} 
                        />
                        <InputGroup.Text>%</InputGroup.Text>
                      </InputGroup>
                    </Form.Group>
                  </Col>
                </Row>

                <div className="mb-4">
                  <h5 className="mb-3 fw-bold">Product Variants</h5>
                  {colorSelects.map((colorItem, colorIndex) => (
                    <Card key={colorIndex} className="mb-3">
                      <Card.Header className="d-flex justify-content-between align-items-center">
                        <span>Color {colorIndex + 1}: {colorItem.name || "New"}</span>
                        <Button 
                          variant="outline-danger" 
                          size="sm" 
                          onClick={() => removeColorSelect(colorIndex)}
                          disabled={colorSelects.length <= 1}
                        >
                          Remove
                        </Button>
                      </Card.Header>
                      
                      <Card.Body>
                        <Row>
                          <Col md={6}>
                            <Form.Group className="mb-3">
                              <Form.Label>Color *</Form.Label>
                              <Dropdown>
                                <Dropdown.Toggle variant="outline-secondary" className="w-100">
                                  {colorItem.name || "Select color"}
                                </Dropdown.Toggle>
                                <Dropdown.Menu className="w-100">
                                  <div className="p-2">
                                    <Form.Control
                                      type="text"
                                      placeholder="Search colors..."
                                      value={colorSearch}
                                      onChange={(e) => setColorSearch(e.target.value)}
                                      autoFocus
                                    />
                                  </div>
                                  <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
                                    {filteredColors.slice(0, 10).map((color, idx) => (
                                      <Dropdown.Item 
                                        key={idx} 
                                        onClick={() => handleColorChange(colorIndex, color.name)}
                                      >
                                        <div className="d-flex align-items-center">
                                          <span 
                                            className="d-block rounded-circle me-3" 
                                            style={{
                                              backgroundColor: color.hex,
                                              width: "20px",
                                              height: "20px",
                                              border: "1px solid #ddd"
                                            }}
                                          />
                                          {color.name}
                                        </div>
                                      </Dropdown.Item>
                                    ))}
                                  </div>
                                </Dropdown.Menu>
                              </Dropdown>
                            </Form.Group>
                          </Col>
                        </Row>

                        <Row>
                          <Col md={6}>
                            <Form.Group className="mb-3">
                              <Form.Label>Product Image *</Form.Label>
                              {colorItem.productImageUrl ? (
                                <div className="position-relative">
                                  <img
                                    src={colorItem.productImageUrl.startsWith('blob:') 
                                      ? colorItem.productImageUrl 
                                      : `${IMAGEURL}/products/${colorItem.productImageUrl}`}
                                    alt="Preview"
                                    className="img-thumbnail"
                                    style={{ maxHeight: '150px' }}
                                  />
                                  <Button 
                                    variant="danger" 
                                    size="sm" 
                                    className="position-absolute top-0 end-0 m-2"
                                    onClick={() => clearExistingImage(colorIndex, 'product')}
                                  >
                                    Remove
                                  </Button>
                                </div>
                              ) : (
                                <>
                                  <Form.Control 
                                    type="file" 
                                    accept="image/*" 
                                    onChange={(e) => handleImageChange(colorIndex, e.target.files[0], 'product')}
                                    required
                                  />
                                  {colorItem.productImage && (
                                    <img
                                      src={URL.createObjectURL(colorItem.productImage)}
                                      alt="Preview"
                                      className="img-thumbnail mt-2"
                                      style={{ maxHeight: '150px' }}
                                    />
                                  )}
                                </>
                              )}
                            </Form.Group>
                          </Col>
                          
                          <Col md={6}>
                            <Form.Group className="mb-3">
                              <Form.Label>Holder Image</Form.Label>
                              {colorItem.holderImageUrl ? (
                                <div className="position-relative">
                                  <img
                                    src={colorItem.holderImageUrl.startsWith('blob:') 
                                      ? colorItem.holderImageUrl 
                                      : `${IMAGEURL}/products/${colorItem.holderImageUrl}`}
                                    alt="Preview"
                                    className="img-thumbnail"
                                    style={{ maxHeight: '150px' }}
                                  />
                                  <Button 
                                    variant="danger" 
                                    size="sm" 
                                    className="position-absolute top-0 end-0 m-2"
                                    onClick={() => clearExistingImage(colorIndex, 'holder')}
                                  >
                                    Remove
                                  </Button>
                                </div>
                              ) : (
                                <>
                                  <Form.Control 
                                    type="file" 
                                    accept="image/*" 
                                    onChange={(e) => handleImageChange(colorIndex, e.target.files[0], 'holder')}
                                  />
                                  {colorItem.holderImage && (
                                    <img
                                      src={URL.createObjectURL(colorItem.holderImage)}
                                      alt="Preview"
                                      className="img-thumbnail mt-2"
                                      style={{ maxHeight: '150px' }}
                                    />
                                  )}
                                </>
                              )}
                            </Form.Group>
                          </Col>
                        </Row>

                        <div className="mb-3">
                          <div className="d-flex justify-content-between align-items-center mb-3">
                            <h6 className="mb-0 fw-bold">Sizes & Quantities</h6>
                            <Button 
                              variant="outline-primary" 
                              size="sm" 
                              onClick={() => addSizeSelect(colorIndex)}
                            >
                              Add Size
                            </Button>
                          </div>
                          
                          {colorItem.sizes.map((sizeItem, sizeIndex) => (
                            <Row key={sizeIndex} className="mb-2 g-2">
                              <Col xs={5}>
                                <Form.Control 
                                  placeholder="Size" 
                                  value={sizeItem.size} 
                                  onChange={(e) => handleSizeChange(colorIndex, sizeIndex, "size", e.target.value)}
                                  required
                                />
                              </Col>
                              <Col xs={5}>
                                <Form.Control 
                                  type="number" 
                                  min="0"
                                  placeholder="Quantity" 
                                  value={sizeItem.quantity} 
                                  onChange={(e) => handleSizeChange(colorIndex, sizeIndex, "quantity", e.target.value)}
                                  required
                                />
                              </Col>
                              <Col xs={2}>
                                <Button 
                                  variant="outline-danger" 
                                  size="sm" 
                                  onClick={() => removeSizeSelect(colorIndex, sizeIndex)}
                                  disabled={colorItem.sizes.length <= 1}
                                >
                                  Remove
                                </Button>
                              </Col>
                            </Row>
                          ))}
                        </div>
                      </Card.Body>
                    </Card>
                  ))}

                  <Button 
                    variant="outline-primary" 
                    className="w-100 mb-3" 
                    onClick={addColorSelect}
                  >
                    Add Another Color
                  </Button>
                </div>

                <div className="d-flex justify-content-end">
                  <Button 
                    variant="primary" 
                    type="submit" 
                    disabled={isLoading || !validateForm()}
                    className="px-4"
                  >
                    {isLoading ? (
                      <>
                        <Spinner size="sm" className="me-2" />
                        Processing...
                      </>
                    ) : isEditMode ? (
                      'Update Product'
                    ) : (
                      'Add Product'
                    )}
                  </Button>
                </div>
              </Form>
            )}
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default ProductForm;