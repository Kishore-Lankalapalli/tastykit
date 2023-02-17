import {Component} from 'react'
import {MdArrowBackIosNew, MdArrowForwardIos} from 'react-icons/md'

import './index.css'

const Pagenation = props => {
  const {offset, onIncrementNextPage, onDecrementPreviousPage} = props

  const onDecrement = () => {
    onDecrementPreviousPage()
  }

  const onIncrement = () => {
    onIncrementNextPage()
  }
  return (
    <div className="counter-pagenation-container">
      <button className="pagenation-button" type="button" onClick={onDecrement}>
        <MdArrowBackIosNew className="arrow-icon" />
      </button>
      <div>
        <p className="pagenation-text">{offset} of 4</p>
      </div>
      <button className="pagenation-button" onClick={onIncrement}>
        <MdArrowForwardIos />
      </button>
    </div>
  )
}

export default Pagenation
