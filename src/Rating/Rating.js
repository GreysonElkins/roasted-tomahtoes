import './Rating.scss'
import React, { Component } from 'react';
import selectedStar from "../images/selected-star.png";
import emptyStar from '../images/empty-star.png'

class Rating extends Component {
  constructor(props) {
    super(props)
    this.state = {rating: 0, imgSrc: emptyStar}
  }

  setStar = () => {
    // let stars = []
    // for (let i = 0; i < 5; i++) {
    //   // let star = emptyStar;
    //   // if (i + 1 < id) {
    //   //   star = selectedStar;
    //   // }
    //   stars.push(<img className='star-image' alt='yellow star' id={i+1} src={this.state.imgSrc} onMouseEnter={this.setStar} />);
    // }
    this.setState({imgSrc: selectedStar})
  }


  render() {
    let stars  = []
    for (let i = 0; i < 5; i++) {
      stars.push(<img className='star-image' alt='yellow star' id={i+1} src={this.state.imgSrc} onMouseEnter={this.setStar} />);
    }
    // this.setStar(0)
    return (
      <div className='stars-box'>
        {stars}
      </div>
    )
  }
}

export default Rating