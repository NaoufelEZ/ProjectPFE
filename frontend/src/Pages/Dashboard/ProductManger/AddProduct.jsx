import React, { useEffect, useState } from "react";
import { Form, Button, Row, Col, InputGroup, Alert } from "react-bootstrap";
import axios from "axios";
import { ApiKey, APIURL } from "../../../Api/Api";
import Cookies from "universal-cookie";
import { Helmet } from "react-helmet-async";

const ProductForm = () => {

  const [category,setCategory] = useState([])
  const [subcategory,setSubCategory] = useState([])
  const [detail,setDetail] = useState([])
  const [colors, setColors] = useState(["Red", "Green", "Blue","Yellow","White","Black","Pink","Brown"]);
  const [colorSelects, setColorSelects] = useState([
    { name: "", image: null, sizes: [{ size: "", quantity: "" }] },
  ]);
  const [product, setProduct] = useState({
    title: "",
    description: "",
    category: "",
    subcategory: "",
    price: "",
    discount: "",
  });
  const [message, setMessage] = useState(null);

  const cookie = new Cookies();
  const token = cookie.get("auth");

  useEffect(()=>{
    axios.get(`${APIURL}/category`,{
      headers:{
        Accept:"application/json",
        "x-api-key":ApiKey,
      }
    }).then((response)=>setCategory(response.data.data))
  },[])
console.log(product.category)
console.log(subcategory)
  useEffect(()=>{
    if(product.category){ 
      axios.get(`${APIURL}/admin/category/${product.category}/subcategory`,{
      headers:{
        Accept:"application/json",
        Authorization:`Bearer ${token}`,
        "x-api-key":ApiKey,
      }
    }).then((response)=>setSubCategory(response.data.data)
  ).catch((err)=>console.log(err));
  }
  },[product.category])

  useEffect(()=>{
    if(product.category && product.subcategory){ 
      axios.get(`${APIURL}/admin/category/${product.category}/subcategory/${product.subcategory}`,{
      headers:{
        Accept:"application/json",
        Authorization:`Bearer ${token}`,
        "x-api-key":ApiKey,
      }
    }).then((response)=>setDetail(response.data.data));
  }
  },[product.category,product.subcategory])

  const addColorSelect = () => {
    setColorSelects([...colorSelects, { name: "", image: null, sizes: [{ size: "", quantity: "" }] }]);
  };

  const handleProductChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleColorChange = (colorIndex, value) => {
    setColorSelects(prev =>
      prev.map((item, index) => (index === colorIndex ? { ...item, name: value } : item))
    );
  };

  const handleImageChange = (colorIndex, file) => {
    setColorSelects(prev =>
      prev.map((item, index) => (index === colorIndex ? { ...item, image: file } : item))
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
    const formData = new FormData();

    formData.append("title", product.title);
    formData.append("description", product.description);
    formData.append("price", product.price);
    formData.append("discount", product.discount);

    colorSelects.forEach((colorItem, colorIndex) => {
      formData.append(`colors[]`, colorItem.name);
      if (colorItem.image) {
        formData.append(`product_pictures[]`, colorItem.image);
      }
      colorItem.sizes.forEach((sizeItem, sizeIndex) => {
        formData.append(`sizes[]`, sizeItem.size);
        formData.append(`quantity[]`, sizeItem.quantity);
      });
    });

    try {
      const response = await axios.post(`${APIURL}/product/add`, formData, {
        headers: { "Content-Type": "multipart/form-data", Accept: "application/json" , "x-api-key": ApiKey, Authorization: `Bearer ${token}` },
      });
      setMessage({ type: "success", text: response.data.data });
    } catch (error) {
      console.log(error)
      setMessage({ type: "danger", text: error.response?.data?.data || "An error occurred" });
    }
  };

  return (
    <>
    <Helmet>
      <title>Add Product|Nalouti Dashboard</title>
    </Helmet>
    <div>
    <span className="fw-bold h5">Add New Product</span>
    <hr/>

      {message && <Alert variant={message.type}>{message.text}</Alert>}

    <Form className="w-100 p-4" onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Product Name</Form.Label>
        <Form.Control
          type="text"
          name="title"
          placeholder="Enter Product Name"
          value={product.title}
          onChange={handleProductChange}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Product Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          name="description"
          placeholder="Enter Product Description"
          value={product.description}
          onChange={handleProductChange}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Category</Form.Label>
        <Form.Select value={product.category} name="category" onChange={handleProductChange}>
          <option value="" disabled >Select Category</option>
          {category && category.map((item)=>(
          <option key={item.id} value={item.id}>{item.category}</option>
          
          ))}
        </Form.Select>
      </Form.Group>

      {
        product.category && subcategory.length > 0 &&
        <Form.Group className="mb-3">
        <Form.Label>Subcategory</Form.Label>
        <Form.Select value={product.subcategory} name="subcategory" onChange={handleProductChange}>
          <option value="" disabled selected >Select subcategory</option>
          {subcategory.filter((e)=>e.subcategories !== "New").map((item)=>(
          <option key={item.id} value={item.id}>{item.subcategories}</option>
          
          ))}
        </Form.Select>
      </Form.Group>
      }

      {
        detail && detail.length > 0 &&
        <Form.Group className="mb-3">
        <Form.Label>category detail</Form.Label>
        <Form.Select value={product.subcategory} name="subcategory" onChange={handleProductChange}>
          <option value="" disabled selected >Select subcategory</option>
          {detail.map((item)=>(
          <option key={item.id} value={item.id}>{item.categoryDetails}</option>
          
          ))}
        </Form.Select>
      </Form.Group>
      }

      <Form.Group className="mb-3">
        <Form.Label>Product Price</Form.Label>
        <Form.Control
          type="number"
          name="price"
          placeholder="Enter Product Price"
          value={product.price}
          onChange={handleProductChange}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Discount</Form.Label>
        <Form.Control
          type="number"
          name="discount"
          placeholder="Enter Product Discount (%)"
          value={product.discount}
          onChange={handleProductChange}
        />
      </Form.Group>

      {colorSelects.map((colorItem, colorIndex) => (
        <div key={colorIndex} className="p-3 mb-4 border rounded bg-white shadow-sm">
          <h5>Color {colorIndex + 1}</h5>
          <Form.Select
            value={colorItem.name}
            onChange={(e) => handleColorChange(colorIndex, e.target.value)}
            className="mb-3"
          >
            <option value="" disabled>Select Color</option>
            {colors.map((color, index) => (
              <option key={index} value={color}>
                {color}
              </option>
            ))}
          </Form.Select>

          <Form.Group className="mb-3">
            <Form.Label>Product Image</Form.Label>
            <Form.Control
              type="file"
              onChange={(e) => handleImageChange(colorIndex, e.target.files[0])}
            />
          </Form.Group>

          {colorItem.sizes.map((sizeItem, sizeIndex) => (
            <Row key={sizeIndex} className="mb-3 align-items-center">
              <Col xs={6}>
                <InputGroup>
                  <Form.Control
                    type="text"
                    placeholder="Size"
                    value={sizeItem.size}
                    onChange={(e) => handleSizeChange(colorIndex, sizeIndex, "size", e.target.value)}
                  />
                  <Button variant="outline-primary">Set</Button>
                </InputGroup>
              </Col>

              <Col xs={6}>
                <InputGroup>
                  <Form.Control
                    type="number"
                    placeholder="Quantity"
                    value={sizeItem.quantity}
                    onChange={(e) => handleSizeChange(colorIndex, sizeIndex, "quantity", e.target.value)}
                  />
                  <Button variant="outline-primary">Set</Button>
                </InputGroup>
              </Col>
            </Row>
          ))}

          <Button variant="success" className="w-100" onClick={() => addSizeSelect(colorIndex)}>
            + Add Size
          </Button>
        </div>
      ))}

      <Button variant="warning" className="w-100 mb-3" onClick={addColorSelect}>
        + Add Color
      </Button>

      <Button variant="primary" type="submit" className="w-100">
        Submit
      </Button>
    </Form>
    </div>
    </>
  );
};

export default ProductForm;
