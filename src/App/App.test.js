import React from 'react'
import { render, screen, getByPlaceholderText, getByText, waitFor } from '@testing-library/react'
import App from './App'
import API from '../API/API'
// import Header from '../Header/Header'
import '@testing-library/jest-dom'

describe('App', () => {
  beforeEach(() => {
  App.

  render(<App/>)
 })

  it('should start with default login state', () => {
    const defaultApp = new App()
    expect(defaultApp.state.isLoggedIn).toBe(false)
  })

  it('should render header', () => {
    expect(screen.getByPlaceholderText('Search by title, genre, year')).toBeInTheDocument()
  })

  it('should hide some header elements in default state', () => {
    expect(screen.getByText("Your Ratings").className).toBe("hidden");
    expect(screen.getByText('Logout').className).toBe('hidden')
  })

  it('should fetch movies data on load', async () => {
    const movie1 = await waitFor(() => screen.getByText('Akira'))
  })

  //component did mount
  // check that get all movies has been called
  // states change after mount (error / movies) 

})
