import "./Star.scss";
import React, { Component } from "react";
import PropTypes from "prop-types";
import selectedStar from "../images/selected-star.png";
import emptyStar from "../images/empty-star.png";

class Rating extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentValue: undefined,
    };
  }

  makeStars = (props, numberOfStars = props.userRating.rating) => {
    let stars = [];
    for (let i = 0; i < 5; i++) {
      let starSource = emptyStar;
      let starAltText = "empty star icon";
      if (i < numberOfStars) {
        starSource = selectedStar;
        starAltText = "selected star icon";
      }
      stars.push(
        <div className="stars-box" key={i} tabIndex="0">
          <img
            key={i}
            className="star-image"
            alt={starAltText}
            src={starSource}
            id={i + 1}
            onMouseEnter={() => this.setState({ currentValue: i + 1 })}
            onMouseLeave={() => this.setState({ currentValue: undefined })}
            onClick={() => {
              props.rateMovie({
                rating: (i + 1) * 2,
                movie_id: props.movie_id,
              });
            }}
          />
        </div>
      );
    }
    return stars;
  };

  render = () => {
    return (
      <div className="stars-box">
        {this.makeStars(this.props, this.state.currentValue)}
      </div>
    );
  };
}

export default Rating;

Rating.propTypes = {
  movie_id: PropTypes.number,
  rateMovie: PropTypes.func,
  userRating: PropTypes.object,
};
