import React, { useEffect, useState } from "react";
import { Form, Button, Row, Col, Card, Container, Alert, Spinner,Dropdown } from "react-bootstrap";
import axios from "axios";
import { ApiKey, APIURL } from "../../../Api/Api";
import Cookies from "universal-cookie";
import { Helmet } from "react-helmet-async";
import { IoAdd, IoArrowBack } from "react-icons/io5";
import {colornames} from "color-name-list";
import { Navigate, useNavigate } from "react-router-dom";

const ProductForm = () => {
  const [category, setCategory] = useState([]);
  const [subcategory, setSubCategory] = useState([]);
  const [detail, setDetail] = useState([]);
  const [colorSearch, setColorSearch] = useState("");
  const [colorSelects, setColorSelects] = useState([
    { name: "", holderProductPicture: null,productPicture :null, sizes: [{ size: "", quantity: "" }] },
  ]);
  const [product, setProduct] = useState({
    title: "",
    description: "",
    category: "",
    subcategory: "",
    detail: "",
    price: "",
    discount: 0,
  });
  const navigate = useNavigate();
   const colors = [...new Map(colornames.map(color => [color.name, color])).values()]
    .sort((a, b) => a.name.localeCompare(b.name));
  
    // Filter colors based on search input
    const filteredColors = colors.filter(color =>
      color.name.toLowerCase().includes(colorSearch.toLowerCase())
    );
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const cookie = new Cookies();
  const token = cookie.get("auth");

  useEffect(() => {
    axios.get(`${APIURL}/category`, {
      headers: {
        Accept: "application/json",
        "x-api-key": ApiKey,
      }
    }).then((response) => setCategory(response.data.data));
  }, []);

  useEffect(() => {
    if (product.category) {
      axios.get(`${APIURL}/admin/category/${product.category}/subcategory`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
          "x-api-key": ApiKey,
        }
      }).then((response) => setSubCategory(response.data.data))
        .catch((err) => console.log(err));
    }
  }, [product.category]);

  useEffect(() => {
    if (product.category && product.subcategory) {
      axios.get(`${APIURL}/admin/category/${product.category}/subcategory/${product.subcategory}`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
          "x-api-key": ApiKey,
        }
      }).then((response) => setDetail(response.data.data));
    }
  }, [product.category, product.subcategory]);

  const addColorSelect = () => {
    setColorSelects([...colorSelects, { name: "", holderProductPicture: null,productPicture :null, sizes: [{ size: "", quantity: "" }] }]);
  };

  const removeColorSelect = (index) => {
    if (colorSelects.length > 1) {
      setColorSelects(colorSelects.filter((_, i) => i !== index));
    }
  };

  const removeSizeSelect = (colorIndex, sizeIndex) => {
    if (colorSelects[colorIndex].sizes.length > 1) {
      setColorSelects(prev =>
        prev.map((item, index) =>
          index === colorIndex
            ? { ...item, sizes: item.sizes.filter((_, i) => i !== sizeIndex) }
            : item
        )
      );
    }
  };

  const handleProductChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleColorChange = (colorIndex, value) => {
    setColorSelects(prev =>
      prev.map((item, index) => (index === colorIndex ? { ...item, name: value } : item))
    );
  };

  const handleProductPictureChange = (colorIndex, file) => {
    setColorSelects(prev =>
      prev.map((item, index) => (index === colorIndex ? { ...item, productPicture: file } : item))
    );
  };
  const handleHolderProductPictureChange = (colorIndex, file) => {
    setColorSelects(prev =>
      prev.map((item, index) => (index === colorIndex ? { ...item, holderProductPicture : file } : item))
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
    const formData = new FormData();


    formData.append("title", product.title);
    formData.append("description", product.description);
    formData.append("price", product.price);
    formData.append("discount", product.discount);
    formData.append("details_id", product.detail);

    colorSelects.forEach((colorItem) => {
  colorItem.sizes.forEach((sizeItem) => {
    formData.append(`colors[]`, colorItem.name);
    formData.append(`sizes[]`, sizeItem.size);
    formData.append(`quantity[]`, sizeItem.quantity);
    
    if (colorItem.productPicture && colorItem.holderProductPicture) {
      formData.append(`product_pictures[]`, colorItem.productPicture);
      formData.append(`holder_pictures[]`, colorItem.holderProductPicture);
    }
  });
});
    try {
      const response = await axios.post(`${APIURL}/product/add`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "application/json",
          "x-api-key": ApiKey,
          Authorization: `Bearer ${token}`
        },
      });
      navigate("/dashboard/inventory");
      setMessage({ type: "success", text: response.data.data });
    } catch (error) {
      setMessage({
        type: "danger",
        text: error.response?.data?.data || "An error occurred"
      });
      console.log(error)
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Add Product | Nalouti Dashboard</title>
      </Helmet>

      <Container fluid className="py-4">
        <Button
          variant="outline-secondary"
          onClick={() => window.history.back()}
          className="mb-3 d-flex align-items-center"
        >
          <IoArrowBack className="me-2" /> Back
        </Button>

        <Card className="shadow-sm">
          <Card.Header className="bg-white py-3">
            <h5 className="mb-0 fw-bold">Add New Product</h5>
          </Card.Header>

          <Card.Body>
            {message && (
              <Alert variant={message.type} className="mb-4" dismissible onClose={() => setMessage(null)}>
                {message.text}
              </Alert>
            )}

            <Form onSubmit={handleSubmit}>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Product Name <span className="text-danger">*</span></Form.Label>
                    <Form.Control
                      type="text"
                      name="title"
                      placeholder="Enter product name"
                      value={product.title}
                      onChange={handleProductChange}
                      required
                    />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Price <span className="text-danger">*</span></Form.Label>
                    <Form.Control
                      type="number"
                      name="price"
                      placeholder="Enter price"
                      value={product.price}
                      onChange={handleProductChange}
                      required
                    />
                  </Form.Group>
                </Col>

                <Col md={12}>
                  <Form.Group className="mb-3">
                    <Form.Label>Description <span className="text-danger">*</span></Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      name="description"
                      placeholder="Enter product description"
                      value={product.description}
                      onChange={handleProductChange}
                      required
                    />
                  </Form.Group>
                </Col>

                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label>Category <span className="text-danger">*</span></Form.Label>
                    <Form.Select
                      name="category"
                      value={product.category}
                      onChange={handleProductChange}
                      required
                    >
                      <option value="" disabled>Select category</option>
                      {category.map((item) => (
                        <option key={item.id} value={item.id}>{item.category}</option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>

                <Col md={4}>
                  {product.category && subcategory.length > 0 && (
                    <Form.Group className="mb-3">
                      <Form.Label>Subcategory <span className="text-danger">*</span></Form.Label>
                      <Form.Select
                        name="subcategory"
                        value={product.subcategory}
                        onChange={handleProductChange}
                        required
                      >
                        <option value="" disabled>Select subcategory</option>
                        {subcategory.filter(e => e.subcategories !== "New").map((item) => (
                          <option key={item.id} value={item.id}>{item.subcategories}</option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  )}
                </Col>

                <Col md={4}>
                  {detail && detail.length > 0 && (
                    <Form.Group className="mb-3">
                      <Form.Label>Category Detail <span className="text-danger">*</span></Form.Label>
                      <Form.Select
                        name="detail"
                        value={product.detail}
                        onChange={handleProductChange}
                        required
                      >
                        <option value="" disabled>Select category detail</option>
                        {detail.map((item) => (
                          <option key={item.id} value={item.id}>{item.categoryDetails}</option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  )}
                </Col>

                <Col md={6}>
                  <Form.Group className="mb-4">
                    <Form.Label>Discount</Form.Label>
                    <Form.Control
                      type="number"
                      min={0}
                      max={100}
                      name="discount"
                      placeholder="Enter discount percentage"
                      value={product.discount}
                      onChange={handleProductChange}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <hr className="my-4" />

              <div className="mb-4">
                <h5 className="mb-3">Product Variants</h5>
                {colorSelects.map((colorItem, colorIndex) => (
                  <Card key={colorIndex} className="mb-4 border-0 shadow-sm">
                    <Card.Header className="bg-light d-flex justify-content-between align-items-center">
                      <span className="fw-bold">Color Variant {colorIndex + 1}</span>
                      {colorSelects.length > 1 && (
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => removeColorSelect(colorIndex)}
                        >
                          Remove
                        </Button>
                      )}
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
                      </Row>
                      <Row className="mb-3">
                      <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Holder Product Picture <span className="text-danger">*</span></Form.Label>
                            <Form.Control
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleHolderProductPictureChange(colorIndex, e.target.files[0])}
                              required={!colorItem.image}
                            />
                          </Form.Group>
                        </Col>

                      <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Product Picture <span className="text-danger">*</span></Form.Label>
                            <Form.Control
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleProductPictureChange(colorIndex, e.target.files[0])}
                              required={!colorItem.image}
                            />
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
                            <IoAdd /> Add Size
                          </Button>
                        </div>

                        {colorItem.sizes.map((sizeItem, sizeIndex) => (
                          <Row key={sizeIndex} className="mb-2 g-2 align-items-center">
                            <Col md={5}>
                              <Form.Control
                                type="text"
                                placeholder="Size (e.g., S, M, L)"
                                value={sizeItem.size}
                                onChange={(e) => handleSizeChange(colorIndex, sizeIndex, "size", e.target.value)}
                                required
                              />
                            </Col>
                            <Col md={5}>
                              <Form.Control
                                type="number"
                                min="0"
                                placeholder="Quantity"
                                value={sizeItem.quantity}
                                onChange={(e) => handleSizeChange(colorIndex, sizeIndex, "quantity", e.target.value)}
                                required
                              />
                            </Col>
                            <Col md={2}>
                              {colorItem.sizes.length > 1 && (
                                <Button
                                  variant="outline-danger"
                                  size="sm"
                                  className="w-100"
                                  onClick={() => removeSizeSelect(colorIndex, sizeIndex)}
                                >
                                  ×
                                </Button>
                              )}
                            </Col>
                          </Row>
                        ))}
                      </div>
                    </Card.Body>
                  </Card>
                ))}

                <Button
                  variant="outline-primary"
                  className="d-flex align-items-center mx-auto"
                  onClick={addColorSelect}
                >
                  <IoAdd className="me-2" /> Add Color Variant
                </Button>
              </div>

              <div className="d-flex justify-content-end mt-4">
                <Button
                  variant="primary"
                  type="submit"
                  size="lg"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Spinner as="span" animation="border" size="sm" className="me-2" />
                      Saving...
                    </>
                  ) : 'Save Product'}
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default ProductForm;