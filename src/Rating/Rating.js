import Star from '../Star/Star'
import React, {Component} from 'react'

class Rating extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentValue: props.userRating ? props.userRating : 0
    }
  }

  makeStars = () => {
    let stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Star
          userRating={this.state.currentValue}
          starValue={i + 1}
        />
      );
    }
    return stars
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