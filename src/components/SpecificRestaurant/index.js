import {Component} from 'react'
import Cookies from 'js-cookie'
import {AiFillStar} from 'react-icons/ai'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import FoodItem from '../FoodItem'
import Footer from '../Footer'

import './index.css'

const apiStatusConstants = {
  initial: 'INTIIAL',
  success: 'SUCCESS',
  inProgress: 'INPROGRESS',
  failure: 'FAILURE',
}

class SpecificRestaurant extends Component {
  state = {
    restaurantDetails: {},
    foodItemslist: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getSpecificRestaurantDetails()
  }

  getSpecificRestaurantDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    this.setState({apiStatus: apiStatusConstants.inProgress})

    const jwtToken = Cookies.get('jwt_token')

    const selectedRestaurantApiUrl = `https://apis.ccbp.in/restaurants-list/${id}`

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(selectedRestaurantApiUrl, options)

    if (response.ok) {
      const data = await response.json()

      const restaurantDetails = {
        costForTwo: data.cost_for_two,
        cuisine: data.cuisine,
        foodItems: data.food_items.map(item => ({
          cost: item.cost,
          foodType: item.food_type,
          id: item.id,
          imageUrl: item.image_url,
          name: item.name,
          rating: item.rating,
        })),

        id: data.id,
        imageUrl: data.image_url,
        itemsCount: data.items_count,
        location: data.location,
        name: data.name,
        opensAt: data.opens_at,
        rating: data.rating,
        reviewsCount: data.reviews_count,
      }

      this.setState({
        restaurantDetails,
        foodItemslist: restaurantDetails.foodItems,
        apiStatus: apiStatusConstants.success,
      })
    }
  }

  renderRestaurantLoaderView = () => (
    <div className="specific-restaurant-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#F7931E" height="50" width="50" />
    </div>
  )

  renderRestaurantSuccessView = () => {
    const {restaurantDetails, foodItemslist} = this.state

    return (
      <ul className="foodItems-list-container">
        {foodItemslist.map(item => (
          <FoodItem key={item.id} foodItem={item} />
        ))}
      </ul>
    )
  }

  renderSpecificRestaurantView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderRestaurantLoaderView()
      case apiStatusConstants.success:
        return this.renderRestaurantSuccessView()
      default:
        return null
    }
  }

  render() {
    const {restaurantDetails, foodItemslist} = this.state

    const {
      costForTwo,
      cuisine,
      id,
      imageUrl,
      itemsCount,
      location,
      name,
      opensAt,
      rating,
      foodItems,
      reviewsCount,
    } = restaurantDetails

    return (
      <>
        <Header />
        <div className="specific-restaurant-container">
          <div className="specific-restaurant-details-container">
            <img src={imageUrl} className="specific-restaurant-image" />
            <div className="restaurant-description-container">
              <h1 className="specific-restaurant-name">{name}</h1>
              <p className="location-text">{location}</p>
              <div className="restaurants-rating-price-container">
                <div className="restaurant-ratings-container">
                  <div className="rating-container">
                    <AiFillStar className="rating-star-icon" />
                    <p className="restaurant-rating">{rating}</p>
                  </div>
                  <p className="ratings-count-text">{reviewsCount} Ratings</p>
                </div>
                <hr className="line" />
                <div>
                  <p className="cost-for-two-text">₹ {costForTwo}</p>
                  <p className="cost-for-two">Cost for two</p>
                </div>
              </div>
            </div>
          </div>
          <div className="restaurant-food-items-container">
            {this.renderSpecificRestaurantView()}
          </div>
          <Footer />
        </div>
      </>
    )
  }
}

export default SpecificRestaurant
