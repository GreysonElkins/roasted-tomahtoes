import React from 'react'
import './Nav.scss'

const Nav = (props) => {
  return (
    <nav>
    <button id='home-btn'>
      Home
    </button>
    <button 
      className={props.isLoggedIn ? '' : 'hidden'} 
      id='ratings-header-btn'>
      Your Ratings
    </button> 
    <button 
      className={props.isLoggedIn ? 'hidden' : ''}
      id='login-btn'>
      Login
    </button>
    <button 
      className={props.isLoggedIn ? '' : 'hidden'} 
      id='logout-btn'>
      Logout
    </button>
    </nav>
  )
}

export default Nav