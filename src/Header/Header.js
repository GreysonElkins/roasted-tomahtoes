import React, { Component } from 'react'
import Search from '../Search/Search'
import Nav from '../Nav/Nav'
import './Header.scss'

class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <header>
        <h1>R🍅asted<br/> T🍅mahtoes</h1>
        <Search />
        <Nav 
          isLoggedIn={this.props.isLoggedIn} 
          showLoginPage={this.props.showLoginPage}
          pageView={this.props.pageView} 
          logout={this.props.logout}
        />
      </header>
    )
  }
}


export default Header