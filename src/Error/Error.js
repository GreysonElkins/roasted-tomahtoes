import React from 'react'
import './Error.scss'

const Error = (props) => {
  return (
    <div className='error-box'>
      <h2 id='error-header'>Error</h2>
      <p id='error-text'>{props.error}</p>
    </div>

  )
}

export default Error