import { render, getByPlaceholderText } from '@testing-library/react'
import React from 'react'
import Search from './Search'
import '@testing-library/jest-dom'

describe('Search', () => {

 it('should have one button', () => {
  const {getByRole, getByText} = render(<Search />)
  expect(getByRole('button').id).toBe('search-btn')
 });

 it('should have input field', () => {
  const { getByPlaceholderText } = render(<Search />)
  expect(getByPlaceholderText('Search by title, genre, year')).toBeInTheDocument()
 });

});