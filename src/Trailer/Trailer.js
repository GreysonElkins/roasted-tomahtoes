import React from "react";
import ReactPlayer from "react-player/youtube";
import PropTypes from "prop-types";
import "./Trailer.scss";

function Trailer({ trailer }) {
  return (
    <div className="movie-trailer" alt="movie trailer">
      <ReactPlayer
        alt="movie trailer"
        width={350}
        height={250}
        url={`www.youtube.com/watch?v=${trailer.key}`}
      />
    </div>
  );
}

export default Trailer;

Trailer.propTypes = {
  trailer: PropTypes.object,
  error: PropTypes.string,
};
