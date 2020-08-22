import { render, getByPlaceholderText, getByText, screen, fireEvent } from '@testing-library/react'
import React from 'react'
import Login from './Login'
import '@testing-library/jest-dom'

describe('Login', () => {
  let mockLoginTest
  beforeEach(() => {
    mockLoginTest = jest.fn()
    render(<Login 
    error='Username or password incorrect. Please try again.'
    login={mockLoginTest}
    />);
  })

  it('should render a login page', () => {
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument()
    expect(screen.getByRole('button')).toBeInTheDocument()
    expect(screen.getByText("R🍅asted T🍅mahtoes")).toBeInTheDocument();
    expect(screen.getByText('Rate Movies. View Trailers. Enjoy Cinema.')).toBeInTheDocument()
  })
  
  it('should fire an event when login button is clicked', () => {
    const button = screen.getByRole('button', {name: 'Login'})
    fireEvent.click(button)
    expect(mockLoginTest).toBeCalledTimes(1)
  })

})