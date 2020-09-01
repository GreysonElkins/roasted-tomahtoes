import React from 'react'
import './MovieCard.scss'
import PropTypes from "prop-types"
import Rating from '../Rating/Rating'
import FavoriteButton from '../FavoriteButton/FavoriteButton'
import {Link} from 'react-router-dom'
import "../FavoriteButton/FavoriteButton.scss";

const MovieCard = (props) => {
  const altText = `${props.movie.title} movie poster`

  return (
    <article className="card" tabIndex="0">
      <div>
        {props.showDeleteBtns === true && (
          <button
            className="delete-btn"
            onClick={() => props.deleteRating(props.userRating.id)}
          >
            Ⓧ
          </button>
        )}
        <div className="FavoriteButton">
        {props.isLoggedIn 
          && <FavoriteButton 
            movie={props.movie}
            isFavorite={props.isFavorite}
            toggleFavorite={props.toggleFavorite}
          />
        }
        </div>
        <Link to={`/movies/${props.movie.id}`} onClick={()=> {props.getSingleMovie(props.movie.id)}}>
          <img
            className="poster"
            src={props.movie.poster_path}
            alt={altText}
          />
        </Link>
      </div>
      <span className="card-info-box">
        <h4 className="movie-title">{props.movie.title}</h4>
        <span className="ratings-box">
          <h5 className="rating">
            {`🍅 ${(props.movie.average_rating * 10).toFixed(0)}%`} <br />
          </h5>
          {props.isLoggedIn === true && (
            <Rating
              userRating={props.userRating}
              rateMovie={props.rateMovie}
              movie_id={props.movie.id}
            />
          )}
        </span>
      </span>
    </article>
  );
}

export default MovieCard

MovieCard.propTypes = {
  getSingleMovie: PropTypes.func,
  key: PropTypes.string,
  isFavorite: PropTypes.bool,
  toggleFavorite: PropTypes.func,
  rateMovie: PropTypes.func,
  deleteRating: PropTypes.func,
  showDeleteBtns: PropTypes.bool,
  movie: PropTypes.object,
  showMoviePage: PropTypes.func,
  userRating: PropTypes.object,
  isLoggedIn: PropTypes.bool
}