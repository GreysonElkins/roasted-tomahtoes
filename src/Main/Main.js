import React from 'react'
import MovieCard from '../MovieCard/MovieCard'
import './Main.scss'
import api from '../API/API'

const Main = (props) => {

  return (
    <main>
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