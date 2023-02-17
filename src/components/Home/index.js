import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import Slider from 'react-slick'
import {BsFilterLeft} from 'react-icons/bs'

import Header from '../Header'
import PopularRestaurantItem from '../PopularRestaurantItem'
import Pagenation from '../Pagenation'
import Footer from '../Footer'
import './index.css'

const sortByOptions = [
  {
    id: 0,
    displayText: 'Highest',
    value: 'Highest',
  },
  {
    id: 2,
    displayText: 'Lowest',
    value: 'Lowest',
  },
]

const offersApiStatus = {
  initial: 'INTITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}

const popularRestaurantApiStatus = {
  initial: 'INTITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}

class Home extends Component {
  state = {
    carouselImagesList: [],
    restaurantsList: [],
    offset: 1,
    ratingCategory: 'Lowest',
    searchInput: '',
    offersCarouselApiStatus: offersApiStatus.initial,
    restaurantApiStatus: popularRestaurantApiStatus.intitial,
  }

  componentDidMount() {
    this.getCarouselImages()
    this.getRestaurantsList()
  }

  getRestaurantsList = async () => {
    const token = Cookies.get('jwt_token')

    let {offset} = this.state

    this.setState({restaurantApiStatus: popularRestaurantApiStatus.inProgress})

    const {ratingCategory, searchInput} = this.state

    offset = (offset - 1) * 9
    const limit = 9
    const restaurantsApiUrl = `https://apis.ccbp.in/restaurants-list?search=${searchInput}&offset=${offset}&limit=${limit}&sort_by_rating=${ratingCategory}`

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    const response = await fetch(restaurantsApiUrl, options)

    if (response.ok) {
      const data = await response.json()

      const restaurantsList = data.restaurants.map(item => ({
        costForTwo: item.cost_for_two,
        cuisine: item.cuisine,
        groupByTime: item.group_by_time,
        hasOnlineDelivery: item.has_online_delivery,
        hasTableBooking: item.has_table_booking,
        id: item.id,
        imageUrl: item.image_url,
        isDeliveringNow: item.is_delivering_now,
        location: item.location,
        menuType: item.menu_type,
        name: item.name,
        opensAt: item.opens_at,
        userRating: {
          rating: item.user_rating.rating,
          ratingText: item.user_rating.rating_text,
          ratingColor: item.user_rating.rating_color,
          totalReviews: item.user_rating.total_reviews,
        },
      }))

      this.setState({
        restaurantsList,
        restaurantApiStatus: popularRestaurantApiStatus.success,
      })
    } else {
      this.setState({restaurantApiStatus: popularRestaurantApiStatus.failure})
    }
  }

  getCarouselImages = async () => {
    const jwtToken = Cookies.get('jwt_token')

    this.setState({offersCarouselApiStatus: offersApiStatus.inProgress})

    const carouseApiUrl = 'https://apis.ccbp.in/restaurants-list/offers'

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(carouseApiUrl, options)

    if (response.ok) {
      const data = await response.json()
      console.log(data)

      const carouselImages = data.offers.map(item => ({
        imageUrl: item.image_url,
        id: item.id,
      }))
      this.setState({
        carouselImagesList: carouselImages,
        offersCarouselApiStatus: offersApiStatus.success,
      })
    }
  }

  onIncrementNextPage = () => {
    const {offset} = this.state
    if (offset > 4 || offset === 4) {
      this.setState({offset: 4})
    } else {
      this.setState(
        prevState => ({offset: prevState.offset + 1}),
        this.getRestaurantsList,
      )
    }
  }

  onDecrementPreviousPage = () => {
    const {offset} = this.state
    if (offset <= 0 || offset === 1) {
      this.setState({offset: 1}, this.getRestaurantsList)
    } else {
      this.setState(
        prevState => ({offset: prevState.offset - 1}),
        this.getRestaurantsList,
      )
    }
  }

  onChangeRating = event => {
    this.setState({ratingCategory: event.target.value}, this.getRestaurantsList)
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value}, this.getRestaurantsList)
  }

  renderOffersLoaderView = () => (
    <div className="offers-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#F7931E" height="50" width="50" />
    </div>
  )

  renderRestaurantLoaderView = () => (
    <div className="restaurant-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#F7931E" height="50" width="50" />
    </div>
  )

  renderEmptyRestaurantsView = () => (
    <div className="empty-search-results-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
        className="no-results-image"
      />
      <h1 className="no-search-results-heading">No Search Results Found</h1>
      <p className="no-search-results-guiding-text">
        Try different keywords or remove search filter{' '}
      </p>
      <button
        onClick={() => this.setState(this.getRestaurantsList)}
        type="button"
        className="retry-button"
      >
        Retry
      </button>
    </div>
  )

  renderOffersSuccessView = () => {
    const {carouselImagesList} = this.state

    const settings = {
      autoplay: true,
    }
    return (
      <div className="carousel-container">
        <Slider {...settings}>
          {carouselImagesList.map(image => (
            <img key={image.id} className="offer-image" src={image.imageUrl} />
          ))}
        </Slider>
      </div>
    )
  }

  renderRestaurantsSuccessView = () => {
    const {restaurantsList} = this.state

    console.log(restaurantsList)

    return (
      <ul className="popular-restaurants-lists-container">
        {restaurantsList.map(item => (
          <PopularRestaurantItem key={item.id} restaurant={item} />
        ))}
      </ul>
    )
  }

  renderOffersView = () => {
    const {offersCarouselApiStatus} = this.state

    switch (offersCarouselApiStatus) {
      case offersApiStatus.inProgress:
        return this.renderOffersLoaderView()
      case offersApiStatus.success:
        return this.renderOffersSuccessView()
      default:
        return null
    }
  }

  renderRestaurantView = () => {
    const {restaurantApiStatus} = this.state

    switch (restaurantApiStatus) {
      case popularRestaurantApiStatus.inProgress:
        return this.renderRestaurantLoaderView()
      case popularRestaurantApiStatus.success:
        return this.renderRestaurantsSuccessView()
      case popularRestaurantApiStatus.failure:
        return this.renderEmptyRestaurantsView()
      default:
        return null
    }
  }

  render() {
    const {
      carouselImagesList,
      restaurantsList,
      ratingCategory,
      offset,
      restaurantApiStatus,
    } = this.state

    return (
      <>
        <Header />
        <div className="home-route-container">
          <div className="home-container">
            {this.renderOffersView()}
            <div className="restaurants-display-container">
              <div className="popular-restaurant-filter-container">
                <div>
                  <h1 className="popular-restaurants-heading">
                    Popular Restaurants
                  </h1>
                  <p className="restaurants-quotation-text">
                    Select your favourite restaurant by special dish amke your
                    day happy...
                  </p>
                </div>

                <div className="filteration-container">
                  <BsFilterLeft className="filter-icon" />
                  <p className="sort-by-text">Sort By </p>
                  <select
                    onChange={this.onChangeRating}
                    value={ratingCategory}
                    className="filters-select-element"
                  >
                    {sortByOptions.map(item => (
                      <option
                        value={item.value}
                        key={item.id}
                        className="filter-options"
                      >
                        {item.displayText}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <input
                onChange={this.onChangeSearchInput}
                type="search"
                placeholder="Search By Name..."
                className="restaurant-search-input"
              />
            </div>
            {this.renderRestaurantView()}
          </div>
          {restaurantApiStatus !== popularRestaurantApiStatus.failure && (
            <Pagenation
              onIncrementNextPage={this.onIncrementNextPage}
              onDecrementPreviousPage={this.onDecrementPreviousPage}
              offset={offset}
            />
          )}

          <Footer />
        </div>
      </>
    )
  }
}

export default Home
