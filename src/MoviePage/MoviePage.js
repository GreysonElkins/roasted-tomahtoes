import React from 'react'
import Error from '../Error/Error'
import './MoviePage.scss'
import PropTypes from 'prop-types'
import moment from 'moment'

const MoviePage = ({error, movie, isLoggedIn}) => {
  const altText = `${movie.title} movie poster`
  return (
   <section className="movie-page">
    {error && <Error error={error} />}
    <img src={movie.poster_path} alt={altText} />
    <div className="movie-content">
     <h1 className="movie-title">{movie.title}</h1>
     <h3 className="avg-rating">🍅 {movie.average_rating * 10}% </h3>
     {isLoggedIn && <h3 className="user-rating">🍿 40%</h3>}
     <button className="movie-trailer-btn">Play Trailer</button>
     <article className="movie-information">
      <b>Release Date:</b> {moment(movie.release_date).format("MM/DD/YYYY")} <br />
      <b>Overview:</b> {movie.overview} <br />
      <b>Genre(s):</b> {movie.genres.join(", ")} <br />
      <b>Budget:</b> ${movie.budget} <br />
      <b>Revenue:</b> ${movie.revenue} <br />
      <b>Runtime:</b> {movie.runtime} minutes<br />
      <b>Tagline:</b> {movie.tagline ? movie.tagline : "None"}
     </article>
     {isLoggedIn === true && (
      <span className="rating-input">
       <input
        aria-label="rate-movie-input"
        type="number"
        name="user-rating-number"
        max="10"
        min="1"
        placeholder="Your 🍅 Rating"
       />
       <button className="submit-rating-btn">Submit Rating</button>
      </span>
     )}
    </div>
   </section>
  ); 
}

export default MoviePage

MoviePage.propTypes = {
  movie: PropTypes.object,
  error: PropTypes.string
}