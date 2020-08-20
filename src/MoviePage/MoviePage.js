import React from 'react'
import Error from '../Error/Error.scss'
import './MoviePage.scss'

const MoviePage = (props) => {
  const movieInfo = props.movie;
  const altText = `${movieInfo.title} movie poster`
  return (
    <section className="moviePage">
      {props.error && <Error error={props.error} /> }
    <img src={movieInfo.poster_path} alt={altText} />  
    <div className='movieContent'>
    <h1 className='movieTitle'>{movieInfo.title}</h1>
        <h3 className='movieRating'>🍅 {movieInfo.average_rating * 10}% </h3>
    <p className='movieInformation'>
      <b>Release Date:</b> {movieInfo.release_date} <br /> 
      <b>Overview:</b> {movieInfo.overview} <br /> 
      <b>Genre(s):</b> {movieInfo.genres.map(genre=>genre + ' ')} <br />
      <b>Budget:</b> ${movieInfo.budget} <br /> 
      <b>Revenue:</b> ${movieInfo.revenue} <br /> 
      <b>Runtime:</b> {movieInfo.runtime} minutes<br /> 
      <b>Tagline:</b> {movieInfo.tagline ? movieInfo.tagline : 'None'}
    </p>
    <input
      label='rate-movie'
      type='number'
      max='10'
      min='0'
      placeholder='Your 🍅 Rating'
    />
    <button className='submit-rating-btn'>Submit Rating</button>
    </div>  

    </section>
  ) 
}

export default MoviePage

// {
//     "movie": {
//         "id": 524047,
//         "title": "Greenland",
//         "poster_path": "https://image.tmdb.org/t/p/original//sA154deR0X51EcR2lm2FfDczryg.jpg",
//         "backdrop_path": "https://image.tmdb.org/t/p/original//juzEhsX92if2lJ2CSqKAI4RQswt.jpg",
//         "release_date": "2020-07-29",
//         "overview": "A detached married couple must get their son and themselves to safety after being randomly selected to enter an underground bunker, as a massive object from space threatens to destroy the world in less than 48 hours.",
//         "genres": [
//             "Action",
//             "Science Fiction",
//             "Thriller"
//         ],
//         "budget": 0,
//         "revenue": 0,
//         "runtime": 119,
//         "tagline": "",
//         "average_rating": 9
//     }
// }