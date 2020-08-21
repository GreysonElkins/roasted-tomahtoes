import { render, getByPlaceholderText, screen } from '@testing-library/react'
import React from 'react'
import Login from './Login'
import '@testing-library/jest-dom'

describe('Login', () => {
  beforeEach(() => {
    render(<Login 
    error='Username or password incorrect. Please try again.'
    login={jest.fn()}
    />);
  })

  it('should display email and password inputs', () => {
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument()
  })

  it('should display login button', () => {
    expect(screen.getByText('Login')).toBeInTheDocument()
  })

})