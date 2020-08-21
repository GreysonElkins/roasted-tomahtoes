import React from 'react'
import Search from '../Search/Search'
import Nav from '../Nav/Nav'
import './Header.scss'

const Header = ({isLoggedIn, showLoginPage, showHomePage, user, logout, searchMovies}) => {
    return (
      <header id='header'>
        <h1 className='logo'>R🍅asted<br/> T🍅mahtoes</h1>
        <Search 
          searchMovies={searchMovies}
          id='search'
        />
        <Nav 
          isLoggedIn={isLoggedIn} 
          showLoginPage={showLoginPage}
          showHomePage={showHomePage}
          user={user} 
          logout={logout}
          id='search'
        />
      </header>
    )
  }

export default Header