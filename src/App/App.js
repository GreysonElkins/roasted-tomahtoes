import React, { Component } from 'react'
import './App.scss'
import Header from '../Header/Header'
import Login from '../Login/Login'
import Main from '../Main/Main'
import HorizontalGallery from '../HorizontalGallery/HorizontalGallery'
import MoviePage from '../MoviePage/MoviePage'
import API from '../API/API'
import { Route, withRouter, NavLink } from 'react-router-dom'
import '../HorizontalGallery/HorizontalGallery.scss'
import loadingTom from '../images/loading-tomato.gif'

const loadingSection = (
  <div className="loading-img">
    <img src={loadingTom} alt="A tomato being inflated, the page is loading" />
    <p>Pardon us while we sort these tomahtoes</p>
  </div>
)

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
      userComments: [],
      userFavorites: [],
      singleMovie: { genres: [] },
      trailers: [],
      singleMovieUserRating: {},
      moviesByCategory: {},
      categoricalGalleries: [loadingSection]
    };
  }
  // ONLOAD and RELOAD
  componentDidMount = async () => {
    try {
      const movies = await API.getData("movies");
      this.setCurrentPage(movies);
    } catch (error) {
      this.setState({
        error: "Oops, something went wrong! 🙁 Please try again.",
      })
    }
  }

  setCurrentPage = (movies) => {
    const currentPage = this.props.history.location.pathname;
    console.log(this.props.history.location.pathname);
    this.setState({ movies: this.sortMoviesByTitle(movies) });
    this.checkIfLoggedIn()
    if (currentPage.includes('/movies/')) {
      const movie_id = currentPage.split('/')[2]
      this.getSingleMovie(movie_id)
    } 
  }
 // USER HANDLING
  checkIfLoggedIn = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      const userRatings = await API.getData(`ratings`, user.id);
      this.getUserFavorites()
      this.convertRatingsToStarValues(userRatings)
      this.setState({
        user: user,
        isLoggedIn: true,
        userRatings: userRatings,
      });
      this.setState({ ratedMovies: this.filterRatedMovies() });
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
    const favoriteMovies = this.state.movies.filter(movie => {
      return userFavIds && userFavIds.includes(movie.id)
    })
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
   this.setState({
    singleMovie: {genres:[]},
    trailers: [],
    singleMovieUserRating: {},
    error: "",
    userComments: [],
   }); 
   const movie = await API.getData(`movies`, movie_id);
   const rating = this.findMovieUserRating(movie_id);
   const trailers = await API.getData(`videos`, movie_id);
   const comments = await API.getData(`comments`, movie_id);
   this.setState({
    singleMovie: movie,
    trailers: trailers,
    singleMovieUserRating: rating,
    error: "",
    userComments: comments,
   });
  } catch (error) {
   this.setState({ error: error });
  }
 };

 submitMovieComment = async (info, movie_id) => {
    API.postData(info, movie_id)
   .then(() => API.getData(`comments`, movie_id))
   .then((comments) => {
    this.setState({ userComments: comments });
   });
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
  
 sortMoviesByTitle = (movies) => {
  return movies.sort((a, b) => {
   if (a.title < b.title) {
    return -1;
   }
   if (a.title > b.title) {
    return 1;
   } else {
    return 0;
   }
  })
 }


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
    fullMovie.year = fullMovie ? fullMovie.release_date.substring(0, 4) : null;
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
          this.convertRatingsToStarValues(ratings)
          this.setState({ userRatings: ratings })
          this.showRatingsPage()
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
  //SORT CATEGORICALLY
  storeMoviesWithAllData = async () => {
    // const allMovies = await API.getData(`movies`)
    // return await allMovies.reduce(async (allMoviesWithData, movie) => {
    return this.state.movies.reduce(async (allMoviesWithData, movie) => {
      const moviesData = await allMoviesWithData
      const newMovie = await API.getData(`movies`, movie.id)
      newMovie && moviesData.push(newMovie)
      return moviesData
    }, Promise.resolve([]))
  }

  findSortingCategories = async (movies, sortValue) => {
      const categories = await movies.reduce(async (categories, movie) => {
          let fetchData = await categories
          const allMovieData = await API.getData(`movies`, movie.id)
          let category = await allMovieData && allMovieData[sortValue]
          if(sortValue === 'release_date' && category) category = category.substring(0, 4)
          // if(allMovieData === undefined) console.log('broken', movie)
          if(category) fetchData = fetchData.concat(category)
          return fetchData
        }, Promise.resolve([]))
  
      let sortCategories = await categories.filter((category, i) => categories.indexOf(category) === i)
      sortValue === 'release_date' 
        && sortCategories.sort((a, b) => +a - +b)
      console.log(sortCategories)
      return sortCategories
  }
  

  sortMoviesByCategory = async (sortValue) => {
    const allMoviesWithData = await this.storeMoviesWithAllData()
    const sortCategories = await this.findSortingCategories(allMoviesWithData, sortValue)
    const sortedMovies = sortCategories.reduce((sortedMovies, category) => {
      sortedMovies[category] = allMoviesWithData.filter(movie => movie[sortValue].includes(category))
      return sortedMovies
    }, {})
    this.setState({moviesByCategory: sortedMovies})
  }

  createCategoricalMovieGalleries = async (category) => {
    this.setState({ categoricalGalleries: loadingSection });
    await this.sortMoviesByCategory(category);
    let galleries = Object.keys(this.state.moviesByCategory);
    category === "release_date" &&
      galleries.sort((a, b) => +b - +a);
    // let categoricalGalleries = []
    const loadedGalleries = galleries.map((gallery, i) => {
      return (
        <HorizontalGallery
          getSingleMovie={this.getSingleMovie}
          key={`${category}-row-${i}`}
          movieSelection={this.state.moviesByCategory[gallery]}
          checkIfFavorite={this.checkIfFavorite}
          toggleFavorite={this.toggleFavorite}
          galleryTitle={galleries[i]}
          isLoggedIn={this.state.isLoggedIn}
          rateMovie={this.rateMovie}
          userRatings={this.state.userRatings}
          deleteRating={this.deleteRating}
        />
      );
      })
    this.setState({ categoricalGalleries: loadedGalleries });
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
              <>
                <span className="spacer"></span>
                <div id="sortByLinks">
                  Sort by:
                  <NavLink
                    to="/sort-by/genres"
                    onClick={() => {
                      this.createCategoricalMovieGalleries("genres");
                    }}
                  >
                    Genre
                  </NavLink>{" "}
                  |
                  <NavLink
                    to="/sort-by/release_date"
                    onClick={() => {
                      this.createCategoricalMovieGalleries("release_date");
                    }}
                  >
                    Year
                  </NavLink>
                </div>
                <Main
                  getSingleMovie={this.getSingleMovie}
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
              </>
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
          render={() => {
            return (
              <MoviePage
                isLoggedIn={this.state.isLoggedIn}
                movie={this.state.singleMovie}
                error={this.state.error}
                checkIfFavorite={this.checkIfFavorite}
                toggleFavorite={this.toggleFavorite}
                rateMovie={this.rateMovie}
                userRating={this.state.singleMovieUserRating}
                trailers={this.state.trailers}
                userComments={this.state.userComments}
                user={this.state.user}
                submitMovieComment={this.submitMovieComment}
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
                getSingleMovie={this.getSingleMovie}
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
          exact path="/user-ratings"
          render={() => {
            let ratingGalleries = []
            for (let i = 5; i > 0; i--) {
              ratingGalleries.push(
                <HorizontalGallery
                  getSingleMovie={this.getSingleMovie}
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
                <span className="spacer"></span>
                <HorizontalGallery
                  getSingleMovie={this.getSingleMovie}
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
              </>
            );
          }}
        />
        <Route 
          exact path="/sort-by/:category"
          render={({ match }) => {
            // this.createCategoricalMovieGalleries(match.params.category)
            return (
              <>
                <span className="spacer"></span>
                <div id="sortByLinks">
                  Sort by:
                  <NavLink
                    to="/sort-by/genres"
                    onClick={() => {
                      this.createCategoricalMovieGalleries("genres");
                    }}
                  >
                    Genre
                  </NavLink>{" "}
                  |
                  <NavLink
                    to="/sort-by/release_date"
                    onClick={() => {
                      this.createCategoricalMovieGalleries("release_date");
                    }}
                  >
                    Year
                  </NavLink>
                </div>
                {this.state.categoricalGalleries}
              </>
            );
          }}
        />
      </div>
    )
  }
}

export default withRouter(App)