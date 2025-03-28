import { Accordion, Nav } from 'react-bootstrap'
import './leftBar.css'

const LeftBarProduct = () => {
  return (
    <div className="sidebar">
       <h5 className="mb-3 text-white text-center">Dashboard</h5>
      <Nav defaultActiveKey="/overview" className="flex-column">
        <Nav.Link href="#overview" className="text-white mb-3">Overview</Nav.Link>
        <Accordion className="custom-accordion mb-3">
          <Accordion.Item eventKey="0">
            <Accordion.Header>Products</Accordion.Header>
            <Accordion.Body>
              <Nav.Link href="#clients" className="text-white">Quantity</Nav.Link>
              <Nav.Link href="#employers" className="text-white">Price</Nav.Link>
              <Nav.Link href="#employers" className="text-white">Add</Nav.Link>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>

        <Accordion className="custom-accordion mb-3">
          <Accordion.Item eventKey="0">
            <Accordion.Header>Category</Accordion.Header>
            <Accordion.Body>
              <Nav.Link href="#clients" className="text-white">Categories</Nav.Link>
              <Nav.Link href="#employers" className="text-white">Add</Nav.Link>
              <Nav.Link href="#employers" className="text-white">Add</Nav.Link>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>

        <Accordion className="custom-accordion mb-3">
          <Accordion.Item eventKey="0">
            <Accordion.Header>Orders</Accordion.Header>
            <Accordion.Body>
              <Nav.Link href="#clients" className="text-white">List</Nav.Link>
              <Nav.Link href="#employers" className="text-white">Accept</Nav.Link>
              <Nav.Link href="#employers" className="text-white">Denise</Nav.Link>
              <Nav.Link href="#employers" className="text-white">return</Nav.Link>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Nav>
      </div>
  )
}

export default LeftBarProduct