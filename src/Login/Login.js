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

  render() {
    return (
      <div className='login-modal'>
        <input
          type="text"
          name="emailInput"
          placeholder="Email" 
          onChange={this.handleChange}/>
        <input
          type="text"
          name="passwordInput"
          placeholder="Password" 
          onChange={this.handleChange}/>
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
