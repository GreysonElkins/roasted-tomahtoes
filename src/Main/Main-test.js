import { render, getAllByRole } from '@testing-library/react'
import React from 'react'
import Main from './Main'
import '@testing-library/jest-dom'

describe('Main', () => {
  it('should render an array of movie cards', () => {
    const {getByDisplayValue} = render(<Main />)
    expect(getAllByRole('Card')).toHaveLength(40);
  })
})