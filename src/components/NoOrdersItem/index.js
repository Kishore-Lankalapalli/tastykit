import {Link} from 'react-router-dom'
import './index.css'

const NoOrdersItem = () => (
  <div className="no-orders-container">
    <img
      src="https://res.cloudinary.com/di8upujpz/image/upload/v1671360601/OBJECTS_tqzmsi.png"
      className="no-orders-image"
    />
    <h1 className="no-orders-heading">No Orders Yet!</h1>
    <p className="no-orders-description">
      Your cart is empty. Add something from the menu{' '}
    </p>
    <Link to="/">
      <button className="order-now-button">Order Now</button>
    </Link>
  </div>
)

export default NoOrdersItem
