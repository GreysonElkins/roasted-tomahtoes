import React, { Component } from 'react'
import Search from '../Search/Search'
import Nav from '../Nav/Nav'
import './Header.scss'

const Header = (props) => {
    return (
      <header>
        <h1>R🍅asted<br/> T🍅mahtoes</h1>
        <Search />
        <Nav 
          isLoggedIn={props.isLoggedIn} 
          showLoginPage={props.showLoginPage}
          showHomePage={props.showHomePage}
          user={props.user} 
          logout={props.logout}
        />
      </header>
    )
  }

export default Header