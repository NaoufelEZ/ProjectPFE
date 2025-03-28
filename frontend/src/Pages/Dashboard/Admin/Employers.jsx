import React, { useEffect, useState } from 'react';
import { Table, Badge, Button, Pagination } from 'react-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { ApiKey,APIURL } from '../../../Api/Api';
import Cookies from 'universal-cookie';
import axios from 'axios';
import useUser from '../../../Hooks/useUser';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';

const Users = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [users, setUsers] = useState([]);
  const [filterUsers,setFilterUsers] = useState([]);

  const user = useUser();

const cookie = new Cookies();
const token = cookie.get("auth");
const navigate = useNavigate();
  useEffect(() => {
    axios.get(`${APIURL}/users`, {
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
      <title>Users|Nalouti Dashboard</title>
    </Helmet>
    <div className="w-100 p-2">
    <div className="d-flex justify-content-between align-items-center">
      <span className="fw-bold h5">User Management</span>
      <Button onClick={()=>navigate("/dashboard/users/add")}>Add New User</Button>
    </div>
    <hr/>
      <div className="table-responsive">
        <Table hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item,index) => (
              <tr key={index}>
                <td>{index+1}</td>
                <td>{item.first_name +" "+ item.last_name}</td>
                <td>{item.email}</td>
                <td>{item.role}</td>
                <td>{getStatus(item.email_verify)}</td>
                <td>
                <div className={`d-flex ${user && item.id === user.id && "w-50 justify-content-center"}`}>
                  <Button variant="outline-primary" size="sm" className="me-1 d-flex p-2 " title="Edit User">
                    <FaEdit size={13} className="mb-0" />
                  </Button>
                  { user && item.id !== user.id ?
                  <Button
                    variant="outline-danger"
                    size="sm"
                    title="Delete User"
                  >
                    <FaTrash />
                  </Button>
                  :
                  null
                  }
                  </div>
                </td>
              </tr>
            ))}
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


export default Users;
