import React from 'react'
import './Nav.scss'

const Nav = ({isLoggedIn, showHomePage, showLoginPage, logout, user}) => {
  console.log("in nav", user);
  return (
    <nav>
      <h3
        className={isLoggedIn ? '' : 'hidden'}>
        Welcome, {user.name}!</h3>
      <div className='button-box'>
        <button
          id='home-btn'
          onClick={showHomePage}
          >
          Home
        </button>
        <button 
          className={isLoggedIn ? '' : 'hidden'} 
          id='ratings-header-btn'>
          Your Ratings
        </button> 
        <button 
          className={isLoggedIn ? 'hidden' : ''}
          id='login-btn'
          onClick={showLoginPage}>
          Login
        </button>
        <button 
          className={isLoggedIn ? '' : 'hidden'} 
          id='logout-btn'
          onClick={logout}>
          Logout
        </button>
      </div>
    </nav>
  )
}

export default Nav