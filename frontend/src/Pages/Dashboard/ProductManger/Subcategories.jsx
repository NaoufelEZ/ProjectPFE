import { useState, useEffect } from 'react';
import { Table, Button, Form, Pagination, Card, Container, Spinner } from 'react-bootstrap';
import { FaEdit, FaTrash, FaSearch, FaPlus } from 'react-icons/fa';
import { ApiKey, APIURL, IMAGEURL } from '../../../Api/Api';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { Helmet } from "react-helmet-async";
import { useNavigate } from 'react-router-dom';
import useDeleteItem from '../../../Hooks/useDeleteItem';

const Subcategories = () => {
  const cookie = new Cookies();
  const token = cookie.get("auth");

  const [currentPage, setCurrentPage] = useState(1);
  const [subcategory, setSubcategory] = useState([]);
  const [search, setSearch] = useState("");
  const [subcategoryFilter, setSubcategoryFilter] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const deleteItem = useDeleteItem();
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    axios.get(`${APIURL}/admin/subcategory`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "x-api-key": ApiKey,
      }
    }).then((response) => {
      setSubcategory(response.data.data);
      setSubcategoryFilter(response.data.data);
      setIsLoading(false);
    }).catch(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    setSubcategoryFilter(subcategory.filter((element) =>
      element.subcategories.toLowerCase().includes(search.toLowerCase().trim())
    ));
  }, [search]);

  const handleSubcategoryDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this subcategory?")) {
      deleteItem(id, "admin/subcategory/delete", token, () => {
        window.location.reload();
      });
    }
  };

  const itemsPerPage = 6;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = subcategoryFilter.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(subcategoryFilter.length / itemsPerPage);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <Helmet>
        <title>Subcategory | Nalouti Dashboard</title>
      </Helmet>

      <Container fluid className="py-4">
        <Card className="shadow-sm">
          <Card.Header className="bg-white border-bottom-0 py-3">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h3 className="mb-0 fw-bold">Subcategory Management</h3>
                <small className="text-muted">Manage all subcategories in your system</small>
              </div>
              <Button
                variant="primary"
                onClick={() => navigate("add")}
                className="d-flex align-items-center"
              >
                <FaPlus className="me-2" /> Add New
              </Button>
            </div>
          </Card.Header>

          <Card.Body>
            <div className="mb-4">
              <div className="position-relative" style={{ maxWidth: '400px' }}>
                <div className="input-group">
                  <span className="input-group-text bg-white border-end-0">
                    <FaSearch className="text-muted" />
                  </span>
                  <Form.Control
                    onChange={(e) => setSearch(e.target.value)}
                    value={search}
                    placeholder="Search subcategories..."
                    className="border-start-0 ps-2"
                  />
                </div>
              </div>
            </div>

            {isLoading ? (
              <div className="text-center py-5">
                <Spinner animation="border" variant="primary" />
                <p className="mt-2">Loading subcategories...</p>
              </div>
            ) : (
              <>
                <div className="table-responsive">
                  <Table hover className="mb-0">
                    <thead className="table-light">
                      <tr>
                        <th>#</th>
                        <th>Image</th>
                        <th>Category</th>
                        <th>Subcategory</th>
                        <th className="text-end">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentItems.length > 0 ? currentItems.map((item, index) => (
                        <tr key={index}>
                          <td>{indexOfFirstItem + index + 1}</td>
                          <td>
                            <img
                              width="50"
                              height="50"
                              src={`${IMAGEURL}/categories/${item.subcategories_image}`}
                              className="rounded-circle border"
                              alt={item.subcategories}
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "https://via.placeholder.com/50";
                              }}
                            />
                          </td>
                          <td>{item.category.category}</td>
                          <td className="fw-semibold">{item.subcategories}</td>
                          <td className="text-end">
                            <Button
                              onClick={() => navigate(`${item.id}`)}
                              variant="light"
                              size="sm"
                              className="me-2"
                              title="Edit"
                              style={{
                                borderRadius: '4px',
                                padding: '5px 10px',
                                border: '1px solid #dee2e6'
                              }}
                            >
                              <FaEdit className="text-primary me-1" />
                              Edit
                            </Button>
                            <Button
                              onClick={() => handleSubcategoryDelete(item.id)}
                              variant="light"
                              size="sm"
                              title="Delete"
                              style={{
                                borderRadius: '4px',
                                padding: '5px 10px',
                                border: '1px solid #dee2e6'
                              }}
                            >
                              <FaTrash className="text-danger me-1" />
                              Delete
                            </Button>
                          </td>
                        </tr>
                      )) : (
                        <tr>
                          <td colSpan="5" className="text-center py-4">
                            <div className="d-flex flex-column align-items-center">
                              <img
                                src="https://cdn-icons-png.flaticon.com/512/4076/4076478.png"
                                width="100"
                                alt="No data found"
                              />
                              <h5 className="mt-3 text-muted">No subcategories found</h5>
                              <p className="text-muted">Try adjusting your search or add a new one</p>
                              <Button
                                variant="primary"
                                size="sm"
                                onClick={() => navigate("add")}
                              >
                                Add New Subcategory
                              </Button>
                            </div>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </Table>
                </div>

                <div className="d-flex justify-content-between align-items-center mt-4">
                  <div className="text-muted">
                    Showing <span className="fw-bold">{indexOfFirstItem + 1}</span> to <span className="fw-bold">
                      {Math.min(indexOfLastItem, subcategoryFilter.length)}
                    </span> of <span className="fw-bold">{subcategoryFilter.length}</span> entries
                  </div>

                  <Pagination className="mb-0">
                    <Pagination.First onClick={() => paginate(1)} disabled={currentPage === 1} />
                    <Pagination.Prev onClick={() => paginate(Math.max(1, currentPage - 1))} disabled={currentPage === 1} />

                    {[...Array(totalPages).keys()].map(number => (
                      <Pagination.Item
                        key={number + 1}
                        active={number + 1 === currentPage}
                        onClick={() => paginate(number + 1)}
                      >
                        {number + 1}
                      </Pagination.Item>
                    ))}

                    <Pagination.Next onClick={() => paginate(Math.min(totalPages, currentPage + 1))} disabled={currentPage === totalPages} />
                    <Pagination.Last onClick={() => paginate(totalPages)} disabled={currentPage === totalPages} />
                  </Pagination>
                </div>
              </>
            )}
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default Subcategories;
