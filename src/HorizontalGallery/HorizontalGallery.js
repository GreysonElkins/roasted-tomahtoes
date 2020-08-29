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

  // const findRelevantMovies = (movieSelection, allMovies) => {
  //   debugger
  //   if (galleryTitle === 'favorites') {
  //     return movieSelection.map(movie_id => {
  //       return allMovies.find(movie => movie_id === movie.id)
  //     })
  //   }
  // }

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
          showDeleteBtns={false}
        />
      );
    })
   

  return (
    <>
    <h2>{galleryTitle}</h2>
    <div className="HorizontalGallery">
    {movieCards}
    </div>
    </>
  )
}

export default HorizontalGallery