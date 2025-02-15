import { useEffect, useState } from "react"
import { ApiKey, APIURL } from "../../Api/Api"
import axios from "axios";
import Cookies from "universal-cookie";
import { Button, Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import "./user.css";

const Users = () => {
  const [users, setUsers] = useState([]);
  const cookie = new Cookies();
  const token = cookie.get("auth");
  useEffect(() => {
    axios.get(`${APIURL}/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "x-api-key": ApiKey
      }
    }).then((response) => {
      setUsers(response.data.data)
    }).catch((error) => {
      console.log(error)
    }
    )
  }, []);

  return (
    <div>
     <h1>Users</h1>
     <Table className="w-55" striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Phone</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{user.first_name}</td>
            <td>{user.last_name}</td>
            <td>{user.email}</td>
            <td>{user.role}</td>
            <td>{user.phone}</td>
            <td className="d-flex justify-content-between">
              <Button className="d-flex justify-content-center align-items-center p-2" type="button"><FontAwesomeIcon icon={faPenToSquare} className="text-success h6 m-0"/></Button>
              <Button className="d-flex justify-content-center align-items-center p-2" type="button"><FontAwesomeIcon icon={faTrash} className="text-danger h6 m-0"/></Button>
            </td>
          </tr>
        ))}
      </tbody>
      </Table>

    </div>
  )
}

export default Users