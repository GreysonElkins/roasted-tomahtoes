import React from 'react'
import './MovieCard.scss'

const MovieCard = (props) => {
  const altText = `${props.movie.title} movie poster`
  return (
    <div className='card' id={props.movie.id}>
      <img src={props.movie.poster_path} alt={altText} />  
      <span className='quick-info'>
      <h4>{props.movie.title}</h4>
      <h5 id="rating">{`${props.movie.average_rating * 10}%`}</h5>
      </span>
    </div>
  )
}

export default MovieCard