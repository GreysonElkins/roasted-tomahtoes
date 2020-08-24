import React from 'react'
import ReactPlayer from 'react-player'

function Trailer({trailer}) {
  const key = trailer.key
  return(
    <div className='movie-trailer'>
      <ReactPlayer
        url="www.youtube/watch?v=${key}"
      />
    </div>
  )
}

export default Trailer