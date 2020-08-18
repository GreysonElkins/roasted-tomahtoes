import React from 'react'

const Nav = (props) => {
  return (
    <>
    <button id='home-btn'>Home</button>
    <button className={props.isLoggedIn ? '' : 'hidden'} id='ratings-header-btn'>Your Ratings</button>
    <button id='login-btn'>Login</button>
    </>
  )
}

export default Nav