import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import Header from './Header'
import '@testing-library/jest-dom'

describe('Header', () => {
let mockLogout, mockShowHomePage, mockShowLoginPage, mockSearchMovies
beforeEach(() => {
  mockLogout = jest.fn()
  mockShowHomePage = jest.fn()
  mockShowLoginPage = jest.fn()
  mockSearchMovies = jest.fn()

  render(
   <Header
    isLoggedIn={false}
    showLoginPage={mockShowLoginPage}
    showHomePage={mockShowHomePage}
    searchMovies={mockSearchMovies}
    user={{id:1, name: 'John', email: 'john@turing.io'}}
    logout={mockLogout}
   />
  )
})

  it('should render the logo', () => {
    expect(screen.getByText('R🍅asted T🍅mahtoes')).toBeInTheDocument()
  })

  it('should render the search bar', () => {
    expect(screen.getByPlaceholderText('Search by title, genre, year')).toBeInTheDocument()
  })

  it('should render five buttons', () => {
    expect(screen.getAllByRole('button')).toHaveLength(5)
    expect(screen.getByRole("button", { name: "Your Ratings" })).toBeInTheDocument()
  })
  
  it('should fire event when Search button is clicked', () => {
      const searchBtn = screen.getByRole("button", { name: "🔍" })
      expect(searchBtn).toBeInTheDocument()
      fireEvent.click(searchBtn)
      expect(mockSearchMovies).toBeCalledTimes(1);
    })
    
  it('should fire event when Login button is clicked', () => {
    const loginBtn = screen.getByRole("button", { name: "Login" })
    expect(loginBtn).toBeInTheDocument()
    fireEvent.click(loginBtn)
    expect(mockShowLoginPage).toBeCalledTimes(1)
  })

  it("should fire event when Logout button is clicked", () => {
    const logoutBtn = screen.getByRole("button", { name: "Logout" })
    expect(logoutBtn).toBeInTheDocument();
    fireEvent.click(logoutBtn);
    expect(mockLogout).toBeCalledTimes(1);
  })

  it("should fire event when Home button is clicked", () => {
   const homeBtn = screen.getByRole("button", { name: "Home" })
   expect(homeBtn).toBeInTheDocument();
   fireEvent.click(homeBtn);
   expect(mockShowHomePage).toBeCalledTimes(1);
  })

  // it("should fire event when My Ratings button is clicked", () => {
  //  const myRatingsBtn = screen.getByRole("button", { name: "My Ratings" });
  //  expect(myRatingsBtn).toBeInTheDocument();
  //  fireEvent.click(myRatingsBtn);

  //  expect(mockShowRatingsPage).toBeCalledTimes(1);
  // });




})