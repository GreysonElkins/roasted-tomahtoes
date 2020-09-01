import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from "react-router-dom";
import React from 'react'
import Nav from './Nav'
import '@testing-library/jest-dom'

describe('Nav', () => {
  let mockLogout, mockShowHomePage, mockShowLoginPage, mockSearchMovies
 beforeEach(() => {
     mockLogout = jest.fn();
     mockShowHomePage = jest.fn();
     mockShowLoginPage = jest.fn();
     mockSearchMovies = jest.fn();
    render(
    <MemoryRouter>
      <Nav
        isLoggedIn={true}
        searchMovies={mockSearchMovies}
        showLoginPage={mockShowLoginPage}
        showHomePage={mockShowHomePage}
        user={{id:1, name: 'John', email: 'john@turing.io' }}
        logout={mockLogout}
      />
    </MemoryRouter>
    );
  })

  it('should display a Home link', () => {
   expect(screen.getByRole('link', {name:'Home'})).toBeInTheDocument()
  });

  it('should display a Your Ratings link', () => {
   expect(screen.getByRole('link', {name:'Your Ratings'})).toBeInTheDocument()
  });

  it('should display a Login link', () => {
    expect(screen.getByRole('link', {name:'Login'})).toBeInTheDocument()
  });

  it('should display a Logout link', () => {
   expect(screen.getByRole('link', {name:'Logout'})).toBeInTheDocument()
  });
  
  it('should greet the user after log in',() => {
    expect(screen.getByText('Welcome, John!')).toBeInTheDocument();
  })
  
  it("should fire event when Home link is clicked", () => {
   const homeBtn = screen.getByRole("link", { name: "Home" })
   expect(homeBtn).toBeInTheDocument();
   fireEvent.click(homeBtn);
   expect(mockShowHomePage).toBeCalledTimes(1);
  })

  it("should fire event when Logout link is clicked", () => {
    const logoutBtn = screen.getByRole("link", { name: "Logout" })
    expect(logoutBtn).toBeInTheDocument();
    fireEvent.click(logoutBtn);
    expect(mockLogout).toBeCalledTimes(1);
  })


  // it("should fire event when My Ratings button is clicked", () => {
  //  const myRatingsBtn = screen.getByRole("button", { name: "My Ratings" });
  //  expect(myRatingsBtn).toBeInTheDocument();
  //  fireEvent.click(myRatingsBtn);

  //  expect(mockShowRatingsPage).toBeCalledTimes(1);
  // });

})