import React, { Component } from 'react'
import Search from '../Search/Search'

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
      </>
    )
  }
}


export default Header