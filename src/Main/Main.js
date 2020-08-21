import React from 'react'
import MovieCard from '../MovieCard/MovieCard'
import './Main.scss'
import Error from '../Error/Error'

const Main = ({error, movies, showMoviePage}) => {
  const movieCards = movies.map(movie => {
      return <MovieCard 
        movie={movie} 
        showMoviePage={showMoviePage}
    />
  })
  return (
    <main>
      {error && <Error error={error} />}
      {/* <h2 className='all-movies-header'>All Movies</h2><br/> */}
      <section className='gallery'>
<<<<<<< HEAD
        {
          props.movies.map(movie => {
            return <MovieCard 
              movie={movie} 
              showMoviePage={props.showMoviePage}
          />
        })
      }
=======
        {movieCards}
>>>>>>> master
      </section>
    </main>
  )
}

export default Main