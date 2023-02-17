import './index.css'

const Counter = props => {
  const {onIncrementQuantity, onDecrementQuantity, id, quantity} = props

  const increaseQuantity = () => {
    onIncrementQuantity(id)
  }

  const decreaseQuantity = () => {
    onDecrementQuantity(id)
  }

  return (
    <div className="counter-container">
      <button
        onClick={decreaseQuantity}
        className="subsract_button"
        type="button"
      >
        -
      </button>
      <div>
        <p className="counter-value-text">{quantity}</p>
      </div>
      <button
        onClick={increaseQuantity}
        className="subsract_button"
        type="button"
      >
        +
      </button>
    </div>
  )
}

export default Counter
