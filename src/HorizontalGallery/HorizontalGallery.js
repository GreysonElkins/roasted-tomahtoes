import React, { component } from 'react'

const HorizontalScroll = ({
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

  let movieCards
  
  if (movieSelection.length > 0) {
    movieCards movieSelection.map((movie, i), () => {
      return (<MovieCard 
        key={`fav${i}`}
        movie={movie}
        isLoggedIn={isLoggedIn}
        rateMovie={rateMovie}
        userRating={this.matchingUserWithMovie(movie)}
        deleteRating={deleteRating}
        showDeleteBtns={false}
      />)
    })
    } 

  return (
    <div class="HorizontalScroll">
      {movieCards}
    </div>
  )
}