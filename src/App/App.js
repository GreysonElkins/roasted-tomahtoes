import React, { Component } from 'react'
import './App.scss'
import Header from '../Header/Header'

class App extends Component {
  constructor() {
    super()
    this.state = {isLoggedIn: false}
  }
  
  render() {
    return (
      <div className="App">
        <Header isLoggedIn={this.state.isLoggedIn}/>
      </div>
    )
  }
}


export default App
