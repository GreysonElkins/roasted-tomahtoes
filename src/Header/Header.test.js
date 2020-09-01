import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from "react-router-dom";
import '@testing-library/jest-dom'
import Header from './Header'

describe('Header', () => {
beforeEach(() => {
  render(
    <MemoryRouter>
      <Header
        isLoggedIn={false}
        showLoginPage={jest.fn()}
        showHomePage={jest.fn()}
        searchMovies={jest.fn()}
        user={{id:1, name: 'John', email: 'john@turing.io'}}
        logout={jest.fn()}
      />
    </MemoryRouter>
  )
})

  it('should render a header logo', () => {
    expect(screen.getByText('R🍅asted T🍅mahtoes')).toBeInTheDocument()
  })

  it('should render the search bar', () => {
    expect(screen.getByPlaceholderText('Search by title, genre, year')).toBeInTheDocument()
  })

  it('should render five buttons', () => {
    expect(screen.getAllByRole('button')).toHaveLength(1)
    expect(screen.getAllByRole('link')).toHaveLength(4)
    expect(screen.getByRole("button", { name: "Search" })).toBeInTheDocument()
  })
})