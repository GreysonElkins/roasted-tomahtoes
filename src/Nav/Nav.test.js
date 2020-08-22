import { render, screen, fireEvent } from '@testing-library/react'
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
    render(<Nav
    isLoggedIn={true}
    searchMovies={mockSearchMovies}
    showLoginPage={mockShowLoginPage}
    showHomePage={mockShowHomePage}
    user={{id:1, name: 'John', email: 'john@turing.io' }}
    logout={mockLogout}
    />);
  })

  it('should display a Home button', () => {
   expect(screen.getByRole('button', {name:'Home'})).toBeInTheDocument()
  });

  it('should display a Your Ratings button', () => {
   expect(screen.getByRole('button', {name:'Your Ratings'})).toBeInTheDocument()
  });

  it('should display a Login button', () => {
    expect(screen.getByRole('button', {name:'Login'})).toBeInTheDocument()
  });

  it('should display a Logout button', () => {
   expect(screen.getByRole('button', {name:'Logout'})).toBeInTheDocument()
  });
  
  it('should greet the user after log in',() => {
    expect(screen.getByText('Welcome, John!')).toBeInTheDocument();
  })
  
  it("should fire event when Home button is clicked", () => {
   const homeBtn = screen.getByRole("button", { name: "Home" })
   expect(homeBtn).toBeInTheDocument();
   fireEvent.click(homeBtn);
   expect(mockShowHomePage).toBeCalledTimes(1);
  })

  it("should fire event when Login button is clicked", () => {
   const loginBtn = screen.getByRole("button", { name: "Login" });
   expect(loginBtn).toBeInTheDocument();
   fireEvent.click(loginBtn);
   expect(mockShowLoginPage).toBeCalledTimes(1);
  });


  it("should fire event when Logout button is clicked", () => {
    const logoutBtn = screen.getByRole("button", { name: "Logout" })
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