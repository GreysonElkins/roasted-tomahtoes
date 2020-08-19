import React from 'react'
import MovieCard from '../MovieCard/MovieCard'

const Main = (props) => {
  return (
    <div className="gallery">
      {props.movies.map(movie => {
        return <MovieCard movie={movie}/>
      })}
    </div>
  )
}

export default Main