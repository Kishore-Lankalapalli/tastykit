import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    isValid: false,
    errorMsg: '',
  }

  onSuccessAuthentication = token => {
    const {history} = this.props

    Cookies.set('jwt_token', token, {expires: 30})
    history.replace('/')
  }

  onLoginFailure = error => {
    this.setState({errorMsg: error, isValid: true})
  }

  onSubmitCredentials = async event => {
    event.preventDefault()

    const {username, password} = this.state

    const userDetails = {
      username,
      password,
    }

    const loginApiUrl = 'https://apis.ccbp.in/login'

    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(loginApiUrl, options)
    const data = await response.json()

    console.log(data)

    if (response.ok) {
      this.onSuccessAuthentication(data.jwt_token)
    } else {
      this.onLoginFailure(data.error_msg)
    }
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  render() {
    const {isValid, errorMsg} = this.state

    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken !== undefined) {
      return <Redirect path="/" />
    }

    return (
      <div className="login-bg-container">
        <div className="login-banner-container">
          <h1 className="login-heading">Login</h1>
          <img
            src="https://res.cloudinary.com/di8upujpz/image/upload/v1671020995/Rectangle_1457_bgvxyf.jpg"
            className="login-banner-image"
            alt="website login"
          />
        </div>
        <div className="login-container">
          <div className="tasty-kitchens-logo-image-container">
            <img
              src="https://res.cloudinary.com/di8upujpz/image/upload/v1671098178/Frame_274_rxlv7r.png"
              className="logo-image"
              alt="website logo"
            />

            <img
              src="https://res.cloudinary.com/di8upujpz/image/upload/v1671098189/Features_rk4kl3.png"
              className="logo-text-image"
              alt="website logo"
            />
            <h1 className="large-login-heading">Login</h1>
          </div>

          <form onSubmit={this.onSubmitCredentials} className="form-container">
            <div className="input-container">
              <label className="input-label" htmlFor="usernameInput">
                USERNAME
              </label>
              <input
                id="usernameInput"
                type="text"
                onChange={this.onChangeUsername}
                className="username-input"
              />
            </div>

            <div className="input-container">
              <label className="input-label" htmlFor="userPassword">
                PASSWORD
              </label>
              <input
                id="userPassword"
                onChange={this.onChangePassword}
                type="password"
                className="username-input"
              />
            </div>
            {isValid && <p className="error-message">{errorMsg}</p>}

            <button type="submit" className="login-button">
              Login
            </button>
          </form>
        </div>

        <img
          src="https://res.cloudinary.com/di8upujpz/image/upload/v1671099037/Rectangle_1456_ka9s83.jpg"
          className="login-large-devise-banner-image"
          alt="website login"
        />
      </div>
    )
  }
}

export default Login
