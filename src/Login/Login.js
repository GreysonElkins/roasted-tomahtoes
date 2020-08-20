import React, {component, Component} from 'react'
import './Login.scss'

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
      <div className='login-modal'>
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
        onClick={this.login}>
          Login
        </button>
      </div>
    )
  }

}

export default Login
