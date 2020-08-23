import Star from '../Star/Star'
import React, {Component} from 'react'

class Rating extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
     <div className="stars-box">
      <Star />
      <Star /> 
      <Star /> 
      <Star /> 
      <Star />
     </div>
    );
  }
}

export default Rating