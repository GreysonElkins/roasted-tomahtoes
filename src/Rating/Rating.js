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

  makeStars = (numberOfStars) => {
    let stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Star
          starCount={numberOfStars}
          starValue={i + 1}
          starHover={() => {this.starPreview(i + 1)}}
          starLeave={() => {
            debugger
            this.starPreview(this.state.userRating)
          }}
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
        {this.makeStars(this.state.currentValue)}
       </div>
    )
  }
}

export default Rating