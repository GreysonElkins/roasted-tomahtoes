import Star from '../Star/Star'
import React, {Component} from 'react'

class Rating extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userRating: this.findRating(props),
      currentValue: this.findRating(props),
    };
  }

  findRating = (props) => {
    if (props.userRating) {
      return props.userRating.rating
    } else {
      return 0
    }
  }

  makeStars = (numberOfStars, props) => {
    let stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Star
          starCount={numberOfStars}
          starValue={i + 1}
          starHover={() => {this.starPreview(i + 1)}}
          starLeave={() => {this.starPreview(this.state.userRating)}}
          rateMovie={() => {
            this.props.rateMovie({
              rating: (i + 1) * 2, 
              movie_id: props.movie_id
            })}}
        />
      );
    }
    return stars
  }

  starPreview = (starNum) => {
    this.setState({currentValue: starNum})

  }

  render = () => {
    return (
      <div className="stars-box">
        {this.makeStars(this.state.currentValue, this.props)}
       </div>
    )
  }
}

export default Rating