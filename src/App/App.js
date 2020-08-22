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
   error: "",
   pageView: "Home",
   user: { id: "", email: "", name: "" },
   singleMovie: {},
  };
 }

 componentDidMount = async () => {
  try {
   const movies = await api.getAllMovies();
   this.setState({ movies: movies });
  } catch (error) {
   this.setState({ error: "Oops, something went wrong! 🙁 Please try again." });
  }
 };

 showLoginPage = () => {
  this.setState({ pageView: "Login", error: '' });
 };

 login = async (loginState) => {
  const response = await api.postLogin(loginState);
  const user = await response.json();
  if (response.status === 201) {
   this.setState({
    pageView: "Home",
    isLoggedIn: true,
    user: user.user,
    error: "",
   });
  } else {
   this.setState({
    error: "Incorrect email or password. Please try again.",
   });
  }
 };

 logout = () => {
  this.setState({ pageView: "Home", isLoggedIn: false, user: "", error: ''});
 };

 showHomePage = async () => {
  try {
   const movies = await api.getAllMovies();
   this.setState({ movies });
   this.setState({ pageView: "Home", error: '' });
  } catch (error) {
   this.setState({ pageView: "Home", error: error });
  }
 };

 showMoviePage = async (id) => {
  try {
   const movie = await api.getAMovie(id);
   this.setState({ pageView: "MoviePage", singleMovie: movie, error: "" });
  } catch (error) {
   this.setState({pageView: "MoviePage", error: "No movie was found. Please try again."});
  }
 };

 showSearchResultsPage = async () => {
  try {
   this.setState({ pageView: "SearchResults" });
   return await api.getAllMovies();
  } catch (error) {
   this.setState({pageView: "SearchResults", error: "No movies were found. Please refine your search.",
   });
  }
 };

 searchMovies = async (query) => {
  query = query.toLowerCase();
  const searchQueries = query.split(" ");
  const allMovies = await this.showSearchResultsPage();
  const checkedMovies = [];
  await allMovies.forEach(async (movie) => {
   let fullMovie;
   try {
    fullMovie = await api.getAMovie(movie.id);
    fullMovie.year = (await fullMovie)
     ? fullMovie.release_date.substring(0, 4)
     : null;
    if (this.checkAllQueriesAgainstMovie(searchQueries, fullMovie)) {
     checkedMovies.push(fullMovie)
    }
    if (checkedMovies.length > 0) {
     this.setState({ movies: checkedMovies, error: "" });
    } else {
     this.setState({movies: checkedMovies, error: "No movies were found. Please refine your search."});
    }
   } catch (error) {
    this.setState({error: "No movies were found. Please refine your search."});
   }
  });
 };

 checkAllQueriesAgainstMovie(searchQueries, movie) {
  movie = Object.values(movie);
  let movieInfo = this.changeDataToLowerCase(movie);
  if (
   searchQueries.every((query) =>
    movieInfo.some(
     (movieDetail) => isNaN(movieDetail) && movieDetail.includes(query)
    )
   )
  ) {
   return true;
  }
 }

 changeDataToLowerCase(data) {
  let args = data;
  let changedData = [];
  args.map((info) => {
   if (isNaN(info) && Array.isArray(info) === false) {
    changedData.push(info.toLowerCase());
   } else if (Array.isArray(info)) {
    changedData = changedData.concat(this.changeDataToLowerCase(info));
   } else {
    changedData.push(info);
   }
  });
  return changedData;
 }

 render() {
  const page = this.state.pageView;
  const sortedMovies = this.state.movies.sort((a, b) => {
   if (a.title < b.title) {
    return -1;
   }
   if (a.title > b.title) {
    return 1;
   } else {
    return 0;
   }
  });
  return (
   <div className="App">
    <Header
     isLoggedIn={this.state.isLoggedIn}
     logout={this.logout}
     showLoginPage={this.showLoginPage}
     showHomePage={this.showHomePage}
     searchMovies={this.searchMovies}
     user={this.state.user}
    />
    {page === "Login" && <Login login={this.login} error={this.state.error} />}
    {(page === "Home" || page === "SearchResults") && (
     <Main
      isLoggedIn={this.state.isLoggedIn}
      movies={sortedMovies}
      showMoviePage={this.showMoviePage}
      error={this.state.error}
     />
    )}
    {page === "MoviePage" && (
     <MoviePage
      isLoggedIn={this.state.isLoggedIn}
      movie={this.state.singleMovie}
      error={this.state.error}
     />
    )}
   </div>
  );
 }
}

export default App