import React from 'react'
import MovieCard from '../MovieCard/MovieCard'
import './Main.scss'
import api from '../API/API'
import Error from '../Error/Error'

const Main = (props) => {

  return (
    <main>
      {props.error && <Error error={props.error} />}
      {
        props.movies.map(movie => {
          return <MovieCard 
            movie={movie} 
            showMoviePage={props.showMoviePage}
          // props.goToMovieShowPage(movie.id)
        />
      })
    }
    </main>
  )
}

export default Main