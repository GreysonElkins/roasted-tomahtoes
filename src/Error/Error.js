import React from 'react'
import './Error.scss'

const Error = (props) => {
  return (
    <div className='error-box'>
      <h2 className='error-header'>Error</h2>
      <p className='error-text'>{props.error}</p>
    </div>

  )
}

export default Error