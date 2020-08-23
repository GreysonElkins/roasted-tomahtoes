import './Star.scss'
import React from 'react';
import selectedStar from "../images/selected-star.png";
import emptyStar from '../images/empty-star.png'

const Star = (props) => {
  let starSource = emptyStar
  if (props.userRating.rating >= props.starValue) {
    starSource = selectedStar
  } 
  return (
    <img 
      className='star-image' 
      alt='empty star icon' 
      src={starSource} 
    />
  )
  // }

  // render() {
  //   // let stars  = []
  //   // for (let i = 0; i < 5; i++) {
  //   //   stars.push(<img className='star-image' alt='star outlined' id={i+1} src={emptyStar} onMouseEnter={() => {this.setStar(i+1)}} />);
  //   // }
  //   // this.setStar(0)
  //   // return (
  //   //   // <div className='stars-box'>
       
  //   //   // </div>
  //   // )
  // }
}

export default Star