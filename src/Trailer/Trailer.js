import React from 'react'
import ReactPlayer from 'react-player/youtube'
import './Trailer.scss'
import PropTypes from "prop-types";

function Trailer({trailer}) {
    return(
      <div className='movie-trailer'>
        <ReactPlayer
          width={350}
          height={200}
          url={`www.youtube.com/watch?v=${trailer.key}`}
        />
      </div>
    )
  }


export default Trailer

Trailer.propTypes = {
 trailer: PropTypes.object,
 error: PropTypes.string,
};