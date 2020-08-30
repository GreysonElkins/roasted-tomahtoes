import React from 'react'
import moment from 'moment'
import './Comments.scss'
import PropTypes from 'prop-types'
import Error from '../Error/Error'

const Comments = ({userComments, isLoggedIn, error}) => {
  const comments = userComments.map(comment => {
    return (
      <p><b>{comment.author}:</b> {comment.comment}</p>)
  })
  return (
   <section className="comment-section">
    {error && <Error error={error} />}
    {comments}
    {isLoggedIn && (
     <form className="comment-form">
      <input
       aria-label="comment-input"
      //  type="password"
       name="comment"
       placeholder="Password"
      //  onChange={this.handleChange}
      />
      <button className="comment-btn">Submit Comment</button>
     </form>
    )}
   </section>
  );
}


export default Comments