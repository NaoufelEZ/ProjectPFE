import { useState,useEffect } from 'react';
import { Table, Button, Form, Pagination } from 'react-bootstrap';
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
import { AiFillProduct } from "react-icons/ai";




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
      <span className="fw-bold h3"> <AiFillProduct/> Inventory Management</span>
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
                    <div className="flex">
                    <Button onClick={()=>navigate(`${item.id}`)} variant="outline-primary" size="sm" className="me-2">
                      <FaEdit />
                    </Button>
                    <Button onClick={()=>handleProductDelete(item.id)} variant="outline-danger" size="sm">
                      <FaTrash />
                    </Button>
                    </div>
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
  <Pagination.First onClick={() => paginate(1)} disabled={currentPage === 1} />
  <Pagination.Prev onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} />

  {totalPages <= 7 ? (
    // Small number of pages, show all
    [...Array(totalPages).keys()].map((_, i) => (
      <Pagination.Item
        key={i + 1}
        active={i + 1 === currentPage}
        onClick={() => paginate(i + 1)}
      >
        {i + 1}
      </Pagination.Item>
    ))
  ) : currentPage <= 4 ? (
    // Near start
    <>
      {[1, 2, 3, 4, 5].map((page) => (
        <Pagination.Item
          key={page}
          active={page === currentPage}
          onClick={() => paginate(page)}
        >
          {page}
        </Pagination.Item>
      ))}
      <Pagination.Ellipsis disabled />
      <Pagination.Item onClick={() => paginate(totalPages)}>
        {totalPages}
      </Pagination.Item>
    </>
  ) : currentPage >= totalPages - 3 ? (
    // Near end
    <>
      <Pagination.Item onClick={() => paginate(1)}>1</Pagination.Item>
      <Pagination.Ellipsis disabled />
      {[totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages].map((page) => (
        <Pagination.Item
          key={page}
          active={page === currentPage}
          onClick={() => paginate(page)}
        >
          {page}
        </Pagination.Item>
      ))}
    </>
  ) : (
    // Middle range
    <>
      <Pagination.Item onClick={() => paginate(1)}>1</Pagination.Item>
      <Pagination.Ellipsis disabled />
      {[currentPage - 1, currentPage, currentPage + 1].map((page) => (
        <Pagination.Item
          key={page}
          active={page === currentPage}
          onClick={() => paginate(page)}
        >
          {page}
        </Pagination.Item>
      ))}
      <Pagination.Ellipsis disabled />
      <Pagination.Item onClick={() => paginate(totalPages)}>
        {totalPages}
      </Pagination.Item>
    </>
  )}

  <Pagination.Next
    onClick={() => paginate(currentPage + 1)}
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
