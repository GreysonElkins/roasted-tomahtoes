import React from 'react'
import './MovieCard.scss'

const MovieCard = (props) => {
  const altText = `${props.movie.title} movie poster`
    const showMoviePage = () => {
      props.showMoviePage(props.movie.id);
    }; 

  return (
    <div className='card' onClick={showMoviePage}>
      <img src={props.movie.poster_path} alt={altText} />  
      <span className='quick-info'>
        <h4 className="rating">{`🍅 ${props.movie.average_rating * 10}%`}</h4>
        <h4 className='movie-title'>{props.movie.title}</h4>
      </span>
    </div>
  )
}

export default MovieCard