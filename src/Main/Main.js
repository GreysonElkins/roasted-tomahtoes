import React from 'react'
import MovieCard from '../MovieCard/MovieCard'
import './Main.scss'
import api from '../API/API'
import Error from '../Error/Error'

const Main = (props) => {

  return (
    <main>
      {props.error && <Error error={props.error} />}
      {/* <h2 className='all-movies-header'>All Movies</h2><br/> */}
      <section class='gallery'>
        {
          props.movies.map(movie => {
            return <MovieCard 
              movie={movie} 
              showMoviePage={props.showMoviePage}
          />
        })
      }
      </section>
    </main>
  )
}

export default Main