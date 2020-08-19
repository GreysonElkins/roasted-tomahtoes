import React from 'react'
import { render, getByPlaceholderText, getAllByRole } from '@testing-library/react'
import App from './App'
import Header from '../Header/Header'
import '@testing-library/jest-dom'

describe('App', () => {

  it('should start with default login state', () => {
    const defaultApp = new App()
    expect(defaultApp.state.isLoggedIn).toBe(false)
  })

  it('should render header', () => {
    const {getByPlaceholderText} = render(<App />)
    expect(getByPlaceholderText('Search by title, genre, year')).toBeInTheDocument()
  })

  it('should hide some header elements in default state', () => {
    const {getByText} = render(<App/>)
    expect(getByText("Your Ratings").className).toBe("hidden");
    expect(getByText('Logout').className).toBe('hidden')
  })

  //component did mount
  // check that get all movies has been called
  // states change after mount (error / movies) 

})
