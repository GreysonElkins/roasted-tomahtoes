import React from 'react'
import MovieCard from '../MovieCard/MovieCard'
import './Main.scss'

const Main = (props) => {
  return (
    <main>
      {props.movies.map(movie => {
        return <MovieCard id={movie.id} movie={movie}/>
      })}
    </main>
  )
}

export default Main