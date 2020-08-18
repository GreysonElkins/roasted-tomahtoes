import React, { Component } from 'react'
import Search from '../Search/Search'
import Nav from '../Nav/Nav'

class Header extends Component {
  constructor() {
    super()
    this.state = {}
  }

  render() {
    return (
      <>
        <span>🍅 Roasted Tomahtoes </span>
        <Search />
        <Nav />
      </>
    )
  }
}


export default Header