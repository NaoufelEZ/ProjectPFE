import { useEffect, useState } from "react"
import { ApiKey, APIURL, IMAGEURL } from "../../../Api/Api"
import axios from "axios";
import Cookies from "universal-cookie";
import { Button, Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faPlus, faSearch, faTrash } from "@fortawesome/free-solid-svg-icons";
import "./user.css";
import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import { Helmet } from "react-helmet-async";


const Users = () => {
  const [users, setUsers] = useState([]);
  const [currentUser,setCurrentUserUser] = useState([]);
  const [filterUsers,setFilterUsers] = useState([]);
  const [search,setSearch] = useState("");
  const cookie = new Cookies();
  const token = cookie.get("auth");
  const nav = useNavigate();
  useEffect(() => {
    axios.get(`${APIURL}/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "x-api-key": ApiKey
      }
    }).then((response) => {
      setCurrentUserUser(response.data.data)
    }).catch((error) => {
      console.log(error)
    }
    )
  }, []);
  useEffect(() => {
    axios.get(`${APIURL}/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "x-api-key": ApiKey
      }
    }).then((response) => {
      setUsers(response.data.data.filter((e)=>e.role === "Client"));
      setFilterUsers(response.data.data.filter((e)=>e.role === "Client"))
    }).catch((error) => {
      console.log(error)
    }
    )
  }, []);
  const handleDelete = async (id)=>{
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your user has been deleted.",
          icon: "success"
        });
            axios.delete(`${APIURL}/admin/delete/${id}`,{
              headers:{
                Authorization:`Bearer ${token}`,
                Accept:"application/json",
                "x-api-key":ApiKey
              }
            });
            window.location.reload();
            nav("/dashboard/users")
            
      }
    });
  }
  useEffect(()=>{
    setFilterUsers(users.filter((e)=>(e.first_name + " " + e.last_name).toLowerCase().includes(search.toLocaleLowerCase())));
  },[search])
  return (
    <>
    <Helmet>
      <title>Client|Nalouti Store</title>
    </Helmet>
    <div className="p-3">
    <div className="d-flex justify-content-between align-items-center mb-3">
     <span>Users</span>
     <div className="d-flex align-items-center gap-1 ms-auto">
      <span className="m-0 w-25">{filterUsers.length} Members</span>
      <div className="w-50 rounded-3 bg-secondary">
        <FontAwesomeIcon className="h6 m-2 text-center align-middle" icon={faSearch} />
      <input onChange={(e)=>setSearch(e.target.value)} value={search} placeholder="search" className=" w-75 bg-secondary border-0 outline-none p-1" type="text"/>
      </div>
      <Link to="/dashboard/admin/users/add-user" role="button" className="p-2 w-25 bg-primary rounded-3 d-flex justify-content-around align-items-center text-white">
        <FontAwesomeIcon icon={faPlus}/>
        <span>Add user</span>
      </Link>
     </div>
    </div>
     <Table className="w-100" striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {filterUsers.length > 0 ? filterUsers.map((user, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{user.first_name}</td>
            <td>{user.last_name}</td>
            <td>{user.email}</td>
            <td>{user.phone}</td>
            <td className="d-flex justify-content-between">
              <Button className="d-flex justify-content-center align-items-center p-2" type="button"><FontAwesomeIcon icon={faPenToSquare} className="text-success h6 m-0"/></Button>
              <Button onClick={()=>handleDelete(user.id)} className="d-flex justify-content-center align-items-center p-2" type="button"><FontAwesomeIcon icon={faTrash} className="text-danger h6 m-0"/></Button>
            </td>
          </tr>
        ))
        :
        <tr><td className="text-center" colSpan={8}>User Not Found</td></tr>
        }
      </tbody>
      </Table>
    </div>
    </>
  )
}

export default Users