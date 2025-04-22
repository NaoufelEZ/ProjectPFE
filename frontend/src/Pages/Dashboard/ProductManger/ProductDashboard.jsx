import React, { useEffect, useState } from "react";
import { Form, Button, Row, Col, InputGroup, Alert, Card, Container, Dropdown } from "react-bootstrap";
import axios from "axios";
import { ApiKey, APIURL } from "../../../Api/Api";
import Cookies from "universal-cookie";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import {colornames} from "color-name-list";

const ProductForm = () => {
  const { idProd } = useParams();
  const [isEditMode, setIsEditMode] = useState(false);
  const [category, setCategory] = useState([]);
  const [subcategory, setSubCategory] = useState([]);
  const [detail, setDetail] = useState([]);
  const [colorSearch, setColorSearch] = useState("");
  const [colorSelects, setColorSelects] = useState([
    { name: "", image: null, imageUrl: "", sizes: [{ size: "", quantity: "" }] },
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
            },
          });
          
          const data = response.data.data;
          setProduct({
            title: data.title,
            description: data.description,
            price: data.price,
            discount: data.discount,
            category: data.category_id,
            subcategory: data.subcategory_id,
            detail: data.details_id,
          });

          const transformedColorSelects = [];
          data.product_stock.forEach((stock) => {
            const existingColor = transformedColorSelects.find(c => c.name === stock.color);

            if (existingColor) {
              existingColor.sizes.push({
                size: stock.size,
                quantity: stock.quantity
              });
            } else {
              transformedColorSelects.push({
                name: stock.color,
                image: null,
                imageUrl: stock.image,
                sizes: [{ size: stock.size, quantity: stock.quantity }]
              });
            }
          });

          setColorSelects(transformedColorSelects);
          setIsEditMode(true);
        } catch (err) {
          console.error("Error loading product:", err);
          setMessage({ type: "danger", text: "Failed to load product data" });
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchProduct();
  }, [idProd]);

  const addColorSelect = () => {
    setColorSelects([...colorSelects, { name: "", image: null, imageUrl: "", sizes: [{ size: "", quantity: "" }] }]);
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
    setColorSearch(""); // Clear search after selection
  };

  const handleImageChange = (colorIndex, file) => {
    setColorSelects(prev =>
      prev.map((item, index) => (index === colorIndex ? { ...item, image: file, imageUrl: URL.createObjectURL(file) } : item))
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
    formData.append("discount", product.discount);
    formData.append("details_id", product.detail);

    colorSelects.forEach((colorItem) => {
      formData.append(`colors[]`, colorItem.name);
      if (colorItem.image) {
        formData.append(`product_pictures[]`, colorItem.image);
      } else if (colorItem.imageUrl && !colorItem.image) {
        // For existing images in edit mode that haven't been changed
        formData.append(`existing_images[]`, colorItem.imageUrl);
      }
      colorItem.sizes.forEach((sizeItem) => {
        formData.append(`sizes[]`, sizeItem.size);
        formData.append(`quantity[]`, sizeItem.quantity);
      });
    });

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
      
      setMessage({ type: "success", text: response.data.data || "Product saved successfully!" });
    } catch (error) {
      console.error("Error saving product:", error);
      setMessage({ 
        type: "danger", 
        text: error.response?.data?.data || "An error occurred while saving the product" 
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>{isEditMode ? "Edit Product" : "Add Product"} | Nalouti Dashboard</title>
      </Helmet>
      <Container fluid>
        <Card className="shadow-sm">
          <Card.Header className="bg-primary text-white">
            <h4 className="mb-0">
              <i className="fas fa-box me-2"></i>
              {isEditMode ? "Edit Product" : "Add New Product"}
            </h4>
          </Card.Header>
          <Card.Body>
            {message && (
              <Alert variant={message.type} onClose={() => setMessage(null)} dismissible>
                {message.text}
              </Alert>
            )}

            {isLoading && (
              <div className="text-center py-4">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            )}

            {!isLoading && (
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Product Name</Form.Label>
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
                      <Form.Label>Product Price</Form.Label>
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
                  <Form.Label>Product Description</Form.Label>
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
                      <Form.Label>Category</Form.Label>
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
                    {product.category && subcategory.length > 0 && (
                      <Form.Group className="mb-3">
                        <Form.Label>Subcategory</Form.Label>
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
                    {detail && detail.length > 0 && (
                      <Form.Group className="mb-3">
                        <Form.Label>Category Detail</Form.Label>
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
                  <h5 className="mb-3">
                    <i className="fas fa-palette me-2"></i>
                    Product Variants
                  </h5>
                  {colorSelects.map((colorItem, colorIndex) => (
                    <Card key={colorIndex} className="mb-3 border-primary">
                      <Card.Header className="bg-light d-flex justify-content-between align-items-center">
                        <span>Color {colorIndex + 1}</span>
                        <Button 
                          variant="outline-danger" 
                          size="sm" 
                          onClick={() => removeColorSelect(colorIndex)}
                          disabled={colorSelects.length <= 1}
                        >
                          <i className="fas fa-times"></i> Remove
                        </Button>
                      </Card.Header>
                      <Card.Body>
                        <Row>
                          <Col md={6}>
                            <Form.Group className="mb-3">
                              <Form.Label>Color</Form.Label>
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
                                          <span className="d-block rounded-circle me-3" style={{backgroundColor:colorObj.hex,width:"20px",height:"20px"}}></span>
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
                          <Col md={6}>
                            <Form.Group className="mb-3">
                              <Form.Label>Product Image</Form.Label>
                              <Form.Control 
                                type="file" 
                                accept="image/*" 
                                onChange={(e) => handleImageChange(colorIndex, e.target.files[0])}
                                required={!isEditMode || !colorItem.imageUrl}
                              />
                              {colorItem.imageUrl && (
                                <div className="mt-2">
                                  <img
                                    src={colorItem.imageUrl}
                                    alt={`Preview for ${colorItem.name}`}
                                    className="img-thumbnail"
                                    style={{ width: "100px", height: "100px", objectFit: "cover" }}
                                  />
                                </div>
                              )}
                            </Form.Group>
                          </Col>
                        </Row>

                        <div className="mb-3">
                          <div className="d-flex justify-content-between align-items-center mb-2">
                            <h6 className="mb-0">Sizes & Quantities</h6>
                            <Button 
                              variant="outline-success" 
                              size="sm" 
                              onClick={() => addSizeSelect(colorIndex)}
                            >
                              <i className="fas fa-plus me-1"></i> Add Size
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
                                  <i className="fas fa-times"></i>
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
                    <i className="fas fa-plus me-1"></i> Add Another Color
                  </Button>
                </div>

                <div className="d-grid gap-2">
                  <Button 
                    variant="primary" 
                    type="submit" 
                    size="lg"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Processing...
                      </>
                    ) : isEditMode ? (
                      <>
                        <i className="fas fa-save me-2"></i>
                        Update Product
                      </>
                    ) : (
                      <>
                        <i className="fas fa-plus-circle me-2"></i>
                        Add Product
                      </>
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