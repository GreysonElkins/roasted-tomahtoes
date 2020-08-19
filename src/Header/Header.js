import React, { Component } from 'react'
import Search from '../Search/Search'
import Nav from '../Nav/Nav'

class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <>
        <span>🍅 Roasted Tomahtoes </span>
        <Search />
        <Nav isLoggedIn={this.props.isLoggedIn}/>
      </>
    )
  }
}


export default Header