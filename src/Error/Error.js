import React from 'react'
import './Error.scss'

const Error = (props) => {
  return (
    <div className='error-box'>
      <p className='error-text'>{props.error}</p>
    </div>

  )
}

export default Error