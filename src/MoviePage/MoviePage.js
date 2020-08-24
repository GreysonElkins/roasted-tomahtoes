import React from 'react'
import Error from '../Error/Error'
import './MoviePage.scss'
import PropTypes from 'prop-types'
import moment from 'moment'
import Trailer from '../Trailer/Trailer'

const MoviePage = ({error, movie, isLoggedIn, trailers}) => {
  const altText = `${movie.title} movie poster`
  let trailerClips = trailers.map(trailer => {
    return (
     <Trailer trailer={trailer} />
    )
  })
  return (
    <section className="movie-page">
     <h1 className="movie-title">{movie.title}</h1>
      <span className='ratings-box'>
        <h3 className="avg-rating">🍅 {(movie.average_rating * 10).toFixed(0)}% </h3>
        {isLoggedIn && <h3 className="user-rating">🍿 40%</h3>}
      </span>
    {error && <Error error={error} />}
    <section className='all-movie-info'>
      <img src={movie.poster_path} alt={altText} />
      <div className="movie-content">
      <article className="movie-information">
        <p className='movie-overview'>{movie.overview}</p>
        <p className='movie-genre'><b>Genre(s):</b> {movie.genres.join(", ")}</p>
        <p className='movie-release-date'><b>Release Date:</b> {moment(movie.release_date).format("MMMM DD, YYYY")}</p>
        <p className='movie-budget'><b>Budget:</b> ${movie.budget}</p>
        <p className='movie-revenue'><b>Revenue:</b> ${movie.revenue}</p>
        <p className='movie-runtime'><b>Runtime:</b> {movie.runtime} minutes</p>
        <p className='movie-tagline'><b>Tagline:</b> {movie.tagline ? movie.tagline : "None"}</p>
      </article>
      {trailers.length > 0 && 
        <div className='trailerList'>{trailerClips}</div>}
      </div>
    </section>
   </section>
  ); 
}

export default MoviePage

MoviePage.propTypes = {
  movie: PropTypes.object,
  error: PropTypes.string
}