import React from 'react'
import MovieCard from '../MovieCard/MovieCard'
import './Main.scss'

const Main = (props) => {
  return (
    <div className="gallery">
      {props.movies.map(movie => {
        return <MovieCard id={movie.id} movie={movie}/>
      })}
    </div>
  )
}

export default Main