import React from 'react'
import Rating from './Rating'
import "@testing-library/jest-dom";
import { render, screen, getAllByText, fireEvent } from "@testing-library/react";


describe('Rating', () => {
  let mockRateMovie
  beforeEach(() => {
    mockRateMovie = jest.fn()
    render(<Rating 
      userRating={{rating: 5}}
      rateMovie={mockRateMovie}
      movie_id={149}
      />)
  })

  it('should render 5 stars', () => {
    const stars = screen.getAllByAltText('empty star icon')
    expect(stars).toHaveLength(5)
  })

  it('should fire an event when a star is clicked', () => {
    const stars = screen.getAllByAltText('empty star icon')
    fireEvent.click(stars[0])
    expect(mockRateMovie).toHaveBeenCalledTimes(1)
    expect(mockRateMovie).toHaveBeenCalledWith({movie_id:149, rating: 2})
  })


})