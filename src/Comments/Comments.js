import React from 'react'
import moment from 'moment'
import './Comments.scss'
import PropTypes from 'prop-types'

const Comments = ({userComments, isLoggedIn}) => {
  // const comments = userComments.map(comment => {
  //   return (<div>
  //     <p></p><b>comment.user:</b> comment.comment
  //   </div>)
  // })
  return (
   <section className="comment-section">
    <p>
     <b>JohnDoe:</b> This movie is awesome!
    </p>
    <p>
     <b>JohnDoe:</b> This movie is awesome!
    </p>
    <p>
     <b>JohnDoe:</b> This movie is awesome!
    </p>
   </section>
  );
}


export default Comments