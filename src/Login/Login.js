import React, { Component } from "react";
import "./Login.scss";
import Error from "../Error/Error";
import PropTypes from "prop-types";
// import { NavLink } from 'react-router-dom'

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  login = (event) => {
    event.preventDefault();
    return this.props.login(this.state);
  };

  render() {
    return (
      <form className="login-box" onSubmit={this.login}>
        <input
          aria-label="email-input"
          type="text"
          name="email"
          placeholder="Email"
          onChange={this.handleChange}
        />
        <input
          aria-label="password-input"
          type="password"
          name="password"
          placeholder="Password"
          onChange={this.handleChange}
        />
        <button className="login-btn">Login</button>
        {this.props.error && <Error error={this.props.error} />}
        <h2 className="logo-login">
          R🍅asted
          <br /> T🍅mahtoes
        </h2>
        <h4 className="logo-message">
          Rate Movies. View Trailers. Enjoy Cinema.
        </h4>
      </form>
    );
  }
}

export default Login;

Login.propTypes = {
  error: PropTypes.string,
  login: PropTypes.func,
};
