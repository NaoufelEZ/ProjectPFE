import { useState,useEffect } from 'react';
import { Table, Badge, Button, Form, Pagination } from 'react-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';
import useUser from '../../../Hooks/useUser';
import { ApiKey,APIURL } from '../../../Api/Api';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { Helmet } from "react-helmet-async";
import { IoMdEye } from "react-icons/io";
import StatusBox from './StatusBox';
import useDeleteItem from '../../../Hooks/useDeleteItem';
import { useNavigate } from 'react-router-dom';




const Products = () => {
  const user = useUser();
  const cookie = new Cookies();
  const token = cookie.get("auth");

  const [currentPage, setCurrentPage] = useState(1);
  const [isStatusOpen,setIsStatusOpen] = useState(false)
  const [products,setProducts] = useState([]);
  const [search,setSearch] = useState("");
  const [productsFilter,setProductsFilter] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const navigate = useNavigate();


  const deleteItem = useDeleteItem();


  useEffect(()=>{
    axios.get(`${APIURL}/products`,{
      headers:{
        Authorization: `Bearer ${token}`,
        "x-api-key":ApiKey,
      }
    }).then((response)=>{setProducts(response.data.data);setProductsFilter(response.data.data)})
  },[token])
  useEffect(()=>{
    setProductsFilter(products.filter((element)=>element.title.toLowerCase().includes(search.toLowerCase().trim())));
  },[search])

  const handleStatusClick = (product) => {
    setSelectedProduct(product);
    setIsStatusOpen(true);
  };

  const itemsPerPage = 6;


  const handleProductDelete = (id) => {
    deleteItem(id, "product/delete", token, () => {
      window.location.reload();
    });
  }

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = productsFilter.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(productsFilter.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
    <Helmet>
      <title>Inventory|Nalouti Dashboard</title>
    </Helmet>
    <StatusBox isStatusOpen={isStatusOpen} setIsStatusOpen={setIsStatusOpen} data={selectedProduct} />
    <div className="w-100 p-2">
    <div className="d-flex justify-content-between align-items-center">
      <span className="fw-bold h5">Inventory Management</span>
      <div className="d-flex align-items-center">
        <Form.Control onChange={(e)=>setSearch(e.target.value)} value={search} className="me-3"  placeholder="Search Inventory"/>
        {
          user && user.role === "Product Manager" &&
          <Button onClick={()=>navigate("add")} className="w-75">Add New Item</Button>
        }
      </div>
    </div>
    <hr/>
      <div className="table-responsive">
        <Table hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Product Name</th>
              <th>description</th>
              <th>Category</th>
              <th>Price</th>
              <th>Status</th>
              {user && user.role === 'Product Manager' && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {currentItems && currentItems.length > 0 ? currentItems.map((item,index) => (
              <tr key={index}>
                <td>{index+1}</td>
                <td>{item.title}</td>
                <td>
                {item.description.split(" ").slice(0, 5).join(" ")}{item.description.split(" ").length > 5 ? "..." : ""}
                </td>
                <td>{item.details.categoryDetails}</td>
                <td>{item.price.toFixed(2)} TND</td>
                <td><IoMdEye onClick={()=>handleStatusClick(item.product_stock)} color='green' role="button" size={25} /></td>
                {user && user.role === 'Product Manager' && (
                  <td>
                    <Button onClick={()=>navigate(`${item.id}`)} variant="outline-primary" size="sm" className="me-2">
                      <FaEdit />
                    </Button>
                    <Button onClick={()=>handleProductDelete(item.id)} variant="outline-danger" size="sm">
                      <FaTrash />
                    </Button>
                  </td>
                )}
              </tr>
            ))
            :
            <tr>
              <td className="text-center" colspan="6">Not Found</td>
            </tr>
            }
          </tbody>
        </Table>
      </div>

      <div className="d-flex justify-content-between align-items-center mt-3">
        <div>
          Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, productsFilter.length)} of {productsFilter.length} items
        </div>
        <Pagination>
          <Pagination.First
            onClick={() => paginate(1)}
            disabled={currentPage === 1}
          />
          <Pagination.Prev
            onClick={() => paginate(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
          />

          {[...Array(totalPages).keys()].map(number => (
            <Pagination.Item
              key={number + 1}
              active={number + 1 === currentPage}
              onClick={() => paginate(number + 1)}
            >
              {number + 1}
            </Pagination.Item>
          ))}

          <Pagination.Next
            onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
          />
          <Pagination.Last
            onClick={() => paginate(totalPages)}
            disabled={currentPage === totalPages}
          />
        </Pagination>
      </div>
    </div>
    </>
  );
};

export default Products;
