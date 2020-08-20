import React from 'react'
import './MovieCard.scss'

const MovieCard = (props) => {
  const altText = `${props.movie.title} movie poster`
  return (
    <div className='card'>
      <img src={props.movie.poster_path} alt={altText} />  
      <span className='quick-info'>
      <h3 id='movie-title'>{props.movie.title}</h3>
      <h3 id="rating">{`${props.movie.average_rating * 10}%`}</h3>
      </span>
    </div>
  )
}

export default MovieCard