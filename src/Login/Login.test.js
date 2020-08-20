import { render, getByPlaceholderText } from '@testing-library/react'
import React from 'react'
import Login from './Login'
import '@testing-library/jest-dom'

describe('Login', () => {
  it('should display email and password inputs', () => {
    const {getByPlaceholderText} = render(<Login/>)
    expect(getByPlaceholderText('Email')).toBeInTheDocument()
    expect(getByPlaceholderText('Password')).toBeInTheDocument()
  })

  it('should display login button', () => {
    const {getByText} = render(<Login />)
    expect(getByText('Login')).toBeInTheDocument()
  })

})