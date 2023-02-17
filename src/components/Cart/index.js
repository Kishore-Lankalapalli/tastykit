import {Component} from 'react'
import {Link} from 'react-router-dom'
import NoOrdersItem from '../NoOrdersItem'
import CartItem from '../CartItem'
import Header from '../Header'
import Footer from '../Footer'
import './index.css'

const cartPageStatus = {
  initial: 'INITIAL',

  cartItemAdded: 'ADDED',
  checkout: 'CHECKOUT',
}

class Cart extends Component {
  state = {
    cartItemsList: JSON.parse(localStorage.getItem('cartItem')) || [],
    cartStatus: cartPageStatus.cartItemAdded,
  }

  getCartItems = id => {
    const cartList = JSON.parse(localStorage.getItem('cartItem')) || []

    const filteredCartList = cartList.filter(item => item.quantity > 0)

    localStorage.setItem('cartItem', JSON.stringify(filteredCartList))

    this.setState({cartItemsList: filteredCartList})
  }

  onDecrementQuantity = id => {
    const cartList = JSON.parse(localStorage.getItem('cartItem')) || []

    const updatedCartList = cartList.map(cartItem => {
      if (cartItem.id === id) {
        if (cartItem.quantity > 0) {
          const updatedQuantity = cartItem.quantity - 1

          return {...cartItem, quantity: updatedQuantity}
        }
      }
      return cartItem
    })

    localStorage.setItem('cartItem', JSON.stringify(updatedCartList))

    this.getCartItems()
  }

  onIncrementQuantity = id => {
    console.log('increment count')
    const cartList = JSON.parse(localStorage.getItem('cartItem')) || []

    const updatedCartList = cartList.map(cartItem => {
      if (cartItem.id === id) {
        const updatedQuantity = cartItem.quantity + 1

        return {...cartItem, quantity: updatedQuantity}
      }
      return cartItem
    })
    localStorage.setItem('cartItem', JSON.stringify(updatedCartList))

    this.setState({cartItemsList: updatedCartList})
  }

  onChangeCartStatus = () => {
    localStorage.removeItem('cartItem')
    this.setState({cartStatus: cartPageStatus.checkout})
  }

  renderPaymentSuccessView = () => (
    <div className="payment-success-container">
      <img
        className="payment-success-image"
        src="https://res.cloudinary.com/di8upujpz/image/upload/v1671447880/Vector_1_vnb71z.png"
      />
      <h1 className="payment-successful-heading">Payment Successful</h1>
      <p className="payment-successful-text">
        Thank you for ordering <br /> Your payment successfully completed
      </p>
      <Link to="/" className="link">
        <button type="button" className="go-to-home-page-button">
          Go To Home Page
        </button>
      </Link>
    </div>
  )

  renderCartItemsView = () => {
    const {cartItemsList} = this.state

    let totalCost = 0

    cartItemsList.map(item => {
      const cost = item.cost * item.quantity

      totalCost += cost

      return cost
    })
    return (
      <div>
        {cartItemsList.length === 0 ? (
          <NoOrdersItem />
        ) : (
          <>
            <div className="cart-container">
              <div className="cart-header-container">
                <p>Item</p>
                <p>Quantity</p>
                <p>Cost</p>
              </div>

              <ul className="ordered-items-cart-container">
                {cartItemsList.map(item => (
                  <CartItem
                    onDecrementQuantity={this.onDecrementQuantity}
                    onIncrementQuantity={this.onIncrementQuantity}
                    key={item.id}
                    item={item}
                  />
                ))}
              </ul>
              <hr />

              <p className="total-order-cost">
                Order Total:
                <span>₹{totalCost}.00</span>
              </p>
              <button
                type="button"
                onClick={this.onChangeCartStatus}
                className="place-order-button"
              >
                Place Order{' '}
              </button>
            </div>

            <Footer />
          </>
        )}
      </div>
    )
  }

  renderCartView = () => {
    const {cartStatus} = this.state

    switch (cartStatus) {
      case cartPageStatus.cartItemAdded:
        return this.renderCartItemsView()
      case cartPageStatus.checkout:
        return this.renderPaymentSuccessView()
      default:
        return null
    }
  }

  render() {
    const {cartItemsList} = this.state

    let totalCost = 0

    cartItemsList.map(item => {
      const cost = item.cost * item.quantity

      totalCost += cost

      return cost
    })

    return (
      <>
        <Header />
        {this.renderCartView()}
      </>
    )
  }
}

export default Cart
