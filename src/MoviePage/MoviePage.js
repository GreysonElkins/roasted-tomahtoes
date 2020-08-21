import React from 'react'
import Error from '../Error/Error.scss'
import './MoviePage.scss'
import PropTypes from 'prop-types'

const MoviePage = ({error, movie}) => {
  const altText = `${movie.title} movie poster`
  return (
    <section className="movie-page">
      {error && <Error error={error} /> }
      <img src={movie.poster_path} alt={altText} />  
      <div className='movie-content'>
        <h1 className='movie-title'>{movie.title}</h1>
        <button className='movie-trailer-btn'>Play Trailer</button>
        <p className='movie-information'>
          <b>Average Rating:</b> 🍅 {movie.average_rating * 10}% <br />
          <b>Release Date:</b> {movie.release_date} <br /> 
          <b>Overview:</b> {movie.overview} <br /> 
          <b>Genre(s):</b> {movie.genres.join(', ')} <br />
          <b>Budget:</b> ${movie.budget} <br /> 
          <b>Revenue:</b> ${movie.revenue} <br /> 
          <b>Runtime:</b> {movie.runtime} minutes<br /> 
          <b>Tagline:</b> {movie.tagline ? movie.tagline : 'None'}
        </p>
        <span className='rating-input'>
          <input
            aria-label='rate-movie-input'
            type='number'
            name='user-rating-number'
            max='10'
            min='0'
            placeholder='Your 🍅 Rating'
            />
          <button className='submit-rating-btn'>Submit Rating</button>
        </span>
      </div>  
    </section>
  ) 
}

export default MoviePage

MoviePage.propTypes = {
  movie: PropTypes.object,
  error: PropTypes.string
}