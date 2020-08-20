import React from 'react'
import MovieCard from '../MovieCard/MovieCard'
import './Main.scss'
import api from '../API/API'

const Main = (props) => {

  return (
    <main>
      {props.error && <Error error={props.error} />}
      {/* <h2 className='gallery-header'>All Movies</h2><br/> */}
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