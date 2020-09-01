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
    this.setState({searchQuery: ''})
  }

  render() {
    return (
     <form className="search-box" onSubmit={this.searchMovies}>
      <input
       role="search"
       aria-label="search-input"
       type="text"
       name="search-bar"
       placeholder="Search by title, genre, year"
       value={this.state.searchQuery}
       onChange={this.handleChange}
      />
      <button className="search-btn">Search</button>
     </form>
  
    );
  }
}

export default Search

Search.propTypes = {
  searchMovies: PropTypes.func
}

