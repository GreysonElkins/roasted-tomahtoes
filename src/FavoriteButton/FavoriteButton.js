import React, { Component } from "react";

class FavoriteButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentValue: undefined,
    };
  }

  makeHeart = (props, heartIsSelected = props.isFavorite) => {
    let heart = `🤍`;
    if (heartIsSelected) heart = `❤️`;
    return (
      <span
        id="emptyFavoriteIcon"
        tabIndex="0"
        onClick={() => {
          props.toggleFavorite(props.movie.id);
        }}
        onMouseEnter={() => this.setState({ currentValue: true })}
        onMouseLeave={() => this.setState({ currentValue: undefined })}
      >
        {heart}
      </span>
    );
  };

  render = () => {
    return (
      <span id="favorite-icon">
        {this.makeHeart(this.props, this.state.currentValue)}
      </span>
    );
  };
}

export default FavoriteButton;
