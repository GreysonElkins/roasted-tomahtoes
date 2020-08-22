import { render, screen } from '@testing-library/react'
import React from 'react'
import Nav from './Nav'
import '@testing-library/jest-dom'

describe('Nav', () => {
 beforeEach(() => {
    render(<Nav
    isLoggedIn={true}
    showLoginPage={jest.fn()}
    showHomePage={jest.fn()}
    user={{id:1, name: 'John', email: 'john@turing.io' }}
    logout={jest.fn()}
    />);
  })
  
  it('should have four buttons', () => {
    const buttons = screen.getAllByRole('button')
    expect(buttons).toHaveLength(4)
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

})