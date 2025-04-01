import { useState,useEffect } from 'react';
import { Table, Button, Form, Pagination } from 'react-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { ApiKey,APIURL, IMAGEURL } from '../../../Api/Api';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { Helmet } from "react-helmet-async";
import { useNavigate } from 'react-router-dom';
import useDeleteItem from '../../../Hooks/useDeleteItem';

const CategoryDetails = () => {
  const cookie = new Cookies();
  const token = cookie.get("auth");

  const [currentPage, setCurrentPage] = useState(1);
  const [categoryDetails,setCategoryDetails] = useState([]);
  const [search,setSearch] = useState("");
  const [categoryDetailsFilter,setCategoryDetailsFilter] = useState([]);

  const deleteItem = useDeleteItem();
  const navigate = useNavigate();
  useEffect(()=>{
    axios.get(`${APIURL}/admin/category-details`,{
      headers:{
        Authorization: `Bearer ${token}`,
        "x-api-key":ApiKey,
      }
    }).then((response)=>{setCategoryDetails(response.data.data);setCategoryDetailsFilter(response.data.data)}
  ).catch((err)=>console.log(err))
  },[])
  console.log(categoryDetails)
  useEffect(()=>{
    setCategoryDetailsFilter(categoryDetails.filter((element)=>element.categoryDetails.toLowerCase().includes(search.toLowerCase().trim())));
  },[search]);

  const handleCategoryDetails = (id) => {
    deleteItem(id, "admin/category-details/delete", token, () => {
      window.location.reload();
    });
  }

  const itemsPerPage = 6;
  
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = categoryDetailsFilter.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(categoryDetailsFilter.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
    <Helmet>
      <title>Category Details|Nalouti Dashboard</title>
    </Helmet>
    <div className="w-100 p-2">
    <div className="d-flex justify-content-between align-items-center">
      <span className="fw-bold h5">Category Details  Management</span>
      <div className="d-flex align-items-center">
        <Form.Control onChange={(e)=>setSearch(e.target.value)} value={search} className="me-3"  placeholder="Search subcategory"/>
        <Button className="w-75" onClick={()=>navigate("add")}>Add New Item</Button>
      </div>
    </div>
    <hr/>
      <div className="table-responsive">
        <Table hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Category Name</th>
              <th>Subcategory Name</th>
              <th>Category Details  Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentItems && currentItems.length > 0 ? currentItems.map((item,index) => (
              <tr key={index}>
                <td>{index+1}</td>
                <td><img width="50" height="50" src={`${IMAGEURL}/categories/${item.category_details_image}`}/></td>
                <td>{item.category.category}</td>
                <td>{item.subcategory.subcategories}</td>
                <td>{item.categoryDetails}</td>
                  <td>
                    <Button onClick={()=>navigate(`${item.id}`)} variant="outline-primary" size="sm" className="me-2">
                      <FaEdit />
                    </Button>
                    <Button onClick={()=>handleCategoryDetails(item.id)} variant="outline-danger" size="sm">
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
          Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, categoryDetailsFilter.length)} of {categoryDetailsFilter.length} items
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

export default CategoryDetails;
