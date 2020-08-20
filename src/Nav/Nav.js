import React from 'react'
import './Nav.scss'

const Nav = (props) => {
  return (
    <nav>
      <button 
        id='home-btn'
        onClick={props.showHomePage}
      >
        Home
      </button>
      <button 
        className={props.isLoggedIn ? '' : 'hidden'} 
        id='ratings-header-btn'>
        My Ratings
      </button> 
      <button 
        className={props.isLoggedIn ? 'hidden' : ''}
        id='login-btn'
        onClick={props.showLoginPage}>
        Login
      </button>
      <button 
        className={props.isLoggedIn ? '' : 'hidden'} 
        id='logout-btn'
        onClick={props.logout}>
        Logout
      </button>
    </nav>
  )
}

export default Nav