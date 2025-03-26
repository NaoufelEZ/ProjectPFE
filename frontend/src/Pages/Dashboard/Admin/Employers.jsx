import React, { useEffect, useState } from 'react';
import { Table, Badge, Button, Pagination } from 'react-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { ApiKey,APIURL } from '../../../Api/Api';
import Cookies from 'universal-cookie';
import axios from 'axios';

const Users = ({ role }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [users, setUsers] = useState([]);
  const [filterUsers,setFilterUsers] = useState([]);

const cookie = new Cookies();
const token = cookie.get("auth");

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

  const inventoryData = [
    { id: 1, sku: 'CLT-TS-BLK-S', name: 'Black T-Shirt Small', category: 'T-Shirts', stock: 45, price: 19.99, status: 'In Stock' },
    { id: 2, sku: 'CLT-TS-BLK-M', name: 'Black T-Shirt Medium', category: 'T-Shirts', stock: 32, price: 19.99, status: 'In Stock' },
    { id: 3, sku: 'CLT-TS-BLK-L', name: 'Black T-Shirt Large', category: 'T-Shirts', stock: 18, price: 19.99, status: 'In Stock' },
    { id: 4, sku: 'CLT-TS-WHT-S', name: 'White T-Shirt Small', category: 'T-Shirts', stock: 27, price: 19.99, status: 'In Stock' },
  ]
  console.log(filterUsers)
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
    <div className="w-100 p-2">
    <div className="d-flex justify-content-between align-items-center">
      <span className="fw-bold h5">User Management</span>
      <Button>Add New User</Button>
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
            {filterUsers.map((item,index) => (
              <tr key={index}>
                <td>{index+1}</td>
                <td>{item.first_name +" "+ item.last_name}</td>
                <td>{item.email}</td>
                <td>{item.role}</td>
                <td>{getStatus(item.email_verify)}</td>
                <td>
                  <Button variant="outline-primary" size="sm" className="me-1 d-flex p-2" title="Edit User">
                    <FaEdit size={13} className="mb-0" />
                  </Button>
                  {filterUsers.id !== users.id ?
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
  );
};


export default Users;
