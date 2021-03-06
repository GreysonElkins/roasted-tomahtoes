import React from "react";
import PropTypes from "prop-types";
import MovieCard from "../MovieCard/MovieCard";
import "./Main.scss";
import Error from "../Error/Error";

const Main = ({
  error,
  movies,
  isLoggedIn,
  rateMovie,
  checkIfFavorite,
  userRatings,
  deleteRating,
  showDeleteBtns,
  toggleFavorite,
  getSingleMovie,
}) => {
  const matchUserRatingWithMovie = (movie) => {
    if (userRatings.some((rating) => rating.movie_id === movie.id)) {
      return userRatings.find((rating) => rating.movie_id === movie.id);
    } else {
      return { rating: 0 };
    }
  };

  const movieCards = movies.map((movie, i) => {
    const matchingUserRating = matchUserRatingWithMovie(movie);
    const isFavorite = checkIfFavorite(movie);
    return (
      <MovieCard
        key={i}
        movie={movie}
        checkIfFavorite={checkIfFavorite}
        isLoggedIn={isLoggedIn}
        toggleFavorite={toggleFavorite}
        rateMovie={rateMovie}
        isFavorite={isFavorite}
        userRating={matchingUserRating}
        deleteRating={deleteRating}
        showDeleteBtns={showDeleteBtns}
        getSingleMovie={getSingleMovie}
      />
    );
  });

  return (
    <main>
      {error && <Error error={error} />}
      <section className="gallery">{movieCards}</section>
    </main>
  );
};

export default Main;

Main.propTypes = {
  error: PropTypes.string,
  movies: PropTypes.array,
  showMoviePage: PropTypes.func,
  getSingleMovie: PropTypes.func,
  isLoggedIn: PropTypes.bool,
  checkIfFavorite: PropTypes.func,
  toggleFavorite: PropTypes.func,
  rateMovie: PropTypes.func,
  userRatings: PropTypes.array,
  deleteRating: PropTypes.func,
}
