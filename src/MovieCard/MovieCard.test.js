import { render, screen, fireEvent, getByRole } from "@testing-library/react";
import React from "react";
// import React-DOM from 'react-dom';
import MovieCard from "./MovieCard";
import "@testing-library/jest-dom";


describe('MovieCard', () => {
  let mockShowMoviePage
  beforeEach(() => {
    mockShowMoviePage = jest.fn()
    render(
     <MovieCard
      showMoviePage={mockShowMoviePage}
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
    )
  })

  it('should render a card', () => {
    const poster = screen.getByAltText('Donkey Kong movie poster')
    const title = screen.getByRole('heading', {name: 'Donkey Kong'})
    const rating = screen.getByRole("heading", { name: '🍅 60%'})
    const stars = screen.getAllByAltText('empty star icon')
    expect(poster).toBeInTheDocument()
    expect(title).toBeInTheDocument()
    expect(rating).toBeInTheDocument('🍅 60%')
    expect(stars).toHaveLength(5)
  })
  
  it('should fire an event when card is clicked', () => {
    const poster = screen.getByAltText('Donkey Kong movie poster')
    fireEvent.click(poster)
    expect(mockShowMoviePage).toBeCalledTimes(1)
    expect(mockShowMoviePage).toBeCalledWith(1)
  })



})