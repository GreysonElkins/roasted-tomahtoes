import React, {Component} from 'react'
import './Overview.scss'
import PropTypes from 'prop-types'

class Overview extends Component {
  constructor(props) {
    super(props)
    this.state = {collapsed: true}
  }

  toggleOverview = () => {
    this.setState({
      collapsed: !this.state.collapsed})
  }

  render() {
    return(
      <span className='overview-box'>
          <p 
            className={this.state.collapsed ? 'movie-overview' : 'movie-overview-exp'}>
            {this.props.movie.overview}
            </p>
          <button 
            className='overview-display-btn' 
            onClick={this.toggleOverview}>{
              this.state.collapsed ? 'Show More' : 'Show Less'}
          </button>
      </span>

    )
  }
}

export default Overview

Overview.propTypes = {
  movie: PropTypes.object
}
