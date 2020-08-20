import React from 'react'
import './Error.scss'

const Error = (props) => {
  return (
    <p className='error-text'>{props.error}</p>
  )
}

export default Error