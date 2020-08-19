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
        <h3>🍅 Roasted<br/> Tomahtoes </h3>
        <Search />
        <Nav isLoggedIn={this.props.isLoggedIn}/>
      </header>
    )
  }
}


export default Header