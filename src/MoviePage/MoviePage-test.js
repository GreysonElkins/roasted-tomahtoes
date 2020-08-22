import { render, getByPlaceholderText, screen } from "@testing-library/react";
import React from "react";
import MoviePage from "./MoviePage";
import "@testing-library/jest-dom";


describe('MoviePage', () => {
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
     <MoviePage
      pageView={this.state.pageView}
      movie={this.state.singleMovie}
      error={this.state.error}
     />
    );
  })


   it('should render a number of movies equal to the length of the array being passed in', () => {

   }) 
})