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

  render() {
    return (
      <div className="App">
        <Header isLoggedIn={this.state.isLoggedIn} />
        <Main movies={this.state.movies} />
      </div>
    );
  }
}

export default App