import React from 'react'
import { render } from '@testing-library/react'
import Header from './Header'
import Search from '../Search/Search'
import Nav from '../Nav/Nav'
import '@testing-library/jest-dom'

describe('Header', () => {

  it('should render the logo', () => {
    const {getByText} = render(<Header />)
    expect(getByText('🍅 Roasted Tomahtoes')).toBeInTheDocument()
  });

  it('should render the search section', () => {
    const {getByPlaceholderText} = render(<Search />)
    expect(getByPlaceholderText('Search by title, genre, year')).toBeInTheDocument()
  });

  it('should render the nav section', () => {
    const {getAllByRole} = render(<Nav />)
    expect(getAllByRole('button')).toHaveLength(4)
  });

  //check if props are being passed
})