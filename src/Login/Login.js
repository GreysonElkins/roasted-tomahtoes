import React, {Component} from 'react'
import './Login.scss'
import Error from '../Error/Error'
import PropTypes from "prop-types"

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      emailInput: '',
      passwordInput: ''
    }
  }

  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value})
  }

  login = (event) => {
    event.preventDefault()
    this.props.login(this.state)
  }

  render() {
    return (
      <form className='login-box' onSubmit={this.login}>
        <input
          aria-label='email-input'
          type="text"
          name="emailInput"
          placeholder="Email" 
          onChange={this.handleChange}/>
        <input
          aria-label='password-input'
          type="password"
          name="passwordInput"
          placeholder="Password" 
          onChange={this.handleChange}/>
        <button 
          id='login-btn'
          type='submit'>
          Login
        </button>
          {this.props.error && <Error error={this.props.error} />}
        {/* <h2 className='logo-login'>R🍅asted<br /> T🍅mahtoes</h2>
        <h4 className='logo-message'>Rate Movies. View Trailers. Enjoy Cinema.</h4> */}
      </form>
    )
  }

}

export default Login

Login.propTypes = {
  error: PropTypes.string,
  login: PropTypes.func
}
