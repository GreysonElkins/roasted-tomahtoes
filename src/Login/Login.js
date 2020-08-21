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
    console.log(typeof this.props.login)
    this.props.login(this.state)
  }

  render() {
    return (
      <div className='login-box'>
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
        {this.props.error && <Error error={this.props.error} />}
        <button 
          id='login-btn'
          onClick={this.login}>
          Login
        </button>
        <h2>R🍅asted<br /> T🍅mahtoes</h2>
        <h4 className='login-message'>Rate Movies. View Trailers. Enjoy Cinema.</h4>
      </div>
    )
  }

}

export default Login

Login.propTypes = {
  error: PropTypes.string,
  login: PropTypes.func
}
