import { Link } from "react-router-dom"
import './product.css';

const Product = ({product}) => {
  return (
    <Link>
        <div className="box">
                <div className="img-container overflow-hidden">
                  <img
                    width={200}
                    src={`${IMAGEURL}/products/${e.product_stock[0].product_picture}`}
                    alt="product"
                  />
                </div>
                <div className="d-flex flex-column">
                  <span>{e.title}</span>
                  <span className="fw-bold text-dark">{e.price} TND</span>
                </div>
              </div>
    </Link>
  )
}

export default Product