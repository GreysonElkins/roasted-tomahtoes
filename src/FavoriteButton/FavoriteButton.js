import React, {Component} from 'react'
import PropTypes from "prop-types";
// import Rating from '../Rating/Rating';

class FavoriteButton extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentValue: undefined
    }
  }

  makeHeart = (props, heartIsSelected = props.isFavorite) => {
    let heart = `🤍`
    let altText = 'unselected heart icon'
    if (heartIsSelected) {
      heart = `❤️`
      altText = 'selected heart icon'
    }
    return (
      <span 
        id="emptyFavoriteIcon"
        tabIndex='0'
        alt={altText}
        onClick={() => {props.toggleFavorite(props.movie.id)}}
        onMouseEnter={() => this.setState({ currentValue: true })}
        onMouseLeave={() => this.setState({ currentValue: undefined })}>
          {heart}
      </span>
    )
  }

  render = () => {
    return (
    <span id="favorite-icon">
      {this.makeHeart(this.props, this.state.currentValue)}
    </span>
    )
  }

}

export default FavoriteButton

FavoriteButton.propTypes = {
  movie: PropTypes.object,
  isFavorite: PropTypes.bool,
  toggleFavorite: PropTypes.func
}