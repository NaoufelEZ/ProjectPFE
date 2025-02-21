import { Link } from "react-router-dom"

const LeftBar = () => {
  return (
    <div style={{height:"calc(100vh - 60px)",width:"150px"}} className="bg-primary me-4">
      <ul className="p-2">
        <li role="button"><Link className="text-black" to="/dashboard/users">Users</Link></li>
        <li role="button"><Link className="text-black" to="/dashboard/user/add">Add User</Link></li>
        <li role="button"><Link className="text-black" to="/dashboard/products">Product</Link></li>
        <li role="button"><Link className="text-black" to="/dashboard/product/add">Add Product</Link></li>
      </ul>
    </div>
  )
}
export default LeftBar