import React, { Component } from 'react'
import api from'../API/API'

const Main = (props) => {
  return (
    <div className="gallery">
      {props.movies.map(movie => {
        return <div>{movie.title}</div>
      })}
    </div>
  )
}

export default Main