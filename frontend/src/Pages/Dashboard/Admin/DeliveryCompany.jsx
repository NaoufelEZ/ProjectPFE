import React, { useEffect, useState } from 'react';
import { Table, Badge, Button, Pagination } from 'react-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { ApiKey,APIURL } from '../../../Api/Api';
import Cookies from 'universal-cookie';
import axios from 'axios';
import useUser from '../../../Hooks/useUser';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import useDeleteItem from '../../../Hooks/useDeleteItem';
import { TbTruckDelivery } from "react-icons/tb";

const DeliveryCompany = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [users, setUsers] = useState([]);
  const [filterUsers,setFilterUsers] = useState([]);
  const deleteItem = useDeleteItem();


  const user = useUser();

const cookie = new Cookies();
const token = cookie.get("auth");
const navigate = useNavigate();
  useEffect(() => {
    axios.get(`${APIURL}/delivery-company`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "x-api-key": ApiKey
      }
    }).then((response) => {
      setUsers(response.data.data);
      setFilterUsers(response.data.data)
    }).catch((error) => {
      console.log(error)
    }
    )
  }, []);
  const handleCompanyDelete = (id) => {
    Swal.fire({
          title: `Are Sure Delete ?`,
          text: "This action cannot be undone!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#dc3545",
          cancelButtonColor: "#6c757d",
          confirmButtonText: "Yes, delete it!",
          cancelButtonText: "Cancel",
          reverseButtons: true,
          backdrop: `
            rgba(220,53,69,0.1)
            url("/images/nyan-cat.gif")
            left top
            no-repeat
          `
        }).then((result) => {
          if (result.isConfirmed) {
            deleteItem(id, "delivery-company/delete", token, () => {
              window.location.reload();
            });
          }
        });
  }

  const itemsPerPage = 6;
  const getStatus = (status) => {
    switch (status) {
      case 1:
        return <Badge bg="success">Active</Badge>;
      case 0:
        return <Badge bg="danger">Not Active</Badge>;
    }
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filterUsers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filterUsers.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
    <Helmet>
      <title>Delivery Company|Nalouti Dashboard</title>
    </Helmet>
    <div className="w-100 p-2">
    <div className="d-flex justify-content-between align-items-center">
      <span className="fw-bold h3"><TbTruckDelivery /> Delivery Company Management</span>
      <Button onClick={()=>navigate("/dashboard/delivery-company/add")}>Add New Company</Button>
    </div>
    <hr/>
      <div className="table-responsive">
        <Table hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Company Name</th>
              <th>Email</th>
              <th>Address</th>
              <th>Phone</th>
              <th>Fee</th>
              <th>Duration</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentItems && currentItems.length > 0 ? currentItems.map((item,index) => (
              <tr key={index}>
                <td>{index+1}</td>
                <td>{item.name}</td>
                <td>{item.mail}</td>
                <td>{item.address}</td>
                <td>{item.phone}</td>
                <td>{item.fee}</td>
                <td>{item.duration}</td>
                <td>
                    <Button onClick={()=>navigate(`${item.id}`)} variant="outline-primary" size="sm" className="me-2">
                      <FaEdit />
                    </Button>
                    <Button onClick={()=>handleCompanyDelete(item.id)} variant="outline-danger" size="sm">
                      <FaTrash />
                    </Button>
                  </td>
              </tr>
             
            ))
            :
              <tr>
                <td className="text-center" colSpan={8}>Delivery Company Not Found</td>
              </tr>
            }
            
          </tbody>
        </Table>
      </div>

      <div className="d-flex justify-content-between align-items-center mt-3">
        <div>
          Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filterUsers.length)} of {filterUsers.length} items
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


export default DeliveryCompany;
