import React from 'react'
import MovieCard from '../MovieCard/MovieCard'

const HorizontalScroll = ({
  movieSelection, 
  galleryTitle,
  allMovies,
  isLoggedIn,
  rateMovie,
  userRatings,
  deleteRating,
  }) => {
  
  const matchUserRatingWithMovie = (movie) => {
    if (userRatings.some((rating) => rating.movie_id === movie.id)) {
      return userRatings.find((rating) => rating.movie_id === movie.id);
    } else {
      return { rating: 0 };
    }
  }

  const findRelevantMovies = () => {
    debugger
    if (galleryTitle === 'favorites') {
      return movieSelection.map(movie_id => {
        return allMovies.find(movie => movie_id === movie.id)
      })
    }
  }

  let relevantMovies = findRelevantMovies()
  let movieCards
  
  if (relevantMovies.length > 0) {
    movieCards = relevantMovies.map((movie, i) => {
      return (<MovieCard 
        key={`${galleryTitle}${i}`}
        movie={movie}
        isLoggedIn={isLoggedIn}
        rateMovie={rateMovie}
        userRating={matchUserRatingWithMovie(movie)}
        deleteRating={deleteRating}
        showDeleteBtns={false}
      />)
    })
  } 

  return (
    <div class="HorizontalScroll">
      <h2>{galleryTitle}</h2>
      {movieCards}
    </div>
  )
}

export default HorizontalScroll