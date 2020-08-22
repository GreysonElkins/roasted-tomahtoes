import { render, screen } from "@testing-library/react";
import React from "react";
import Main from "./Main";
import "@testing-library/jest-dom";

describe("MoviePage", () => {
 let movies
 beforeEach(() => {
  const movies = [
   {
    id: 1,
    title: "Donkey Kong",
    poster_path: "someURL",
    backdrop_path: "someURL",
    release_date: "2019-12-04",
    overview: "Some overview",
    average_rating: 6,
   },
   {
    id: 2,
    title: "Wizard of Oz",
    poster_path: "someURL",
    backdrop_path: "someURL",
    release_date: "1983-10-05",
    overview: "Some overview",
    average_rating: 4,
   },
  ]
  render(
   <Main
    movies={movies}
    showMoviePage={jest.fn()}
    error={'No movies found'}
   />
  )
 })

 it('should render a number of movies equal to the length of the array being passed in', () => {
  const headingOne = screen.getByRole('heading', {name:'Donkey Kong'})
  const headingTwo = screen.getByRole("heading", { name: "Wizard of Oz" })

  expect(headingOne).toBeInTheDocument()
  expect(headingTwo).toBeInTheDocument();
 })

})
