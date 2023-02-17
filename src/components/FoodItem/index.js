import {Component} from 'react'
import {AiFillStar} from 'react-icons/ai'
import Footer from '../Footer'
import Counter from '../Counter'
import './index.css'

class FoodItem extends Component {
  state = {
    isFound: false,
    quantity: 0,
  }

  componentDidMount() {
    this.findCartItemsList()
  }

  findCartItemsList = () => {
    const cartData = JSON.parse(localStorage.getItem('cartItem')) || []
    const {foodItem} = this.props
    const cartItem = cartData.filter(each => each.id === foodItem.id)
    // console.log(cartItem)
    if (cartItem.length !== 0) {
      // console.log(cartItem)
      if (cartItem[0].quantity > 0) {
        this.setState({quantity: cartItem[0].quantity, isFound: true})
      } else if (cartItem[0].quantity < 1) {
        this.removeCartItem()
        this.setState({quantity: cartItem[0].quantity, isFound: false})
      }
    }
  }

  removeCartItem = () => {
    const cartData = JSON.parse(localStorage.getItem('cartItem'))
    const {foodItem} = this.props
    const updatedCartData = cartData.filter(
      eachCartItem => eachCartItem.id !== foodItem.id,
    )
    localStorage.setItem('cartItem', JSON.stringify(updatedCartData))
    this.findCartItemsList()
  }

  onAddFoodItemToCart = () => {
    const cartData = JSON.parse(localStorage.getItem('cartItem')) || []
    const {foodItem} = this.props
    // console.log(foodItem)
    const cartItem = {...foodItem, quantity: 1}
    // console.log(cartItem)
    cartData.push(cartItem)
    localStorage.setItem('cartItem', JSON.stringify(cartData))
    this.findCartItemsList()
  }

  onDecrementQuantity = id => {
    const cartData = JSON.parse(localStorage.getItem('cartItem'))
    const {foodItem} = this.props
    const updatedCartData = cartData.map(eachItem => {
      if (eachItem.id === foodItem.id) {
        // console.log('found')
        if (eachItem.quantity > 0) {
          const updatedQuantity = eachItem.quantity - 1
          return {...eachItem, quantity: updatedQuantity}
        }
      }
      return eachItem
    })
    localStorage.setItem('cartItem', JSON.stringify(updatedCartData))
    this.findCartItemsList()
  }

  onIncrementQuantity = id => {
    const cartData = JSON.parse(localStorage.getItem('cartItem'))
    const {foodItem} = this.props
    const updatedCartData = cartData.map(eachItem => {
      if (eachItem.id === foodItem.id) {
        // console.log('found')
        const updatedQuantity = eachItem.quantity + 1
        return {...eachItem, quantity: updatedQuantity}
      }
      return eachItem
    })
    localStorage.setItem('cartItem', JSON.stringify(updatedCartData))
    this.findCartItemsList()
  }

  render() {
    const {isFound, quantity} = this.state
    const {foodItem} = this.props
    const {imageUrl, name, id, rating, cost, foodType} = foodItem

    return (
      <li className="food-item-container">
        <img src={imageUrl} className="food-item-image" />
        <div className="food-item-details-container">
          <h1 className="food-item-name">{name}</h1>
          <p className="food-item-cost-text">₹ {cost}.00</p>
          <div className="food-item-rating-container">
            <AiFillStar className="star-icon" />
            <p className="rating-text">{rating}</p>
          </div>

          {isFound ? (
            <Counter
              onDecrementQuantity={this.onDecrementQuantity}
              onIncrementQuantity={this.onIncrementQuantity}
              quantity={quantity}
              id={id}
            />
          ) : (
            <button
              onClick={() => this.onAddFoodItemToCart()}
              className="add-item-button"
              type="button"
            >
              Add
            </button>
          )}
        </div>
      </li>
    )
  }
}

export default FoodItem
