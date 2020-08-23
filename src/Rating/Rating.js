import './Rating.scss'
import React, { Component } from 'react';
import selectedStar from "../images/selected-star.png";

class Rating extends Component {
  constructor(props) {
    super(props)
    this.state = {rating:0}
  }


  render() {
    let stars  = []
    for (let i = 0; i < 5; i++) {
      stars.push(<button className='star-image'><img className='star-image' alt='yellow star' src={selectedStar} /></button>);
    }
    return (
      <div className='stars-box'>
        {stars}
      </div>
    )
  }
}

export default Rating