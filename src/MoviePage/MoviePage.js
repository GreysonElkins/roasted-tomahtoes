import React from 'react'
import '../Error/Error.scss'

const MoviePage = (props) => {
  return (
    <div className="error-box">
      {props.movie.id} is called {props.movie.title} it was relased on 
      {props.movie.release_date} and is about {props.movie.overview}.
    </div>
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