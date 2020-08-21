import React from 'react'
import './Nav.scss'

const Nav = (props) => {
  return (
    <nav>
      <h3
        className={props.isLoggedIn ? '' : 'hidden'}>
        Welcome, Charlie!</h3>
      <div className='button-box'>
        <button
          id='home-btn'
          onClick={props.showHomePage}
          >
          {props.pageView === 'MoviePage' ? 'All Movies' : 'Home'}
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
      </div>
    </nav>
  )
}

export default Nav