import { render, screen, fireEvent, getByRole } from "@testing-library/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import MovieCard from "./MovieCard";
import "@testing-library/jest-dom";


describe('MovieCard', () => {
  let mockGetSingleMovie
  beforeEach(() => {
    mockGetSingleMovie = jest.fn()
    render(
      <MemoryRouter>
        <MovieCard
          getSingleMovie={mockGetSingleMovie}
          isLoggedIn={true}
          userRating={{rating: 5}}
            movie={{
            id: 1,
            title: "Donkey Kong",
            poster_path: "someURL",
            backdrop_path: "someURL",
            release_date: "2019-12-04",
            overview: "Some overview",
            average_rating: 6,
          }}
          error={"No movie found. Please try again."}
        />
      </MemoryRouter>
    )
  })

  it('should render a card', () => {
    const poster = screen.getByAltText('Donkey Kong movie poster')
    const title = screen.getByRole('heading', {name: 'Donkey Kong'})
    const rating = screen.getByRole("heading", { name: '🍅 60%'})
    const stars = screen.getAllByAltText('selected star icon')
    expect(poster).toBeInTheDocument()
    expect(title).toBeInTheDocument()
    expect(rating).toBeInTheDocument('🍅 60%')
    expect(stars).toHaveLength(5)
  })
  
  it('should fire an event when card is clicked', () => {
    const poster = screen.getByAltText('Donkey Kong movie poster')
    fireEvent.click(poster)
    expect(mockGetSingleMovie).toBeCalledTimes(1)
    expect(mockGetSingleMovie).toBeCalledWith(1)
  })



})