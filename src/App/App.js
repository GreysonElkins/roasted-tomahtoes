import React, { Component } from 'react'
import './App.scss'
import Header from '../Header/Header'
import Login from '../Login/Login'
import Main from '../Main/Main'
import HorizontalGallery from '../HorizontalGallery/HorizontalGallery'
import MoviePage from '../MoviePage/MoviePage'
import API from '../API/API'
import { Route, withRouter } from 'react-router-dom'

class App extends Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      ratedMovies: [],
      error: "",
      isLoggedIn: false,
      user: { id: "", email: "", name: "" },
      userRatings: [],
      userFavorites: [],
      singleMovie: { genres: [] },
      trailers: [],
      singleMovieUserRating: {},
    };
  }
  // ONLOAD and RELOAD
  componentDidMount = async () => {
    try {
      const movies = await API.getData("movies");
      this.setState({ movies: this.sortMoviesByTitle(movies) });
      this.setCurrentPage();
    } catch (error) {
      console.log(error)
      this.setState({
        error: "Oops, something went wrong! 🙁 Please try again.",
      });
    }
  };

  setCurrentPage = () => {
    const currentPage = this.props.history.location.pathname;
    this.checkIfLoggedIn().then((user) => {
      this.getUserFavorites()
      if (currentPage === "/") {
        this.setState({ movies: this.sortMoviesByTitle(this.state.movies) });
      } else if (user && currentPage === "/user-ratings") {
        this.showRatingsPage();
      } else {
        this.showHomePage();
        this.props.history.push("/");
      }
      // figure out how to do a single movie page
    });
  };

  checkIfLoggedIn = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      const userRatings = await API.getData(`ratings`, user.id);
      this.convertRatingsToStarValues(userRatings)
      // this.getUserFavorites()
      this.setState({
        user: user,
        isLoggedIn: true,
        userRatings: userRatings,
      });
      return true;
    } else {
      return false;
    }
  };
  // PAGE VIEWS
  showHomePage = async () => {
    try {
      const movies = await API.getData("movies");
        this.setState({ movies: this.sortMoviesByTitle(movies), error: "" });
        this.props.history.push("/");
    } catch (error) {
      this.setState({ error: error });
    }
  };

  showRatingsPage = async () => {
    if (this.state.userRatings.length === 0) {
      this.setState({
        error: `You haven't rated any movies yet! 
        They'll be here when you do`,
        // this should get checked again
      });
    } else {
      this.setState({ ratedMovies: this.filterRatedMovies() });
    }
  };

  getUserFavorites = async () => {
    const userFavIds = await API.getData("favorites", this.state.user.id)
    const favoriteMovies = this.state.movies.filter(movie => userFavIds.includes(movie.id))
    this.setState({ userFavorites: favoriteMovies })
  }
  // USER HANDLING
  login = async (loginState) => {
    const response = await API.postData(loginState);
    const user = await response.json();
    if (response.status === 201) {
      API.getData(`ratings`, user.user.id)
        .then((ratings) => {
          this.convertRatingsToStarValues(ratings);
          this.setState({ userRatings: ratings });
          this.getUserFavorites();
        })
        .then(() => {
          this.setState({
            isLoggedIn: true,
            user: user.user,
            error: "",
          });
          this.showHomePage()
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
    localStorage.removeItem("user");
    this.showHomePage();
  };

  //MOVIE HANDLING and SORTING
  getSingleMovie = async (movie_id) => {
    try {
      const movie = await API.getData(`movies`, movie_id);
      const rating = this.findMovieUserRating(movie_id);
      const trailers = await API.getData(`videos`, movie_id);
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

  findMovieUserRating = (movie_id) => {
    let rating = this.state.userRatings.find(
      (rating) => rating.movie_id === movie_id
    );
    return rating ? rating : { rating: 0 };
  };
  // this is doubled in Main.js

  filterRatedMovies = () => {
    const ratedMovies = this.state.movies.filter((movie) => {
      return this.state.userRatings.some(
        (rating) => rating.movie_id === movie.id
      );
    });
    return this.sortByRating(ratedMovies);
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
  // SEARCH
  searchMovies = async (query) => {
    query = query.toLowerCase();
    const searchQueries = query.split(" ");
    const allMovies = await this.refreshMoviesForSearch();
    const checkedMovies = [];
    await allMovies.forEach(async (movie) => {
      let fullMovie;
      try {
        fullMovie = await API.getData(`movies`, movie.id);
        fullMovie.year = fullMovie
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
  // HANDLE RATING
  rateMovie = async (rating) => {
    const userId = this.state.user.id;
    await this.checkForOldRating(rating, userId)
      .then(() => API.postData(rating, userId))
      .then(() => API.getData(`ratings`, userId))
      .then((ratings) => {
        this.convertRatingsToStarValues(ratings);
        this.setState({ userRatings: ratings });
        this.filterRatedMovies()
        if (this.state.singleMovieUserRating !== {}) {
          const newRating = this.findMovieUserRating(
            this.state.singleMovieUserRating.movie_id
          );
          this.setState({ singleMovieUserRating: newRating });
        }
      });
  };

  checkForOldRating = async (rating, user) => {
    const oldRating = this.state.userRatings.find(
      (oldRating) => oldRating.movie_id === rating.movie_id
    );
    if (oldRating) {
      return await API.deleteData(user, oldRating.id);
    }
  };

  deleteRating = (ratingID, userID = this.state.user.id) => {
    try {
      API.deleteData(userID, ratingID)
        .then(() => API.getData(`ratings`, this.state.user.id))
        .then((ratings) => {
          console.log(ratings);
          this.setState({ userRatings: ratings });
          this.showRatingsPage();
        });
    } catch (error) {
      this.setState({
        error: `Sorry, we couldn't delete that
          please try again.`,
      });
    }
  };

  convertRatingsToStarValues = (ratings) => {
    ratings.forEach((rating) => (rating.rating = rating.rating / 2));
  };
  // HANDLE FAVORITES
  checkIfFavorite = (movie) => {
    return this.state.userFavorites.some(favorite => favorite.id === movie.id)
  }

  toggleFavorite = (movie_id) => {
      const body = {id: movie_id}
      API.postData(body)
        .then(() => this.getUserFavorites())
    
  } 
  // APP
  render() {
    return (
      <div className="App">
        <Header
          isLoggedIn={this.state.isLoggedIn}
          logout={this.logout}
          searchMovies={this.searchMovies}
          user={this.state.user}
          showRatingsPage={this.showRatingsPage}
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
                checkIfFavorite={this.checkIfFavorite}
                toggleFavorite={this.toggleFavorite}
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
                checkIfFavorite={this.checkIfFavorite}
                toggleFavorite={this.toggleFavorite}
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
                checkIfFavorite={this.checkIfFavorite}
                toggleFavorite={this.toggleFavorite}
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
            let ratingGalleries = []
            for (let i = 5; i > 0; i--) {
              ratingGalleries.push(
                <HorizontalGallery
                  movieSelection={this.state.ratedMovies}
                  checkIfFavorite={this.checkIfFavorite}
                  toggleFavorite={this.toggleFavorite}
                  galleryTitle={`${i}-star Movies`}
                  isLoggedIn={this.state.isLoggedIn}
                  rateMovie={this.rateMovie}
                  userRatings={this.state.userRatings}
                  deleteRating={this.deleteRating}
                />
              );
            }

            return (
              <>
                <HorizontalGallery
                  movieSelection={this.state.userFavorites}
                  checkIfFavorite={this.checkIfFavorite}
                  toggleFavorite={this.toggleFavorite}
                  galleryTitle={"favorites"}
                  isLoggedIn={this.state.isLoggedIn}
                  rateMovie={this.rateMovie}
                  userRatings={this.state.userRatings}
                  deleteRating={this.deleteRating}
                />
                {ratingGalleries}
                {/* <Main
                  showDeleteBtns={true}
                  isLoggedIn={this.state.isLoggedIn}
                  checkIfFavorite={this.checkIfFavorite}
                  toggleFavorite={this.toggleFavorite}
                  movies={this.state.ratedMovies}
                  rateMovie={this.rateMovie}
                  userRatings={this.state.userRatings}
                  deleteRating={this.deleteRating}
                  error={this.state.error}
                /> */}
              </>
            );
          }}
        />
      </div>
    );
  }
}

export default withRouter(App)