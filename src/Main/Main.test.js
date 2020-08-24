import { render, screen, getAllByText } from "@testing-library/react";
import React from "react";
import Main from "./Main";
import "@testing-library/jest-dom";

describe("MoviePage", () => {

 beforeEach(() => {
   const movies = [{
     id: 1,
     title: "Donkey Kong",
     poster_path: "someURL",
     backdrop_path: "someURL",
     release_date: "2019-12-04",
     overview: "Some overview",
     average_rating: 6,
   }, {
     id: 2,
     title: "Wizard of Oz",
     poster_path: "someURL",
     backdrop_path: "someURL",
     release_date: "1983-10-05",
     overview: "Some overview",
     average_rating: 4,
   }]
   const ratings = [{
      "id": 1702,
      "user_id": 70,
      "movie_id": 1,
      "rating": 2,
      "created_at": "2020-08-24T07:53:18.181Z",
      "updated_at": "2020-08-24T07:53:18.181Z"
   }, {
      "id": 1703,
      "user_id": 70,
      "movie_id": 2,
      "rating": 8,
      "created_at": "2020-08-24T07:53:20.907Z",
      "updated_at": "2020-08-24T07:53:20.907Z"
   }]
  render(
   <Main
    movies={movies}
    userRatings={ratings} 
    showMoviePage={jest.fn()}
    error={'No movies found'}
   />
  )
 })

 it('should render a number of movies equal to the length of the array being passed in', () => {
  const headingOne = screen.getByRole('heading', {name:'Donkey Kong'})
  const headingTwo = screen.getByRole("heading", { name: "Wizard of Oz" })

  expect(headingOne).toBeInTheDocument()
  expect(headingTwo).toBeInTheDocument()
 })

 it.skip('should render an error message if no movies are found', () => {
    const {getByText} = render(<Main />)
    expect(getByText('No movies were found. Please try again.'))
 })

})
