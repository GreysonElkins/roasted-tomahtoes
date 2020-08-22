import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import Header from './Header'

describe('Header', () => {
beforeEach(() => {
  render(
   <Header
    isLoggedIn={false}
    showLoginPage={jest.fn()}
    showHomePage={jest.fn()}
    searchMovies={jest.fn()}
    user={{id:1, name: 'John', email: 'john@turing.io'}}
    logout={jest.fn()}
   />
  )
})

  it('should render a header logo', () => {
    expect(screen.getByText('R🍅asted T🍅mahtoes')).toBeInTheDocument()
  })

  it('should render the search bar', () => {
    expect(screen.getByPlaceholderText('Search by title, genre, year')).toBeInTheDocument()
  })

  it('should render five buttons', () => {
    expect(screen.getAllByRole('button')).toHaveLength(5)
    expect(screen.getByRole("button", { name: "Your Ratings" })).toBeInTheDocument()
  })
})