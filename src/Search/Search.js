import React, { Component } from 'react'

class Search extends Component {
  constructor() {
    super()
    this.state = {}
  }

  render() {
    return (
      <>
        <input 
          type="text" 
          name="search-bar" 
          placeholder="Search by title, genre, year" />
        <button>
          🔍
        </button>
      </>
    )
  }
}

export default Search