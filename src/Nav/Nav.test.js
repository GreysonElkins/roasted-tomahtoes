import { render } from '@testing-library/react'
import React from 'react'
import Nav from './Nav'
import '@testing-library/jest-dom'

describe('Nav', () => {

  it("should have a home button", () => {
   const { getByText } = render(<Nav />);
   expect(getByText("Home")).toBeInTheDocument();
  });

  it("should have a Your Ratings button", () => {
   const { getByText } = render(<Nav />);
   expect(getByText("Your Ratings")).toBeInTheDocument();
  });

  it('should have a Login button', () => {
    const { getByText } = render(<Nav />)
    expect(getByText('Login')).toBeInTheDocument()
  });

  it("should have a logout button", () => {
   const { getByText } = render(<Nav />);
   expect(getByText("Logout")).toBeInTheDocument();
  });



})