import React, { Component } from 'react'
import './App.scss'
import Header from '../Header/Header'
import Main from '../Main/Main'
import api from '../API/API'

class App extends Component {
  constructor() {
    super();
    this.state = {
      isLoggedIn: false,
      movies: [],
      error: '',
    };
  }

  componentDidMount = async () => {
    try {
      const movies = await api.getAllMovies();
      this.setState({ movies: movies });
    } catch (error) {
      this.setState({ error: 'Oops, something went wrong ☹️' });
    }
  }

  render() {
    return (
      <div className="App">
        <Header isLoggedIn={this.state.isLoggedIn} />
        {this.state.error &&
          <h3 className="error">{this.state.error}</h3>}
        <Main movies={this.state.movies} />
      </div>
    );
  }
}

export default App