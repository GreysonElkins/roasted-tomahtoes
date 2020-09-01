import React from "react";
import "./MoviePage.scss";
import PropTypes from "prop-types";
import moment from "moment";
import Error from "../Error/Error";
import Trailer from "../Trailer/Trailer";
import Rating from "../Rating/Rating";
import Overview from "../Overview/Overview";
import FavoriteButton from "../FavoriteButton/FavoriteButton";
import Comments from "../Comments/Comments";

const MoviePage = ({
  error,
  movie,
  isLoggedIn,
  trailers,
  rateMovie,
  userRating,
  toggleFavorite,
  checkIfFavorite,
  userComments,
  submitMovieComment,
  user,
}) => {
  const altText = `${movie.title} movie poster`;
  const trailerClips = trailers.map((trailer, i) => {
    return <Trailer trailer={trailer} key={i} />;
  });
  const isFavorite = checkIfFavorite(movie);
  return (
    <section className="movie-page">
      {error && <Error error={error} />}
      <section className="all-movie-info">
        <div className="movie-header">
          <h1 className="movie-title">{movie.title}</h1>
          <span className="ratings-box">
            <h3 className="avg-rating">
        🍅 {(movie.average_rating * 10).toFixed(0)}%
            </h3>
            {isLoggedIn && "|"}
            {isLoggedIn && (
              <Rating
                userRating={userRating}
                rateMovie={rateMovie}
                movie_id={movie.id}
              />
            )}
            {isLoggedIn && "|"}
            {isLoggedIn && (
              <FavoriteButton
                movie={movie}
                isFavorite={isFavorite}
                toggleFavorite={toggleFavorite}
              />
            )}
          </span>
        </div>
      </section>
      <section className="movie-content">
        <div className="movie-graphics">
          <img src={movie.poster_path} alt={altText} />
          {trailers.length > 0 && <div className="trailerList">{trailerClips}</div>}
        </div>
        <article className="movie-information">
          <Overview movie={movie} />
          <p className="movie-genre">
            <b>Genre(s):</b> {movie.genres.join(", ")}
          </p>
          <p className="movie-release-date">
            <b>Release Date:</b> {moment(movie.release_date).format("MMMM DD, YYYY")}
          </p>
          <p className="movie-budget">
            <b>Budget:</b> ${movie.budget}
          </p>
          <p className="movie-revenue">
            <b>Revenue:</b> ${movie.revenue}
          </p>
          <p className="movie-runtime">
            <b>Runtime:</b> {movie.runtime} minutes
          </p>
          <p className="movie-tagline">
            <b>Tagline:</b> {movie.tagline ? movie.tagline : "None"}
          </p>
        </article>
        <Comments
          userComments={userComments}
          error={error}
          isLoggedIn={isLoggedIn}
          submitMovieComment={submitMovieComment}
          movie={movie}
          user={user}
        />
      </section>
    </section>
  );
};

export default MoviePage;

MoviePage.propTypes = {
  movie: PropTypes.object,
  trailers: PropTypes.array,
  error: PropTypes.string,
  rateMovie: PropTypes.func,
  userRating: PropTypes.object,
  userComments: PropTypes.array,
  user: PropTypes.object,
  submitMovieComment: PropTypes.func,
};
