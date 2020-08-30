import React, { Component } from 'react'
import moment from 'moment'
import './Comments.scss'
import PropTypes from 'prop-types'
import Error from '../Error/Error'

class Comments extends Component {
 constructor(props) {
  super(props);
  this.state = { newComment: {} };
 }

 handleChange = (event) => {
  this.setState({ newComment: event.target.value });
 };

 getComments = () => {
   this.props.userComments.map((comment) => {
    return (
     <p>
      <b>{comment.author}:</b> {comment.comment}
     </p>
    );
   });
 } 


 render() {
  return (
   <section className="comment-section">
    {this.props.error && <Error error={this.props.error} />}
    {this.getComments()}
    {this.props.isLoggedIn && (
     <form className="comment-form" onSubmit={this.submitComment}>
      <input
       aria-label="comment-input"
       name="comment"
       type='text'
       placeholder="Add movie comment"
       onChange={this.handleChange}
       max="140"
      />
      <button className="comment-btn">Submit</button>
     </form>
    )}
   </section>
  );
 }
}

export default Comments