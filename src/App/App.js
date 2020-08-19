import React, { Component } from 'react'
import './App.scss'
import Header from '../Header/Header'
import Main from '../Main/Main'

class App extends Component {
  constructor() {
    super()
    this.state = {isLoggedIn: false}
  }
  
  render() {
    return (
      <div className="App">
        <Header isLoggedIn={this.state.isLoggedIn}/>
        <Main />
      </div>
  
  }
}


export default App
