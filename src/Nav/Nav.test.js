import { render } from '@testing-library/react'
import React from 'react'
import Nav from './Nav'
import '@testing-library/jest-dom'

describe('Nav', () => {
  let nav, buttons, getByText
  beforeEach(() => {
    nav = render(<Nav />)
    buttons = nav.getAllByRole('button')
    getByText = text => nav.getByText(text)
  })

  it('should have four buttons', () => {
    expect(buttons.length).toBe(4)
  })

  it('should have a Home button', () => {
   expect(getByText('Home')).toBeInTheDocument()
   expect(buttons[0].id).toBe('home-btn')
  });

  it('should have a Your Ratings button', () => {
   expect(getByText('Your Ratings')).toBeInTheDocument()
   expect(buttons[1].id).toBe('ratings-header-btn')
  });

  it('should have a Login button', () => {
    expect(getByText('Login')).toBeInTheDocument()
    expect(buttons[2].id).toBe('login-btn');
  });

  it('should have a Logout button', () => {
   expect(getByText('Logout')).toBeInTheDocument()
   expect(buttons[3].id).toBe('logout-btn');
  });



})