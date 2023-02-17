import {Link} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'
import './index.css'

const PopularRestaurantItem = props => {
  const {restaurant} = props
  const {imageUrl, cuisine, name, id, userRating} = restaurant

  return (
    <Link className="link-element" to={`/restaurant/${id}`}>
      <li className="restaurant-list-item">
        <img src={imageUrl} className="restaurant-item-image" />
        <div className="restaurant-details-container">
          <h1 className="restaurant-name">{name}</h1>
          <p className="cuisine-category">{cuisine}</p>
          <div className="ratings-container">
            <AiFillStar className="star-icon" />
            <p className="ratings-text">
              {userRating.rating}{' '}
              <span className="total-reviews-text">
                ({userRating.totalReviews} ratings)
              </span>
            </p>
          </div>
        </div>
      </li>
    </Link>
  )
}

export default PopularRestaurantItem
