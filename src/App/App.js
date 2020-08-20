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
      error: '',
      pageView: 'Home',
      user: {id: '', email: '', name: ''}
    };
  }

  componentDidMount = async () => {
    try {
      const movies = await api.getAllMovies();
      this.setState({ movies: movies });
    } catch (error) {
      this.setState({ error: 'Oops, something went wrong! 😟' });
    }
  }

  showLoginPage = () => {
    this.setState({pageView: 'Login'})
  }

  login = async (loginState) => {
    try {
      const user = await api.postLogin(loginState);
      this.setState({ pageView: 'Home', isLoggedIn: true, user: user });
    } catch (error) {
      this.setState({ error: error.message });
    }
  }

  logout = () => {
    this.setState({ pageView: 'Home', isLoggedIn: false, user: '' });
  }

  render() {
    return (
      <div className="App">
        <Header 
          isLoggedIn={this.state.isLoggedIn} 
          pageView={this.pageView} 
          logout={this.logout} 
          showLoginPage={this.showLoginPage}
        />
        {this.state.pageView === 'Login' && <Login login={this.login} />}
        {this.state.pageView === 'Home' && <Main movies={this.state.movies} />}
        {this.state.error && <h2 className='error'>{this.state.error.message}</h2>}
      </div>
    );
  }

  // error component for login, data errors-- modal -- had header, body, buttons to take action
}

export default App