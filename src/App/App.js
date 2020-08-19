import React, { Component } from 'react'
import './App.scss'
import Header from '../Header/Header'

class App extends Component {
  constructor() {
    super()
    this.state = {}
  }

  App() {
    return (
      <div className="App">
        <Header />
      </div>
    )
  }
}


export default App
