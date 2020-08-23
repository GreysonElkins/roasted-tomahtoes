import React from 'react'
import './MovieCard.scss'
import PropTypes from "prop-types"
import Rating from '../Rating/Rating'

const MovieCard = (props) => {
  const altText = `${props.movie.title} movie poster`
    const showMoviePage = () => {
      props.showMoviePage(props.movie.id);
    }; 

  return (
   <article className="card" onClick={showMoviePage} tabIndex="0">
    <img className="poster" src={props.movie.poster_path} alt={altText} />
    <span className="card-info-box">
     <h4 className="movie-title">{props.movie.title}</h4>
     <span className="ratings-box">
      <h5 className="rating">
       {`🍅 ${(props.movie.average_rating * 10).toFixed(0)}%`}{" "}
      </h5>
      {props.isLoggedIn === true && <Rating userRating={
        props.movie.userRating ? props.movie.userRating : 0 
      }/>}
     </span>
    </span>
   </article>
  );
}

export default MovieCard

MovieCard.propTypes = {
  movie: PropTypes.object,
  showMoviePage: PropTypes.func
}