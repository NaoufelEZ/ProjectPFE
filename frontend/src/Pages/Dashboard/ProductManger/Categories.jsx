import { useState,useEffect } from 'react';
import { Table, Button, Form, Pagination } from 'react-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { ApiKey,APIURL } from '../../../Api/Api';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { Helmet } from "react-helmet-async";
import { useNavigate } from 'react-router-dom';
import useDeleteItem from '../../../Hooks/useDeleteItem';




const Categories = () => {
  const cookie = new Cookies();
  const token = cookie.get("auth");

  const [currentPage, setCurrentPage] = useState(1);
  const [category,setCategory] = useState([]);
  const [search,setSearch] = useState("");
  const [categoryFilter,setCategoryFilter] = useState([]);

  const deleteItem = useDeleteItem();

  const navigate = useNavigate();
  useEffect(()=>{
    axios.get(`${APIURL}/category`,{
      headers:{
        Authorization: `Bearer ${token}`,
        "x-api-key":ApiKey,
      }
    }).then((response)=>{setCategory(response.data.data);setCategoryFilter(response.data.data)})
  },[])
  useEffect(()=>{
    setCategoryFilter(category.filter((element)=>element.category.toLowerCase().includes(search.toLowerCase().trim())));
  },[search]);

  const handleCategoryDelete = (id) => {
    deleteItem(id, "admin/category/delete", token, () => {
      window.location.reload();
    });
  }
  const itemsPerPage = 6;
  
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = categoryFilter.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(categoryFilter.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
    <Helmet>
      <title>Categories|Nalouti Dashboard</title>
    </Helmet>
    <div className="w-100 p-2">
    <div className="d-flex justify-content-between align-items-center">
      <span className="fw-bold h5">Categories Management</span>
      <div className="d-flex align-items-center">
        <Form.Control onChange={(e)=>setSearch(e.target.value)} value={search} className="me-3"  placeholder="Search Category"/>
          <Button className="w-75" onClick={()=>navigate("add")}>Add New Item</Button>
      </div>
    </div>
    <hr/>
      <div className="table-responsive">
        <Table hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Category Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentItems && currentItems.length > 0 ? currentItems.map((item,index) => (
              <tr key={index}>
                <td>{index+1}</td>
                <td>{item.category}</td>
                  <td>
                    <Button onClick={()=>navigate(`${item.id}`)} variant="outline-primary" size="sm" className="me-2">
                      <FaEdit />
                    </Button>
                    <Button onClick={()=>handleCategoryDelete(item.id)} variant="outline-danger" size="sm">
                      <FaTrash />
                    </Button>
                  </td>
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
          Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, categoryFilter.length)} of {categoryFilter.length} items
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

export default Categories;
