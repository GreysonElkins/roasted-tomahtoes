import React from 'react'
import { render, getByPlaceholderText } from '@testing-library/react'
import App from './App'
import '@testing-library/jest-dom'

describe('App', () => {

  it('should extend Component', () => {
    
  })

  it('should render header', () => {
    const {getByPlaceholderText} = render(<App/>)
    expect(getByPlaceholderText('Search by title, genre, year')).toBeInTheDocument()
  })

})
