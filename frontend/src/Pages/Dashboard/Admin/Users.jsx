import React, { useEffect, useState } from 'react';
import { Table, Badge, Button, Pagination, Form, InputGroup, Card, Dropdown, Spinner, Modal } from 'react-bootstrap';
import { FaTrash, FaSearch, FaUserPlus, FaUserCog, FaFilter, FaEllipsisV, FaEye, FaEdit, FaSync } from 'react-icons/fa';
import { BsThreeDotsVertical, BsCheckCircleFill, BsXCircleFill } from 'react-icons/bs';
import { ApiKey, APIURL } from '../../../Api/Api';
import Cookies from 'universal-cookie';
import axios from 'axios';
import useUser from '../../../Hooks/useUser';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import useDeleteItem from '../../../Hooks/useDeleteItem';
import Swal from 'sweetalert2';
import { motion } from 'framer-motion';
import { use } from 'react';

const Users = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [filterUsers, setFilterUsers] = useState([]);
  const [filterRole, setFilterRole] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [isLoading, setIsLoading] = useState(true);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });

  const user = useUser();
  const roles = ["Admin", "Client", "Product Manager"];
  const statusOptions = ["All", "Active", "Inactive"];

  const deleteItem = useDeleteItem();
  const cookie = new Cookies();
  const token = cookie.get("auth");
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    setIsLoading(true);
    axios.get(`${APIURL}/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "x-api-key": ApiKey
      }
    }).then((response) => {
      setUsers(response.data.data);
      setFilterUsers(response.data.data);
      setIsLoading(false);
    }).catch((error) => {
      console.log(error);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    let filtered = users.filter((e) => 
      (e.first_name + " " + e.last_name).toLowerCase().includes(search.toLowerCase())
    );
    
    if (filterRole !== "All") {
      filtered = filtered.filter(user => user.role === filterRole);
    }
    
    if (filterStatus !== "All") {
      const statusFilter = filterStatus === "Active" ? 1 : 0;
      filtered = filtered.filter(user => user.email_verify === statusFilter);
    }
    
    // Apply sorting
    filtered.sort((a, b) => {
      if (sortConfig.key === 'name') {
        const nameA = `${a.first_name} ${a.last_name}`.toLowerCase();
        const nameB = `${b.first_name} ${b.last_name}`.toLowerCase();
        return sortConfig.direction === 'asc' 
          ? nameA.localeCompare(nameB) 
          : nameB.localeCompare(nameA);
      } else if (sortConfig.key === 'role') {
        return sortConfig.direction === 'asc' 
          ? a.role.localeCompare(b.role) 
          : b.role.localeCompare(a.role);
      }
      return 0;
    });
    
    setFilterUsers(filtered);
  }, [search, filterRole, filterStatus, users, sortConfig]);

  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const itemsPerPage = 8;
  
  const getStatus = (status) => {
    switch (status) {
      case 1:
        return <Badge bg="success" className="d-flex align-items-center py-2 px-3 rounded-pill">
          <BsCheckCircleFill className="me-1" /> Active
        </Badge>;
      case 0:
        return <Badge bg="danger" className="d-flex align-items-center py-2 px-3 rounded-pill">
          <BsXCircleFill className="me-1" /> Inactive
        </Badge>;
      default:
        return <Badge bg="secondary" className="d-flex align-items-center py-2 px-3 rounded-pill">
          Unknown
        </Badge>;
    }
  };

  const handleUserDelete = (id, name) => {
    Swal.fire({
      title: `Delete ${name}?`,
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
        deleteItem(id, "admin/user/delete", token, () => {
          Swal.fire({
            title: "Deleted!",
            text: "The user has been deleted.",
            icon: "success",
            timer: 1500,
            showConfirmButton: false
          }).then(() => {
            fetchUsers();
          });
        });
      }
    });
  }

  const handleChangeRole = (id, role, name) => {
    Swal.fire({
      title: "Confirm Role Change",
      html: `Change <strong>${name}</strong>'s role to <strong>${role}</strong>?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#0d6efd",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Update Role",
      cancelButtonText: "Cancel",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        axios.put(`${APIURL}/admin/user/update/${id}`, {
          role: role
        }, {
          headers: {
            Authorization: `Bearer ${token}`,
            "x-api-key": ApiKey
          }
        }).then(() => {
          Swal.fire({
            title: "Updated!",
            text: "User role has been updated.",
            icon: "success",
            timer: 1500,
            showConfirmButton: false
          }).then(() => {
            fetchUsers();
          });
        }).catch(error => {
          Swal.fire("Error", "Failed to update user role.", "error");
        });
      }
    });
  }

  const handleViewProfile = (user) => {
    setSelectedUser(user);
    setShowProfileModal(true);
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filterUsers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filterUsers.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === 'asc' ? '↑' : '↓';
  };

  return (
    <>
      <Helmet>
        <title>Users | Nalouti Dashboard</title>
      </Helmet>
      
      <div className="container-fluid py-4">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="d-flex justify-content-between align-items-center mb-4"
        >
          <div>
            <h2 className="fw-bold mb-0">
              <FaUserCog className="me-2" /> User Management
            </h2>
            <p className="text-muted mb-0">Manage all system users and their permissions</p>
          </div>
          
          <Button 
            variant="primary" 
            onClick={() => navigate("/dashboard/users/add")}
            className="d-flex align-items-center"
          >
            <FaUserPlus className="me-2" /> Add New User
          </Button>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.3 }}
        >
          <Card className="shadow-sm border-0">
            <Card.Body className="p-4">
              <div className="row g-3 mb-4">
                <div className="col-md-4">
                  <InputGroup>
                    <InputGroup.Text className="bg-light border-end-0">
                      <FaSearch />
                    </InputGroup.Text>
                    <Form.Control
                      type="search"
                      placeholder="Search users by name..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="border-start-0"
                    />
                  </InputGroup>
                </div>
                
                <div className="col-md-3">
                  <Form.Select
                    value={filterRole}
                    onChange={(e) => setFilterRole(e.target.value)}
                  >
                    <option value="All">All Roles</option>
                    {roles.map(role => (
                      <option key={role} value={role}>{role}</option>
                    ))}
                  </Form.Select>
                </div>

                <div className="col-md-3">
                  <Form.Select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                  >
                    {statusOptions.map(status => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </Form.Select>
                </div>

                <div className="col-md-2 d-flex justify-content-end">
                  <Button 
                    variant="outline-secondary" 
                    onClick={fetchUsers}
                    className="d-flex align-items-center"
                  >
                    <FaSync className="me-2" /> Refresh
                  </Button>
                </div>
              </div>
              
              {isLoading ? (
                <div className="text-center py-5">
                  <Spinner animation="border" variant="primary" />
                  <p className="mt-3">Loading users...</p>
                </div>
              ) : (
                <>
                  <div className="table-responsive">
                    <Table hover className="mb-0 align-middle">
                      <thead className="table-light">
                        <tr>
                          <th className="ps-4">#</th>
                          <th 
                            onClick={() => requestSort('name')}
                            style={{ cursor: 'pointer' }}
                          >
                            Name {getSortIcon('name')}
                          </th>
                          <th>Email</th>
                          <th>Phone</th>
                          <th 
                            onClick={() => requestSort('role')}
                            style={{ cursor: 'pointer' }}
                          >
                            Role {getSortIcon('role')}
                          </th>
                          <th>Status</th>
                          <th className="text-end pe-4">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentItems.length > 0 ? (
                          currentItems.map((item, index) => (
                            <motion.tr 
                              key={index} 
                              className="align-middle"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ duration: 0.2 }}
                              whileHover={{ scale: 1.005 }}
                            >
                              <td className="ps-4">{indexOfFirstItem + index + 1}</td>
                              <td>
                                <div 
                                  className="d-flex align-items-center"
                                  style={{ cursor: 'pointer' }}
                                  onClick={() => handleViewProfile(item)}
                                >
                                 
                                  <div>
                                    <h6 className="mb-0">{item.first_name} {item.last_name}</h6>
                                    <small className="text-muted">ID: {item.id}</small>
                                  </div>
                                </div>
                              </td>
                              <td>{item.email}</td>
                              <td>{item.phone || '-'}</td>
                              <td>
                                <Form.Select 
                                  disabled={item.id === user?.id} 
                                  value={item.role} 
                                  onChange={(e) => handleChangeRole(item.id, e.target.value, item.first_name)}
                                  className="form-select-sm"
                                >
                                  {roles.map(role => (
                                    <option key={role} value={role}>{role}</option>
                                  ))}
                                </Form.Select>
                              </td>
                              <td>{getStatus(item.email_verify)}</td>
                              <td className="text-end pe-4">
                                {
                                  user && user.id !== item.id &&
                                  <FaTrash className="me-2 text-danger"   onClick={() => handleUserDelete(item.id, `${item.first_name} ${item.last_name}`)}/> 
                              }
                              </td>
                            </motion.tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="7" className="text-center py-5">
                              <div className="text-muted">
                                <img 
                                  src="/images/no-data.svg" 
                                  alt="No users found" 
                                  style={{ width: '120px', opacity: 0.7 }}
                                  className="mb-3"
                                />
                                <h5>No users found</h5>
                                <p className="mb-0">Try adjusting your search or filters</p>
                              </div>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </Table>
                  </div>
                  
                  {filterUsers.length > 0 && (
                    <div className="d-flex justify-content-between align-items-center mt-4">
                      <div className="text-muted">
                        Showing <span className="fw-semibold">{indexOfFirstItem + 1}</span> to <span className="fw-semibold">{Math.min(indexOfLastItem, filterUsers.length)}</span> of <span className="fw-semibold">{filterUsers.length}</span> users
                      </div>
                      
                      <Pagination className="mb-0">
                        <Pagination.First
                          onClick={() => paginate(1)}
                          disabled={currentPage === 1}
                        />
                        <Pagination.Prev
                          onClick={() => paginate(Math.max(1, currentPage - 1))}
                          disabled={currentPage === 1}
                        />

                        {[...Array(Math.min(5, totalPages)).keys()].map(number => {
                          // Show first, last, and pages around current
                          let pageNumber;
                          if (totalPages <= 5) {
                            pageNumber = number + 1;
                          } else if (currentPage <= 3) {
                            pageNumber = number + 1;
                          } else if (currentPage >= totalPages - 2) {
                            pageNumber = totalPages - 4 + number;
                          } else {
                            pageNumber = currentPage - 2 + number;
                          }
                          
                          return (
                            <Pagination.Item
                              key={pageNumber}
                              active={pageNumber === currentPage}
                              onClick={() => paginate(pageNumber)}
                            >
                              {pageNumber}
                            </Pagination.Item>
                          );
                        })}

                        {totalPages > 5 && currentPage < totalPages - 2 && (
                          <Pagination.Ellipsis />
                        )}

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
                  )}
                </>
              )}
            </Card.Body>
          </Card>
        </motion.div>
      </div>

      {/* User Profile Modal */}
      <Modal 
        show={showProfileModal} 
        onHide={() => setShowProfileModal(false)}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>User Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedUser && (
            <div className="row">
              <div className="col-md-4 text-center">
                <div className="avatar-xxl bg-primary bg-opacity-10 text-primary rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3">
                  {selectedUser.first_name.charAt(0)}{selectedUser.last_name.charAt(0)}
                </div>
                <h4>{selectedUser.first_name} {selectedUser.last_name}</h4>
                <div className="mb-3">{getStatus(selectedUser.email_verify)}</div>
                <Button 
                  variant="outline-primary"
                  onClick={() => {
                    setShowProfileModal(false);
                    navigate(`/dashboard/users/edit/${selectedUser.id}`);
                  }}
                >
                  Edit Profile
                </Button>
              </div>
              <div className="col-md-8">
                <div className="mb-3">
                  <h6 className="text-muted">Email</h6>
                  <p>{selectedUser.email}</p>
                </div>
                <div className="mb-3">
                  <h6 className="text-muted">Phone</h6>
                  <p>{selectedUser.phone || '-'}</p>
                </div>
                <div className="mb-3">
                  <h6 className="text-muted">Role</h6>
                  <p>{selectedUser.role}</p>
                </div>
                <div className="mb-3">
                  <h6 className="text-muted">User ID</h6>
                  <p>{selectedUser.id}</p>
                </div>
                <div className="mb-3">
                  <h6 className="text-muted">Account Created</h6>
                  <p>{new Date(selectedUser.created_at).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Users;