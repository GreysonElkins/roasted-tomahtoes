import React from 'react'
import './Error.scss'


const Error = ({error}) => {
  return (
    <p className='error-text'>{error}</p>
  )
}

export default Error