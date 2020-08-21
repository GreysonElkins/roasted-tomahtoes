import React from 'react'
import './Error.scss'
import PropTypes from "prop-types"



const Error = ({error}) => {
  console.log(typeof error)
  return (
    <p className='error-text'>{error}</p>
  )
}

export default Error

Error.propTypes = {
  error: PropTypes.string
}