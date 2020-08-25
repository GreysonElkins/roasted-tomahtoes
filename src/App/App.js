import React, { Component } from 'react'
import './App.scss'
import Header from '../Header/Header'
import Login from '../Login/Login'
import Main from '../Main/Main'
import MoviePage from '../MoviePage/MoviePage'
import API from '../API/API'
import Helmet from 'react-helmet'
import { Route } from 'react-router-dom'

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
   trailers: [],
   singleMovieUserRating: {},
   userRatings: []
  };
 }

 componentDidMount = async () => {
  try {
   const movies = await API.getData('movies');
   this.setState({ movies: this.sortMoviesByTitle(movies) });
  } catch (error) {
   this.setState({ error: "Oops, something went wrong! 🙁 Please try again." });
  }
 };

 showLoginPage = () => {
  this.setState({ pageView: "Login", error: '' });
 };

 showHomePage = async () => {
  try {
    const movies = await API.getData('movies')
    if(this.state.isLoggedIn === true) {
      API.getData(`users/${this.state.user.id}/ratings`)
        .then(ratings => {
        this.convertRatingsToStarValues(ratings)
        this.setState({
          movies: this.sortMoviesByTitle(movies),
          userRatings: ratings, 
          pageView: "Home",
          error: ''
        })})
    } else {
      this.setState({ pageView: "Home", error: '', movies: this.sortMoviesByTitle(movies) })
    }
  } catch (error) {
   this.setState({ pageView: "Home", error: error });
  }
 }

 showMoviePage = async (id) => {
  try {
    const movie = await API.getData(`movies/${id}`);
    const rating = this.findMovieUserRating(id)
    const trailers = await API.getData(`movies/${id}/videos`)
    this.setState({ pageView: "MoviePage", singleMovie: movie, singleMovieUserRating: rating, error: "", trailers: trailers });
  } catch (error) {
   this.setState({pageView: "MoviePage", error: error});
  }
 };

 showUserFavoritesPage = async () => {
  if (this.state.userRatings.length === 0) {
      try {
        API.getData(`users/${this.state.user.id}/ratings`)
        .then(data => this.setState({userRatings: data}))
        .then(() => { 
          if (this.state.userRatings.length === 0) {
            this.setState({
              error:`You haven't rated any movies yet! 
                They'll be here when you do`
            })
          } else {
            this.setState({
              movies: this.filterFavoriteMovies(), 
              pageView: 'UserRatings'})
          }
        }) 
      } catch (error) {
         this.setState({
           error: `You haven't rated any movies yet! 
            They'll be here when you do`,
         });
      }
  } else {
    this.setState({movies: this.filterFavoriteMovies(), pageView: 'UserRatings'})
  }
 }

 filterFavoriteMovies = () => {
    const favoriteMovies = this.state.movies.filter(movie => {
      return this.state.userRatings.some(rating => rating.movie_id === movie.id)
    })
    return this.sortByRating(favoriteMovies)
 }

 sortByRating = (movies) => {
   movies.forEach(movie => {
     movie.userRating = this.state.userRatings.find(rating => rating.movie_id === movie.id)
    })
   
   return movies.sort((a, b) => {
    // const aRating = this.findMovieUserRating
    return b.userRating.rating - a.userRating.rating
    // return a.userRating.rating - b.userRating.rating
    })
 }

 findMovieUserRating = (movie_id) => {
    let rating = this.state.userRatings.find(rating => rating.movie_id === movie_id) 
    return rating ? rating : { rating: 0 }
  }  
    // this is doubled in Main.js
 

 showSearchResultsPage = async () => {
  try {
   this.setState({ pageView: "SearchResults" });
   return await API.getData('movies');
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
    fullMovie = await API.getData(`movies/${movie.id}`);
    fullMovie.year = (await fullMovie)
     ? fullMovie.release_date.substring(0, 4)
     : null;
    if (this.checkAllQueriesAgainstMovie(searchQueries, fullMovie)) {
     checkedMovies.push(fullMovie)
    }
    if (checkedMovies.length > 0) {
     this.setState({ movies: this.sortMoviesByTitle(checkedMovies), error: "" });
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

  deleteRating = (ratingID, userID = this.state.user.id) => {
    try {
      API.deleteData(userID, ratingID)
      .then(() => API.getData(`users/${userID}/ratings`))
      .then((ratings) => {
        console.log(ratings)
        this.setState({userRatings: ratings})
        this.showUserFavoritesPage()
      })
    } catch (error) {
      this.setState({
        error: `Sorry, we couldn't delete that
          please try again.`
      })
    }
  }

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

 login = async (loginState) => {
  const response = await API.postData(loginState);
  const user = await response.json();
  if (response.status === 201) {
    API.getData(`users/${user.user.id}/ratings`)
      .then((ratings) => {
        this.convertRatingsToStarValues(ratings)
        this.setState({userRatings: ratings})
      })
      .then(() => {this.setState({
        pageView: "Home",
        isLoggedIn: true,
        user: user.user,
        error: "",
      })})
  } else {
   this.setState({
    error: "Incorrect email or password. Please try again.",
   });
  }
 };

 convertRatingsToStarValues = (ratings) => {
  ratings.forEach((rating) => rating.rating = rating.rating / 2)
 }

 logout = () => {
  this.setState({ pageView: "Home", isLoggedIn: false, user: "" });
 };

 rateMovie = async (rating) => {
  const oldRating = this.state.userRatings.find(oldRating => oldRating.movie_id === rating.movie_id)
  const user = this.state.user.id
    this.removeRating(oldRating, user)
      .then(() => API.postData(rating, user))
      .then(() => API.getData(`users/${this.state.user.id}/ratings`))
      .then((ratings) => {
        this.convertRatingsToStarValues(ratings)
        this.setState({userRatings: ratings})
          if (this.state.singleMovieUserRating !== {}) {
            const newRating = this.findMovieUserRating(
              this.state.singleMovieUserRating.movie_id
              )
              this.setState({singleMovieUserRating: newRating})
          }
      })    
 }

 removeRating = async (oldRating, user) => {
   if (oldRating) {
    return await API.deleteData(user, oldRating.id)
   } 
 }

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
    })
 }

 render() {
  const page = this.state.pageView;
  // const sortedMovies = this.state.movies.sort((a, b) => {
  //  if (a.title < b.title) {
  //   return -1;
  //  }
  //  if (a.title > b.title) {
  //   return 1;
  //  } else {
  //   return 0;
  //  }
  // });
  return (
    <div className="App">
      <Helmet>
        <title>Roasted Tomahtoes</title>
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1"
        ></meta>
      </Helmet>
      <Header
        isLoggedIn={this.state.isLoggedIn}
        logout={this.logout}
        showLoginPage={this.showLoginPage}
        showHomePage={this.showHomePage}
        showUserFavoritesPage={this.showUserFavoritesPage}
        searchMovies={this.searchMovies}
        user={this.state.user}
      />
      <Route 
        exact path ='/'
        render={()=>{
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
        }} />
      <Route 
        exact path ='/login'
        render={() => {
          return <Login login={this.login} error={this.state.error} />
        }}
      />
      {page === "Login" && (
        <Login login={this.login} error={this.state.error} />
      )}
      {(
        // page === "Home" ||
        page === "SearchResults" ||
        page === "UserRatings") && (
        <Main
          // pageView={this.state.pageView}
          isLoggedIn={this.state.isLoggedIn}
          movies={this.state.movies}
          // showMoviePage={this.showMoviePage}
          rateMovie={this.rateMovie}
          userRatings={this.state.userRatings}
          deleteRating={this.deleteRating}
          error={this.state.error}
        />
      )}
      {page === "MoviePage" && (
        <MoviePage
          isLoggedIn={this.state.isLoggedIn}
          movie={this.state.singleMovie}
          error={this.state.error}
          rateMovie={this.rateMovie}
          userRating={this.state.singleMovieUserRating}
          trailers={this.state.trailers}
        />
      )}


      {/* <Route
        exact path='/movies/:id'
        render={({ match }) => {
          const movie = this.state.movies.find(movie => movie.id === +match.params.id)
          const userRating = this.findMovieUserRating(+match.params.id)
          return (<MoviePage 
            isLoggedIn={this.state.isLoggedIn}
            movie={movie}
            error={this.state.error}
            rateMovie={this.rateMovie}
            userRating={userRating}
            trailers={this.state.trailers}
          />)
        }} />  */}
    </div>
  );
 }
}

//login /login
//your ratings /movies/your-ratings
//search = /movies/search-results
//home = /
//moviepage - / movies/:id
export default App