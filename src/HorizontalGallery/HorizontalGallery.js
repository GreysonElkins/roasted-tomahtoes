import React from 'react'
import MovieCard from '../MovieCard/MovieCard'

const HorizontalGallery = ({
  movieSelection, 
  galleryTitle,
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

      return (<MovieCard 
        key={`${galleryTitle}${i}`}
        movie={movie}
        isLoggedIn={isLoggedIn}
        rateMovie={rateMovie}
        userRating={rating}
        deleteRating={deleteRating}
        showDeleteBtns={false}
      />)
    })
   

  return (
    <div className="HorizontalGallery">
      <h2>{galleryTitle}</h2>
      {movieCards}
    </div>
  )
}

export default HorizontalGallery