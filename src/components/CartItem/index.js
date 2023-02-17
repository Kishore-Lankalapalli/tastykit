import './index.css'

const CartItem = props => {
  const {item, onDecrementQuantity, onIncrementQuantity} = props

  const {imageUrl, id, name, quantity, cost} = item
  const totalCost = cost * quantity

  const onDecreaseFoodQuantity = () => {
    onDecrementQuantity(id)
  }

  const onIncreaseFoodQuantity = () => {
    onIncrementQuantity(id)
  }

  return (
    <li className="cart-item-container">
      <div className="cart-item-name-image-container">
        <img src={imageUrl} className="cart-item-image" />
        <h1 className="item-name-lg-text">{name}</h1>
      </div>

      <div className="cart-item-details-container">
        <h1 className="item-name">{name}</h1>
        <div className="cart-counter-container">
          <button
            onClick={onDecreaseFoodQuantity}
            type="button"
            className="cart-counter-button"
          >
            -
          </button>
          <p className="quantity-text">{quantity}</p>

          <button
            onClick={onIncreaseFoodQuantity}
            type="button"
            className="cart-counter-button"
          >
            +
          </button>
        </div>
        <p className="total-item-cost">₹ {totalCost}</p>
      </div>
    </li>
  )
}

export default CartItem
