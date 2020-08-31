import React from 'react'
import MovieCard from '../MovieCard/MovieCard'
import './HorizontalGallery.scss'


const HorizontalGallery = ({
  movieSelection, 
  galleryTitle,
  isLoggedIn,
  rateMovie,
  userRatings,
  deleteRating,
  checkIfFavorite,
  toggleFavorite
  }) => {
  
  const matchUserRatingWithMovie = (movie) => {
    if (userRatings.some((rating) => rating.movie_id === movie.id)) {
      return userRatings.find((rating) => rating.movie_id === movie.id);
    } else {
      return { rating: 0 };
    }
  }

  let showDeleteBtns = false
  
  if (galleryTitle.includes('star')) {
    const requiredRating = +galleryTitle.substring(0, 1)
    showDeleteBtns = true
    movieSelection = movieSelection.filter(movie => movie.userRating.rating === requiredRating)
  }
  
  // let relevantMovies = findRelevantMovies(movieSelection, allMovies);
  const movieCards = movieSelection.map((movie, i) => {
    let rating = matchUserRatingWithMovie(movie)
    let isFavorite = checkIfFavorite(movie)
      return (
        <MovieCard
          key={`${galleryTitle}${i}`}
          movie={movie}
          isFavorite={isFavorite}
          isLoggedIn={isLoggedIn}
          toggleFavorite={toggleFavorite}
          rateMovie={rateMovie}
          userRating={rating}
          deleteRating={deleteRating}
          showDeleteBtns={showDeleteBtns}
        />
      );
    })
   
  if(movieCards.length > 0) {
    return (
      <>
      <h2>{galleryTitle}</h2>
      <div className="HorizontalGallery">
      {movieCards}
      </div>
      <hr className="linebreak"/>
      </>
    )
  } else {
    return ''
  }
}

export default HorizontalGallery