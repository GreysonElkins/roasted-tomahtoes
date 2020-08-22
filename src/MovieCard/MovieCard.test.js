import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import MovieCard from "./MovieCard";
import "@testing-library/jest-dom";

describe('MovieCard', () => {
  let showMoviePage
  beforeEach(() => {
    showMoviePage = jest.fn()
    render(
     <MovieCard
      showMoviePage={showMoviePage}
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
    const poster = screen.getByRole('img')
    const title = screen.getByRole('heading', {name: 'Donkey Kong'})
    const rating = screen.getByRole("heading", { name: '🍅 60%'});
    expect(poster).toBeInTheDocument()
    expect(title).toBeInTheDocument()
    expect(rating).toBeInTheDocument('🍅 60%')
  })
  
  it('should fire an event when card is clicked', () => {
    const card = screen.getByRole('article')
    fireEvent.click(card)
    expect(showMoviePage).toBeCalledTimes(1)
    expect(showMoviePage).toBeCalledWith(1)
  })



})