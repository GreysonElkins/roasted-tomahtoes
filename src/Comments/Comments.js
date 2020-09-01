import React, { Component } from 'react'
import './Comments.scss'
import PropTypes from 'prop-types'
import Error from '../Error/Error'

class Comments extends Component {
 constructor(props) {
  super(props);
  this.state = { 
    comment: '',
    author: props.user.name,
  };
 }

 handleChange = (event) => {
  this.setState({ comment: event.target.value });
 };


 displayComments = () => {
   return this.props.userComments.map((comment, i) => {
    return (
        <p className='user-comment'key={`comment-${i}`}> "{comment.comment}"<br/>
        <i>-{comment.author}</i> 
        </p>
    )
   })
 }
 
 submitMovieComment = (event) => { 
   event.preventDefault();
   this.props.submitMovieComment(this.state, this.props.movie.id)
   this.setState({comment: ''})
  }


 render() {
  return (
   <section className="comment-section">
    {this.props.error && <Error error={this.props.error} />}
    {this.props.userComments.length > 0 && (
      <div className='comment-box'>
        {this.displayComments()}
      </div>
    )}  
    {this.props.isLoggedIn && (
     <form className="comment-form" onSubmit={this.submitMovieComment}>
      <input
       aria-label="comment-input"
       name="comment"
       type='text'
       placeholder="Add movie comment (140 chars)"
       onChange={this.handleChange}
       value={this.state.comment}
       maxLength="140"
      />
      <button className="comment-btn">Submit</button>
     </form>
    )}
   </section>
  );
 }
}

export default Comments

Comments.prototypes = {
  error: PropTypes.string,
  user: PropTypes.object,
  isLoggedIn: PropTypes.bool,
  userComments: PropTypes.array,
  submitMovieComment: PropTypes.func
}
