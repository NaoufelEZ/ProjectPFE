import { useState,useEffect } from 'react';
import { Table, Badge, Button, Form, Pagination } from 'react-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';
import useUser from '../../../Hooks/useUser';
import { ApiKey,APIURL } from '../../../Api/Api';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { Helmet } from "react-helmet-async";




const Category = () => {
  const user = useUser();
  const cookie = new Cookies();
  const token = cookie.get("auth");

  const [currentPage, setCurrentPage] = useState(1);
  const [category,setCategory] = useState([]);
  const [search,setSearch] = useState("");
  const [categoryFilter,setCategoryFilter] = useState([]);
  useEffect(()=>{
    axios.get(`${APIURL}/category`,{
      headers:{
        Authorization: `Bearer ${token}`,
        "x-api-key":ApiKey,
      }
    }).then((response)=>{setCategory(response.data.data);setCategoryFilter(response.data.data)})
  },[])
  useEffect(()=>{
    setCategoryFilter(category.filter((element)=>element.title.toLowerCase().includes(search.toLowerCase().trim())));
  },[search])
  const itemsPerPage = 6;
  
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = categoryFilter.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(categoryFilter.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
    <Helmet>
      <title>Category|Nalouti Dashboard</title>
    </Helmet>
    <div className="w-100 p-2">
    <div className="d-flex justify-content-between align-items-center">
      <span className="fw-bold h5">Category Management</span>
      <div className="d-flex align-items-center">
        <Form.Control onChange={(e)=>setSearch(e.target.value)} value={search} className="me-3"  placeholder="Search Category"/>
        {
          user && user.role === "Product Manager" &&
          <Button className="w-75">Add New Item</Button>
        }
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
            {categoryFilter && categoryFilter.length > 0 ? categoryFilter.map((item,index) => (
              <tr key={index}>
                <td>{index+1}</td>
                <td>{item.category}</td>
                  <td>
                    <Button variant="outline-primary" size="sm" className="me-2">
                      <FaEdit />
                    </Button>
                    <Button variant="outline-danger" size="sm">
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

export default Category;
