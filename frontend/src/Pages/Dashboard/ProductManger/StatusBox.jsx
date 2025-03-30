import { Badge, Table } from "react-bootstrap";
import { IoClose } from "react-icons/io5";

const StatusBox = ({isStatusOpen,setIsStatusOpen,data}) => {
    const getStatusBadge = (status) => {
        if (status >= 20)
            return <Badge bg="success">In Stock</Badge>;
          else if (status > 10 && status < 20)
            return <Badge bg="secondary">Low Stock</Badge>;
          else if (status <= 10 && status > 0)
            return <Badge bg="warning">Critical Stock</Badge>;
          else if (status === 0)
            return <Badge bg="danger">Out of Stock</Badge>;
        
      };
  return (
    <div style={{zIndex:"4"}} className={`p-3 shadow-sm bg-light w-75 h-75 overflow-y-scroll position-absolute ${!isStatusOpen && "d-none"}`}>
       <div className="w-100 d-flex justify-content-end mb-3">
       <IoClose role='button' onClick={()=>setIsStatusOpen(false)} size={25} />
       </div>
       <div className="table-responsive">
        <Table hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Color</th>
              <th>Size</th>
              <th>Stock</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {data && data.length > 0 ? data.map((item,index) => (
              <tr key={index}>
                <td>{index+1}</td>
                <td>{item.color}</td>
                <td>{item.size}</td>
                <td>{item.quantity}</td>
                <td>{getStatusBadge(item.quantity)}</td>
              </tr>
            ))
            :
            <tr>
              <td className="text-center" colspan="5">Are Empty</td>
            </tr>
            }
          </tbody>
        </Table>
       </div>
    </div>
  )
}

export default StatusBox;