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
  const [isOn, setIsOn] = useState(false);

  // Get unique color names from the color-name-list library
  const colors = [...new Map(colornames.map(color => [color.name, color])).values()]
    .sort((a, b) => a.name.localeCompare(b.name));

  // Filter colors based on search input
  const filteredColors = colors.filter(color =>
    color.name.toLowerCase().includes(colorSearch.toLowerCase())
  );

  const cookie = new Cookies();
  const token = cookie.get("auth");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${APIURL}/category`, {
          headers: {
            Accept: "application/json",
            "x-api-key": ApiKey,
          },
        });
        setCategory(response.data.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchSubcategories = async () => {
      if (product.category) {
        try {
          const response = await axios.get(
            `${APIURL}/admin/category/${product.category}/subcategory`,
            {
              headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
                "x-api-key": ApiKey,
              },
            }
          );
          setSubCategory(response.data.data);
        } catch (err) {
          console.error("Error fetching subcategories:", err);
        }
      }
    };

    fetchSubcategories();
  }, [product.category, token]);

  useEffect(() => {
    const fetchDetails = async () => {
      if (product.category && product.subcategory) {
        try {
          const response = await axios.get(
            `${APIURL}/admin/category/${product.category}/subcategory/${product.subcategory}`,
            {
              headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
                "x-api-key": ApiKey,
              },
            }
          );
          setDetail(response.data.data);
        } catch (error) {
          console.error("Error fetching details:", error);
        }
      }
    };

    fetchDetails();
  }, [product.category, product.subcategory, token]);

  useEffect(() => {
    const fetchProduct = async () => {
      if (idProd) {
        setIsLoading(true);
        try {
          const response = await axios.get(`${APIURL}/products/product/${idProd}`, {
            headers: {
              Accept: "application/json",
              "x-api-key": ApiKey,
              Authorization: `Bearer ${token}`,
            },
          });
          
          const data = response.data.data;
          if (!data) {
            throw new Error("No product data received");
          }
          
          setProduct({
            title: data.title || "",
            description: data.description || "",
            price: data.price || "",
            discount: data.discount || "",
            category: data.category_id || "",
            subcategory: data.subcategory_id || "",
            detail: data.details_id || "",
          });

          const transformedColorSelects = [];
          const uniqueColors = [...new Set(data.product_stock.map(stock => stock.color))];
          
          uniqueColors.forEach(colorName => {
            const colorItems = data.product_stock.filter(stock => stock.color === colorName);
            const firstColorItem = colorItems[0];
            
            transformedColorSelects.push({
              name: colorName,
              productImage: null,
              productImageUrl: firstColorItem.product_picture || "",
              holderImage: null,
              holderImageUrl: firstColorItem.holder_product_picture || "",
              sizes: colorItems.map(item => ({
                size: item.size || "",
                quantity: item.quantity || ""
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
          setMessage({ type: "success", text: "Product data loaded successfully" });
          
          setTimeout(() => {
            setMessage(null);
          }, 3000);
          
        } catch (err) {
          console.error("Error loading product:", err);
          setMessage({ 
            type: "danger", 
            text: err.response?.data?.message || "Failed to load product data. Please try again." 
          });
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchProduct();
  }, [idProd, token]);

  const addColorSelect = () => {
    setColorSelects([
      ...colorSelects, 
      { 
        name: "", 
        productImage: null, 
        productImageUrl: "", 
        holderImage: null,
        holderImageUrl: "",
        sizes: [{ size: "", quantity: "" }] 
      }
    ]);
  };

  const removeColorSelect = (index) => {
    const newColorSelects = [...colorSelects];
    newColorSelects.splice(index, 1);
    setColorSelects(newColorSelects);
  };

  const handleProductChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleColorChange = (colorIndex, colorName) => {
    setColorSelects(prev =>
      prev.map((item, index) => (index === colorIndex ? { ...item, name: colorName } : item))
    );
    setColorSearch("");
  };

  const handleProductImageChange = (colorIndex, file) => {
    setColorSelects(prev =>
      prev.map((item, index) => (index === colorIndex ? 
        { 
          ...item, 
          productImage: file, 
          productImageUrl: file ? URL.createObjectURL(file) : item.productImageUrl 
        } 
        : item))
    );
  };

  const handleHolderImageChange = (colorIndex, file) => {
    setColorSelects(prev =>
      prev.map((item, index) => (index === colorIndex ? 
        { 
          ...item, 
          holderImage: file, 
          holderImageUrl: file ? URL.createObjectURL(file) : item.holderImageUrl 
        } 
        : item))
    );
  };

  const clearExistingImage = (colorIndex, imageType) => {
    setColorSelects(prev =>
      prev.map((item, index) => {
        if (index === colorIndex) {
          if (imageType === 'product') {
            return { ...item, productImage: null, productImageUrl: "" };
          } else if (imageType === 'holder') {
            return { ...item, holderImage: null, holderImageUrl: "" };
          }
        }
        return item;
      })
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
      prev.map((colorItem, cIndex) =>
        cIndex === colorIndex
          ? {
              ...colorItem,
              sizes: colorItem.sizes.filter((_, sIndex) => sIndex !== sizeIndex),
            }
          : colorItem
      )
    );
  };

  const handleSizeChange = (colorIndex, sizeIndex, field, value) => {
    setColorSelects(prev =>
      prev.map((colorItem, cIndex) =>
        cIndex === colorIndex
          ? {
              ...colorItem,
              sizes: colorItem.sizes.map((sizeItem, sIndex) =>
                sIndex === sizeIndex ? { ...sizeItem, [field]: value } : sizeItem
              ),
            }
          : colorItem
      )
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    const formData = new FormData();
    formData.append("title", product.title);
    formData.append("description", product.description);
    formData.append("price", product.price);
    formData.append("discount", product.discount || "0");
    formData.append("details_id", product.detail);
    
    const colorNames = [];
    const sizes = [];
    const quantities = [];
    
    colorSelects.forEach((colorItem) => {
      colorItem.sizes.forEach(sizeItem => {
        colorNames.push(colorItem.name);
        sizes.push(sizeItem.size);
        quantities.push(sizeItem.quantity);
      });
      
      if (colorItem.productImage) {
        formData.append(`product_pictures[]`, colorItem.productImage);
        formData.append(`product_picture_colors[]`, colorItem.name);
      } else if (colorItem.productImageUrl && isEditMode) {
        formData.append(`existing_product_pictures[]`, colorItem.productImageUrl);
        formData.append(`existing_product_picture_colors[]`, colorItem.name);
      }

      if (colorItem.holderImage) {
        formData.append(`holder_pictures[]`, colorItem.holderImage);
        formData.append(`holder_picture_colors[]`, colorItem.name);
      } else if (colorItem.holderImageUrl && isEditMode) {
        formData.append(`existing_holder_pictures[]`, colorItem.holderImageUrl);
        formData.append(`existing_holder_picture_colors[]`, colorItem.name);
      }
    });

    colorNames.forEach(color => formData.append('colors[]', color));
    sizes.forEach(size => formData.append('sizes[]', size));
    quantities.forEach(qty => formData.append('quantity[]', qty));

    try {
      const url = isEditMode 
        ? `${APIURL}/products/update/${idProd}` 
        : `${APIURL}/product/add`;
      
      const response = await axios.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "application/json",
          "x-api-key": ApiKey,
          Authorization: `Bearer ${token}`,
        },
      });
      
      if (response.data && (response.data.success || response.data.status === "success")) {
        setMessage({ 
          type: "success", 
          text: response.data.data || response.data.message || `Product ${isEditMode ? 'updated' : 'added'} successfully!` 
        });
        
        setTimeout(() => {
          navigate(-1);
        }, 2000);
      } else {
        setMessage({ 
          type: "warning", 
          text: response.data.data || response.data.message || `Server response received but operation status unclear.` 
        });
      }
    } catch (error) {
      console.error("Error saving product:", error);
      
      let errorMessage = `An error occurred while ${isEditMode ? 'updating' : 'adding'} the product`;
      
      if (error.response) {
        errorMessage = error.response.data?.data || 
                      error.response.data?.message || 
                      `Server error (${error.response.status}): ${errorMessage}`;
      } else if (error.request) {
        errorMessage = "No response received from server. Please check your connection.";
      }
      
      setMessage({ type: "danger", text: errorMessage });
    } finally {
      setIsLoading(false);
    }
  };

  const validateForm = () => {
    const hasMissingColorName = colorSelects.some(color => !color.name);
    
    const hasMissingImages = !isEditMode && colorSelects.some(
      color => (!color.productImage && !color.productImageUrl) || 
               (!color.holderImage && !color.holderImageUrl)
    );
    
    const hasMissingSizes = colorSelects.some(
      color => color.sizes.some(size => !size.size || !size.quantity)
    );
    
    return !hasMissingColorName && !hasMissingImages && !hasMissingSizes;
  };

  return (
    <>
      <Helmet>
        <title>{isEditMode ? "Edit Product" : "Add Product"} | Nalouti Dashboard</title>
      </Helmet>
      
      <Container fluid className="py-4">
        <Button 
          variant="outline-secondary" 
          onClick={() => navigate(-1)}
          className="mb-3 d-flex align-items-center"
        >
          <IoArrowBack className="me-2" /> Back to Products
        </Button>
        
        <Card className="shadow-sm">
          <Card.Header className="bg-white py-3">
            <h5 className="mb-0 fw-bold">
              {isEditMode ? 'Edit' : 'Add'} Product
            </h5>
          </Card.Header>
          
          <Card.Body>
            {message && (
              <Alert 
                variant={message.type} 
                onClose={() => setMessage(null)} 
                dismissible
                className="animate__animated animate__fadeIn"
              >
                {message.text}
              </Alert>
            )}

            {isLoading ? (
              <div className="text-center py-5">
                <Spinner animation="border" variant="primary" />
                <p className="mt-2">Loading product details...</p>
              </div>
            ) : (
              <Form onSubmit={handleSubmit} encType="multipart/form-data">
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Product Name <span className="text-danger">*</span></Form.Label>
                      <Form.Control 
                        type="text" 
                        name="title" 
                        placeholder="Enter Product Name" 
                        value={product.title} 
                        onChange={handleProductChange} 
                        required
                      />
                    </Form.Group>
                  </Col>
                  
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Product Price <span className="text-danger">*</span></Form.Label>
                      <InputGroup>
                        <InputGroup.Text>$</InputGroup.Text>
                        <Form.Control 
                          type="number" 
                          name="price" 
                          placeholder="Enter Product Price" 
                          value={product.price} 
                          onChange={handleProductChange} 
                          required
                          min="0"
                          step="0.01"
                        />
                      </InputGroup>
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label>Product Description <span className="text-danger">*</span></Form.Label>
                  <Form.Control 
                    as="textarea" 
                    rows={3} 
                    name="description" 
                    placeholder="Enter Product Description" 
                    value={product.description} 
                    onChange={handleProductChange} 
                    required
                  />
                </Form.Group>

                <Row>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>Category <span className="text-danger">*</span></Form.Label>
                      <Form.Select 
                        value={product.category} 
                        name="category" 
                        onChange={handleProductChange}
                        required
                      >
                        <option value="">Select Category</option>
                        {category.map((item) => (
                          <option key={item.id} value={item.id}>{item.category}</option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  
                  <Col md={4}>
                    {product.category && (
                      <Form.Group className="mb-3">
                        <Form.Label>Subcategory <span className="text-danger">*</span></Form.Label>
                        <Form.Select 
                          value={product.subcategory} 
                          name="subcategory" 
                          onChange={handleProductChange}
                          required
                        >
                          <option value="">Select Subcategory</option>
                          {subcategory.filter((e) => e.subcategories !== "New").map((item) => (
                            <option key={item.id} value={item.id}>{item.subcategories}</option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    )}
                  </Col>
                  
                  <Col md={4}>
                    {product.subcategory && detail.length > 0 && (
                      <Form.Group className="mb-3">
                        <Form.Label>Category Detail <span className="text-danger">*</span></Form.Label>
                        <Form.Select 
                          value={product.detail} 
                          name="detail" 
                          onChange={handleProductChange}
                          required
                        >
                          <option value="">Select Category Detail</option>
                          {detail.map((item) => (
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
                          placeholder="Enter Product Discount (%)" 
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
                    <Card key={colorIndex} className="mb-3 border-0 shadow-sm">
                      <Card.Header className="bg-white py-3 d-flex justify-content-between align-items-center">
                        <span className="fw-bold">Color {colorIndex + 1}: {colorItem.name || "New Color"}</span>
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
                              <Form.Label>Color <span className="text-danger">*</span></Form.Label>
                              <Dropdown>
                                <Dropdown.Toggle variant="outline-secondary" className="w-100 text-start">
                                  {colorItem.name || "Select Color"}
                                </Dropdown.Toggle>
                                <Dropdown.Menu className="w-100">
                                  <div className="px-3 py-2">
                                    <Form.Control
                                      type="text"
                                      placeholder="Search colors..."
                                      value={colorSearch}
                                      onChange={(e) => setColorSearch(e.target.value)}
                                      onClick={(e) => e.stopPropagation()}
                                      autoFocus
                                    />
                                  </div>
                                  <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
                                    {filteredColors.length > 0 ? (
                                      filteredColors.slice(0,10).map((colorObj, idx) => (
                                        <Dropdown.Item 
                                          key={idx} 
                                          onClick={() => handleColorChange(colorIndex, colorObj.name)}
                                          active={colorItem.name === colorObj.name}
                                        >
                                          <div className="d-flex align-items-center">
                                            <span 
                                              className="d-block rounded-circle me-3" 
                                              style={{
                                                backgroundColor: colorObj.hex,
                                                width: "20px",
                                                height: "20px",
                                                border: "1px solid #ddd"
                                              }}
                                            ></span>
                                            <span>{colorObj.name}</span>
                                          </div>
                                        </Dropdown.Item>
                                      ))
                                    ) : (
                                      <Dropdown.Item disabled>No colors found</Dropdown.Item>
                                    )}
                                  </div>
                                </Dropdown.Menu>
                              </Dropdown>
                            </Form.Group>
                          </Col>
                        </Row>

                        <Row>
                          <Col md={6}>
                            <Form.Group className="mb-3">
                              <Form.Label>
                                Product Image
                                {(!isEditMode && !colorItem.productImageUrl) && (
                                  <span className="text-danger">*</span>
                                )}
                              </Form.Label>
                              {(!colorItem.productImageUrl || colorItem.productImage) ? (
                                <div>
                                  <Form.Control 
                                    type="file" 
                                    accept="image/*" 
                                    onChange={(e) => handleProductImageChange(colorIndex, e.target.files[0])}
                                    required={!isEditMode && !colorItem.productImageUrl}
                                  />
                                  {colorItem.productImage && (
                                    <div className="mt-2">
                                      <img
                                        src={URL.createObjectURL(colorItem.productImage)}
                                        alt={`New product image for ${colorItem.name || 'product'}`}
                                        className="img-fluid rounded mt-2"
                                        style={{ maxHeight: "150px" }}
                                      />
                                    </div>
                                  )}
                                </div>
                              ) : (
                                <div className="position-relative">
                                  <img
                                    src={`${IMAGEURL}/products/${colorItem.productImageUrl}`}
                                    alt={`Product image for ${colorItem.name || 'product'}`}
                                    className="img-fluid rounded"
                                    style={{ maxHeight: "150px" }}
                                    onError={(e) => {
                                      e.target.onerror = null;
                                      e.target.src = 'https://via.placeholder.com/150?text=No+Image';
                                    }}
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
                              )}
                            </Form.Group>
                          </Col>
                          
                          <Col md={6}>
                            <Form.Group className="mb-3">
                              <Form.Label>
                                Holder Product Image
                                {(!isEditMode && !colorItem.holderImageUrl) && (
                                  <span className="text-danger">*</span>
                                )}
                              </Form.Label>
                              {(!colorItem.holderImageUrl || colorItem.holderImage) ? (
                                <div>
                                  <Form.Control 
                                    type="file" 
                                    accept="image/*" 
                                    onChange={(e) => handleHolderImageChange(colorIndex, e.target.files[0])}
                                    required={!isEditMode && !colorItem.holderImageUrl}
                                  />
                                  {colorItem.holderImage && (
                                    <div className="mt-2">
                                      <img
                                        src={URL.createObjectURL(colorItem.holderImage)}
                                        alt={`New holder image for ${colorItem.name || 'product'}`}
                                        className="img-fluid rounded mt-2"
                                        style={{ maxHeight: "150px" }}
                                      />
                                    </div>
                                  )}
                                </div>
                              ) : (
                                <div className="position-relative">
                                  <img
                                    src={`${IMAGEURL}/products/${colorItem.holderImageUrl}`}
                                    alt={`Holder image for ${colorItem.name || 'product'}`}
                                    className="img-fluid rounded"
                                    style={{ maxHeight: "150px" }}
                                    onError={(e) => {
                                      e.target.onerror = null;
                                      e.target.src = 'https://via.placeholder.com/150?text=No+Image';
                                    }}
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
                            <Row key={sizeIndex} className="mb-2 g-2 align-items-center">
                              <Col xs={5}>
                                <Form.Control 
                                  type="text" 
                                  placeholder="Size (e.g., S, M, L)" 
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

                <div className="d-flex justify-content-end mt-3">
                  <Button 
                    variant="primary" 
                    type="submit" 
                    className="px-4 py-2"
                    disabled={isLoading || !validateForm()}
                  >
                    {isLoading ? (
                      <>
                        <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" className="me-2" />
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