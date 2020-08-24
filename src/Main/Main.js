import React from 'react'
import MovieCard from '../MovieCard/MovieCard'
import './Main.scss'
import Error from '../Error/Error'
import PropTypes from "prop-types"

const Main = ({error, movies, showMoviePage, isLoggedIn}) => {
  const movieCards = movies.map(movie => {
      return <MovieCard 
        movie={movie} 
        showMoviePage={showMoviePage}
        isLoggedIn={isLoggedIn}
    />
  })
  return (
    <main>
      {error && <Error error={error} />}
      <section className='gallery'>
        {movieCards}
      </section>
    </main>
  )
}

export default Main

Main.propTypes = {
  error: PropTypes.string,
  movies: PropTypes.array,
  showMoviePage: PropTypes.func
}