import React from 'react'
import MovieCard from '../MovieCard/MovieCard'
import './Main.scss'
import Error from '../Error/Error'
import PropTypes from "prop-types"

const Main = ({error, movies, showMoviePage, isLoggedIn, rateMovie, userRatings}) => {
  const movieCards = movies.map(movie => {
      let matchingUserRating  
      if (userRatings.some(rating => rating.movie_id === movie.id)) {
        matchingUserRating = userRatings.find(rating => rating.movie_id === movie.id)
      } else {
        matchingUserRating = { rating: 0}
      }
      
      return <MovieCard 
        movie={movie} 
        showMoviePage={showMoviePage}
        isLoggedIn={isLoggedIn}
        rateMovie={rateMovie}
        userRating={matchingUserRating}
    />
  })
  return (
    <main>
      {error && <Error error={error} />}
      <section className='gallery'>
      {/* <h2 className='all-movies-header'>All Movies</h2><br/> */}
        {movieCards}
      </section>
    </main>
  )
}

export default Main

Main.propTypes = {
  error: PropTypes.string,
  movies: PropTypes.array,
  showMoviePage: PropTypes.func
}