import React, {component, Component} from 'react'
import './Login.scss'

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div className='login-modal'>
        <input
          type="text"
          name="Email-input"
          placeholder="Email" />
        <input
          type="text"
          name="password-input"
          placeholder="Password" />
        <button 
        id='login-btn'
        onClick={this.props.login}>
          Login
        </button>
      </div>
    )
  }

}

export default Login
