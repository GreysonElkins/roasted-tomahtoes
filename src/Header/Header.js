import React, { Component } from 'react'

class Header extends Component {
  constructor() {
    super()
    this.state = {}
  }

  render() {
    return (
      <>
        <span>🍅Roasted Tomahtoes </span>
        <span><input type="text" name="search-bar" placeholder="Search by title, genre, year"/><button>Search</button></span>
      </>
    )
  }
}


export default Header