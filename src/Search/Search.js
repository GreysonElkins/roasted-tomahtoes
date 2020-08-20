import React, { Component } from 'react'
import './Search.scss'
class Search extends Component {
  constructor() {
    super()
    this.state = {}
  }

  render() {
    return (
      <div className='search-box'>
        <input 
          aria-label='search-input'
          type="text" 
          name="search-bar" 
          placeholder="Search by title, genre, year" />
        <button id='search-btn'>
          🔍
        </button>
      </div>
    )
  }
}

export default Search