import React from 'react'
import ReactPlayer from 'react-player'
import './Trailer.scss'

function Trailer({trailer}) {
    return(
      <div className='movie-trailer'>
        <ReactPlayer
          url={`www.youtube/watch?v=${trailer.key}`}
        />
      </div>
    )
  }


export default Trailer