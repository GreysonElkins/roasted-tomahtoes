import React from 'react'
import MovieCard from '../MovieCard/MovieCard'
import './Main.scss'
import Error from '../Error/Error'
import PropTypes from "prop-types"

const Main = ({
  error, 
  movies, 
  isLoggedIn, 
  rateMovie, 
  userRatings,
  deleteRating,
  showDeleteBtns,
  getSingleMovie
  }) => {
    
  const matchUserRatingWithMovie = (movie) => {
    if (userRatings.some((rating) => rating.movie_id === movie.id)) {
      return userRatings.find((rating) => rating.movie_id === movie.id);
    } else {
      return { rating: 0 };
    }
  };
  
  const movieCards = movies.map((movie, i) => {
      let matchingUserRating = matchUserRatingWithMovie(movie)
      return (
       <MovieCard
        key={i}
        movie={movie}
        isLoggedIn={isLoggedIn}
        rateMovie={rateMovie}
        userRating={matchingUserRating}
        deleteRating={deleteRating}
        showDeleteBtns={showDeleteBtns}
        getSingleMovie={getSingleMovie}
       />
      );
  })

  return (
    <main>
      {error && <Error error={error} />}
      <section className='gallery'>
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