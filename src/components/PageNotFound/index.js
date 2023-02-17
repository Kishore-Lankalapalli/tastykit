import {Link} from 'react-router-dom'
import './index.css'

const PageNotFound = () => (
  <div className="not-found-container">
    <img
      src="https://res.cloudinary.com/di8upujpz/image/upload/v1671431931/Group_trpvcj.png"
      className="not-found-image"
    />
    <h1 className="page-not-found-text"> Page Not Found</h1>
    <p className="page-not-found-heading">
      We are sorry, the page you requested could not be found.Please go back to
      the homepage{' '}
    </p>
    <Link to="/" className="link">
      <button type="button" className="home-page-button">
        Home Page
      </button>
    </Link>
  </div>
)

export default PageNotFound
