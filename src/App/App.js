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
      userID: ''
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

  login = (event) => {
    event.preventDefault()
    // take the inputs 
    // use post request
    // get returned an id
    // this.setState({showLoginPage: false, isLoggedIn:true, userID: response.id})
    // store that id dynamically
  }


  render() {
   let pageToShow;
   if (this.state.showLoginPage) {
     pageToShow = 
     <Login login={this.login}/>
   } else {
     pageToShow = <Main movies={this.state.movies} />
   }
    return (
      <div className="App">
        <Header isLoggedIn={this.state.isLoggedIn} showLoginPage={this.showLoginPage} />
        {pageToShow}
      </div>
    );
  }
}

export default App