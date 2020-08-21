import React from 'react'
import Search from '../Search/Search'
import Nav from '../Nav/Nav'
import './Header.scss'

const Header = ({isLoggedIn, showLoginPage, showHomePage, user, logout}) => {
  console.log("in header", user);
    return (
      <header>
        <h1 className='logo'>R🍅asted<br/> T🍅mahtoes</h1>
        <Search />
        <Nav 
          isLoggedIn={isLoggedIn} 
          showLoginPage={showLoginPage}
          showHomePage={showHomePage}
          user={user} 
          logout={logout}
        />
      </header>
    )
  }

export default Header