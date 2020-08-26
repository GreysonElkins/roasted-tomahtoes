import React, { Component } from 'react'
import './App.scss'
import Header from '../Header/Header'
import Login from '../Login/Login'
import Main from '../Main/Main'
import MoviePage from '../MoviePage/MoviePage'
import API from '../API/API'
import { Route, withRouter } from 'react-router-dom'

class App extends Component {
 constructor() {
  super();
  this.state = {
   isLoggedIn: false,
   movies: [],
   error: "",
   user: { id: "", email: "", name: "" },
   singleMovie: { genres: [] },
   trailers: [],
   singleMovieUserRating: {},
   userRatings: [],
  };
 }

 componentDidMount = async () => {
  this.checkLoggedIn() 
  try {
   const movies = await API.getData("movies");
   this.setState({ movies: this.sortMoviesByTitle(movies) });
  } catch (error) {
   this.setState({ error: "Oops, something went wrong! 🙁 Please try again." });
  }
 };

 checkLoggedIn = async () => {
   const user = JSON.parse(localStorage.getItem('user'))
   if (user) {
     const userRatings = await API.getData(`users/${user.id}/ratings`)
     const ratings = this.convertRatingsToStarValues(userRatings) 
     this.setState({user: user, isLoggedIn: true, userRatings: ratings})
   }
 }

 showHomePage = async () => {
  try {
   const movies = await API.getData("movies");
   if (this.state.isLoggedIn === true) {
    API.getData(`users/${this.state.user.id}/ratings`).then((ratings) => {
     this.convertRatingsToStarValues(ratings);
     this.setState({
      movies: this.sortMoviesByTitle(movies),
      userRatings: ratings,
      error: "",
     });
    });
   } else {
    this.setState({ error: "", movies: this.sortMoviesByTitle(movies) });
   }
  } catch (error) {
   this.setState({ error: error });
  }
 };

 showLoginPage = () => {
  this.setState({ error: '' });
 };

 login = async (loginState) => {
  const response = await API.postData(loginState);
  const user = await response.json();
  if (response.status === 201) {
   API.getData(`users/${user.user.id}/ratings`)
    .then((ratings) => {
     this.convertRatingsToStarValues(ratings);
     this.setState({ userRatings: ratings });
    })
    .then(() => {
     this.props.history.push("/");
     this.setState({
      isLoggedIn: true,
      user: user.user,
      error: "",
     });
     localStorage.setItem(`user`, JSON.stringify(this.state.user));
    });
  } else {
   this.setState({
    error: "Incorrect email or password. Please try again.",
   });
  }
 };

 logout = () => {
  this.setState({ isLoggedIn: false, user: "" });
  localStorage.removeItem('user');
  this.showHomePage();
 };

 getSingleMovie = async (id) => {
  try {
   const movie = await API.getData(`movies/${id}`);
   const rating = this.findMovieUserRating(id);
   const trailers = await API.getData(`movies/${id}/videos`);
   this.setState({
    singleMovie: movie,
    trailers: trailers,
    singleMovieUserRating: rating,
    error: "",
   });
  } catch (error) {
   this.setState({ error: error });
  }
 };

 showUserFavoritesPage = async () => {
  if (this.state.userRatings.length === 0) {
   try {
    API.getData(`users/${this.state.user.id}/ratings`)
     .then((data) => this.setState({ userRatings: data }))
     .then(() => {
      if (this.state.userRatings.length === 0) {
       this.setState({
        error: `You haven't rated any movies yet! 
                They'll be here when you do`,
       });
      } else {
       this.setState({ movies: this.filterFavoriteMovies() });
      }
     });
   } catch (error) {
    this.setState({
     error: `You haven't rated any movies yet! 
            They'll be here when you do`,
    });
   }
  } else {
   this.setState({ movies: this.filterFavoriteMovies() });
  }
 };

 filterFavoriteMovies = () => {
  const favoriteMovies = this.state.movies.filter((movie) => {
   return this.state.userRatings.some((rating) => rating.movie_id === movie.id);
  });
  return this.sortByRating(favoriteMovies);
 };

 sortByRating = (movies) => {
  movies.forEach((movie) => {
   movie.userRating = this.state.userRatings.find(
    (rating) => rating.movie_id === movie.id
   );
  });
  return movies.sort((a, b) => {
   return b.userRating.rating - a.userRating.rating;
  });
 };

 findMovieUserRating = (movie_id) => {
  let rating = this.state.userRatings.find(
   (rating) => rating.movie_id === movie_id
  );
  return rating ? rating : { rating: 0 };
 };
 // this is doubled in Main.js

 refreshMoviesForSearch = async () => {
  try {
   this.setState({ pageView: "SearchResults" });
   return await API.getData("movies");
  } catch (error) {
   this.setState({
    pageView: "SearchResults",
    error: "No movies were found. Please refine your search.",
   });
  }
 };

 searchMovies = async (query) => {
  query = query.toLowerCase();
  const searchQueries = query.split(" ");
  const allMovies = await this.refreshMoviesForSearch();
  const checkedMovies = [];
  await allMovies.forEach(async (movie) => {
   let fullMovie;
   try {
    fullMovie = await API.getData(`movies/${movie.id}`);
    fullMovie.year = (await fullMovie)
     ? fullMovie.release_date.substring(0, 4)
     : null;
    if (this.checkAllQueriesAgainstMovie(searchQueries, fullMovie)) {
     checkedMovies.push(fullMovie);
    }
    if (checkedMovies.length > 0) {
     this.setState({
      movies: this.sortMoviesByTitle(checkedMovies),
      error: "",
     });
     this.props.history.push("/search-results");
    } else {
     this.setState({
      movies: checkedMovies,
      error: "No movies were found. Please refine your search.",
     });
     this.props.history.push("/search-results");
    }
   } catch (error) {
    this.setState({
     error: "No movies were found. Please refine your search.",
    });
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

 deleteRating = (ratingID, userID = this.state.user.id) => {
  try {
   API.deleteData(userID, ratingID)
    .then(() => API.getData(`users/${userID}/ratings`))
    .then((ratings) => {
     console.log(ratings);
     this.setState({ userRatings: ratings });
     this.showUserFavoritesPage();
    });
  } catch (error) {
   this.setState({
    error: `Sorry, we couldn't delete that
          please try again.`,
   });
  }
 };

 changeDataToLowerCase(data) {
  let args = data;
  let changedData = [];
  args.forEach((info) => {
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

 convertRatingsToStarValues = (ratings) => {
  ratings.forEach((rating) => (rating.rating = rating.rating / 2));
 };

 rateMovie = async (rating) => {
  const oldRating = this.state.userRatings.find(
   (oldRating) => oldRating.movie_id === rating.movie_id
  );
  const user = this.state.user.id;
  this.removeRating(oldRating, user)
   .then(() => API.postData(rating, user))
   .then(() => API.getData(`users/${this.state.user.id}/ratings`))
   .then((ratings) => {
    this.convertRatingsToStarValues(ratings);
    this.setState({ userRatings: ratings });
    if (this.state.singleMovieUserRating !== {}) {
     const newRating = this.findMovieUserRating(
      this.state.singleMovieUserRating.movie_id
     );
     this.setState({ singleMovieUserRating: newRating });
    }
   });
 };

 removeRating = async (oldRating, user) => {
  if (oldRating) {
   return await API.deleteData(user, oldRating.id);
  }
 };

 sortMoviesByTitle(movies) {
  return movies.sort((a, b) => {
   if (a.title < b.title) {
    return -1;
   }
   if (a.title > b.title) {
    return 1;
   } else {
    return 0;
   }
  });
 }

 render() {
  return (
   <div className="App">
    <Header
     isLoggedIn={this.state.isLoggedIn}
     logout={this.logout}
     searchMovies={this.searchMovies}
     user={this.state.user}
     showUserFavoritesPage={this.showUserFavoritesPage}
     showHomePage={this.showHomePage}
    />
    <Route
     exact
     path="/"
     render={() => {
      return (
       <Main
        showDeleteBtns={false}
        isLoggedIn={this.state.isLoggedIn}
        movies={this.state.movies}
        rateMovie={this.rateMovie}
        userRatings={this.state.userRatings}
        deleteRating={this.deleteRating}
        error={this.state.error}
       />
      );
     }}
    />
    <Route
     exact
     path="/login"
     render={() => {
      return <Login login={this.login} error={this.state.error} />;
     }}
    />
    <Route
     exact
     path="/movies/:id"
     render={({ match }) => {
      this.getSingleMovie(+match.params.id);
      return (
       <MoviePage
        isLoggedIn={this.state.isLoggedIn}
        movie={this.state.singleMovie}
        error={this.state.error}
        rateMovie={this.rateMovie}
        userRating={this.state.singleMovieUserRating}
        trailers={this.state.trailers}
       />
      );
     }}
    />
    <Route
     exact
     path="/search-results"
     render={() => {
      return (
       <Main
        isLoggedIn={this.state.isLoggedIn}
        movies={this.state.movies}
        rateMovie={this.rateMovie}
        userRatings={this.state.userRatings}
        deleteRating={this.deleteRating}
        error={this.state.error}
       />
      );
     }}
    />
    <Route
     exact
     path="/user-ratings"
     render={() => {
      return (
       <Main
        showDeleteBtns={true}
        isLoggedIn={this.state.isLoggedIn}
        movies={this.state.movies}
        rateMovie={this.rateMovie}
        userRatings={this.state.userRatings}
        deleteRating={this.deleteRating}
        error={this.state.error}
       />
      );
     }}
    />
   </div>
  );
 }
}

export default withRouter(App)