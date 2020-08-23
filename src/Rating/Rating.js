import Star from '../Star/Star'
import React, {Component} from 'react'

const Rating = (props) =>  {

  const makeStars = (props) => {
    let stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Star
          userRating={
            props.userRating ? props.userRating : 0
          }
          starValue={i + 1}
        />
      );
    }
    return stars
  }

  return (
    <div className="stars-box">
      {makeStars(props)}
     </div>
  )
}

export default Rating