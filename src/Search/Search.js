import React, { Component } from 'react'
import './Search.scss'
import PropTypes from 'prop-types'
class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchQuery: ''
    }
  }

  handleChange = (event) => {
    this.setState({searchQuery: event.target.value})
  }

  searchMovies = (event) => {
    event.preventDefault() 
    this.props.searchMovies(this.state.searchQuery)
  }

  render() {
    return (
      <div className='search-box'>
        <input 
          role='search'
          aria-label='search-input'
          type="text" 
          name="search-bar" 
          placeholder="Search by title, genre, year" 
          onChange={this.handleChange}/>
        <button 
          id='search-btn'
          onClick={this.searchMovies}
        >
          Search
        </button>
      </div>
    )
  }
}

export default Search

Search.propTypes = {
  searchMovies: PropTypes.func
}

