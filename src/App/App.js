import React, { Component } from 'react'
import './App.scss'
import Header from '../Header/Header'
import Login from '../Login/Login'
import Main from '../Main/Main'
import api from '../API/API'

class App extends Component {
  constructor() {
    super();
    this.state = {
      isLoggedIn: false,
      movies: [],
      showLoginPage: false,
      user: ''
    };
  }

  componentDidMount = async () => {
    try {
      const movies = await api.getAllMovies();
      this.setState({ movies: movies });
    } catch (error) {
      this.setState({ error: error });
    }
  }

  showLoginPage = () => {
    this.setState({showLoginPage: true})
  }

  login = async (loginState) => {
    try {
      const user = await api.postLogin(loginState);
      this.setState({ showLoginPage: false, isLoggedIn: true, user: user });
    } catch (error) {
      this.setState({ error: error.message });
    }
  }

  render() {
    return (
      <div className="App">
        <Header isLoggedIn={this.state.isLoggedIn} showLoginPage={this.showLoginPage} />
        {this.state.showLoginPage 
          ? <Login login={this.login} />
          : <Main movies={this.state.movies} />}
        {this.state.error && <h2>${this.state.error.message}</h2>}
      </div>
    );
  }

  // error component for login, data errors-- modal -- had header, body, buttons to take action
}

export default App