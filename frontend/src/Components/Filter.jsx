import { faClose } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { Accordion, Button, Form } from 'react-bootstrap';
import './filter.css'

const Filter = ({isOpen,setIsOpen}) => {
  console.log(isOpen)
  const sortBy = ["New In","Price Low To High","Price High To Low"];
  const [sortBySelected,setSortBySelected] = useState("");
  const [price,setPrice] = useState(0);
  return (
    <section  className={`filter d-flex w-100 justify-content-end ${isOpen && "show"}`}>
      <div className="w-25 bg-white shadow-sm p-2">
        <div className="d-flex justify-content-center align-items-center w-100 position-relative">
          <span className="h6 text-center mb-0">Filter</span>
          <FontAwesomeIcon onClick={()=>setIsOpen(false)} role="button" className="h6 mb-0 me-2 position-absolute end-0" icon={faClose} />
        </div>
          <hr/>
          <div>
            <span className="fw-bold h6">Sort By</span>
            <div style={{fontSize:"12px"}} className="mt-2 d-flex justify-content-between gap-2">
              {
                sortBy.map((e,index)=>(
                  <div key={index} onClick={()=>setSortBySelected(prev => prev === e ? "" : e)} role='button' className={`border p-2 rounded-pill ${e === sortBySelected && "bg-dark text-white"}`}>{e}</div>
                ))
              }
            </div>
            <hr/>
            <Accordion>
              <Accordion.Button className="shadow-none bg-white py-1">
                <span className="fw-bold">Color</span>
              </Accordion.Button>
            </Accordion>
            <hr/>
            <Accordion>
              <Accordion.Button className="shadow-none bg-white py-1">
                <span className="fw-bold">Size</span>
              </Accordion.Button>
            </Accordion>
            <hr/>
            <Accordion>
              <Accordion.Button className="shadow-none bg-white py-1">
                <span className="fw-bold">Price</span>
              </Accordion.Button>
              <Accordion.Body>
                <span className="d-flex justify-content-end">{price}TND-200TND</span>
                <Form.Range onChange={(e)=>setPrice(e.target.value)} value={price} min={0} max={200}/>
              </Accordion.Body>
            </Accordion>
          </div>
          <div className="p-2 position-absolute bottom-0 bg-light">
          <Button className="w-100">Filter</Button>
        </div>
      </div>
      
    </section>
  )
}

export default Filter