import React from 'react'
import './Error.scss'
import PropTypes from "prop-types"
import sadTomato from '../images/sadtomatoes1.jpg'

const Error = ({error}) => {
  return (
    <div className='error-box'>
      <h2 className='error-header'>Uh Oh!</h2>
      <p className='error-text'>{error}</p>
      <img src={sadTomato} alt='Cartoon tomato frowning'></img>
    </div>
  )
}

export default Error

Error.propTypes = {
  error: PropTypes.string
}