import {Component} from 'react'
import {FaPinterestSquare} from 'react-icons/fa'
import {AiOutlineInstagram, AiFillFacebook} from 'react-icons/ai'
import {BsTwitter} from 'react-icons/bs'

import './index.css'

const Footer = () => (
  <div className="footer-section-container">
    <div className="footer-section-logo-container">
      <img
        src="https://res.cloudinary.com/di8upujpz/image/upload/v1671258706/Vector_eyezsb.png"
        className="footer-section-tasty-kitchen-logo-image"
      />
      <h1 className="tasty-kitchens-text">Tasty Kitchens</h1>
    </div>
    <p className="footer-section-description">
      The only thing we are serious about is food.
      <br />
      Contact us on
    </p>
    <div className="websites-icons-container">
      <FaPinterestSquare className="icon" />
      <AiOutlineInstagram className="icon" />
      <BsTwitter className="icon" />
      <AiFillFacebook className="icon" />
    </div>
  </div>
)

export default Footer
