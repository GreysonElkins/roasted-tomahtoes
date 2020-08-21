import React, { Component } from 'react'
import './App.scss'
import Header from '../Header/Header'
import Login from '../Login/Login'
import Main from '../Main/Main'
import MoviePage from '../MoviePage/MoviePage'
import api from '../API/API'

class App extends Component {
  constructor() {
    super();
    this.state = {
      isLoggedIn: false,
      movies: [],
      error: '',
      pageView: 'Home',
      user: {id: '', email: '', name: ''},
      singleMovie: {}
    };
  }

  componentDidMount = async () => {
    try {
      const movies = await api.getAllMovies();
      this.setState({ movies: movies });
    } catch (error) {
      this.setState({ error: 'Oops, something went wrong! 🙁 Please try again.'});
    }
  }

  showLoginPage = () => {
    this.setState({pageView: 'Login'})
  }
  
  showHomePage = () => {
    this.setState({pageView: 'Home'})
  }

  showMoviePage = async (id) => {
    try {
      const movie = await api.getAMovie(id)
      this.setState({pageView: "MoviePage", singleMovie: movie, error: ''})
      console.log(this.state)
    } catch(error) {
      this.setState({pageView: "MoviePage", error: error})
    }
  }

  login = async (loginState) => {
      const response = await api.postLogin(loginState)
      const user = await response.json()
      if (response.status === 201) {
        this.setState({
          pageView: "Home",
          isLoggedIn: true,
          user: user,
          error: "",
        });
      } else {
        this.setState({
          error: "Incorrect email or password. Please try again.",
        });
      }
  }

  logout = () => {
    this.setState({ pageView: 'Home', isLoggedIn: false, user: '' });
  }

  render() {
    const page = this.state.pageView;
    return (
      <div className="App">
        <Header 
          isLoggedIn={this.state.isLoggedIn} 
          logout={this.logout} 
          showLoginPage={this.showLoginPage}
          showHomePage={this.showHomePage}
          user={this.state.user}
        />
        {page === 'Login' && 
          <Login login={this.login} error={this.state.error}/>}
        {page === 'Home' && 
          <Main 
            movies={this.state.movies} 
            showMoviePage={this.showMoviePage} 
            error={this.state.error}
          />}
        {page === 'MoviePage' && 
          <MoviePage 
          pageView={this.state.pageView}
          movie={this.state.singleMovie}
          error={this.state.error}/>}
      </div>
    );
  }

}

export default App