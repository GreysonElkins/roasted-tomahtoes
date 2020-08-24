import Star from '../Star/Star'
import React, {Component} from 'react'

class Rating extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userRating: props.userRating && props.userRating.rating,
      currentValue: this.userRating ? this.userRating : {rating: 0}
    }
  }

  makeStars = (numberOfStars) => {
    let stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Star
          starCount={numberOfStars}
          starValue={i + 1}
          starHover={() => {this.starHover(i + 1)}}
        />
      );
    }
    return stars
  }

  starHover(starNum) {
    this.setState({currentValue: starNum})

  }

  render () {
    return (
      <div className="stars-box">
        {this.makeStars(this.state.currentValue)}
       </div>
    )
  }
}

export default Rating