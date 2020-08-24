import './Star.scss'
import React from 'react';
import selectedStar from "../images/selected-star.png";
import emptyStar from '../images/empty-star.png'

const Star = (props) => {
  let starSource = emptyStar
  if (props.sztarCount 
  && props.starCount >= props.starValue) {
    starSource = selectedStar
  } 
  return (
    <img 
      starValue={props.starValue}
      className='star-image' 
      alt='empty star icon' 
      src={starSource} 
      onMouseEnter={props.starHover}
      onMouseLeave={props.starLeave}
      onClick={props.rateMovie}
    />
  )
}

export default Star