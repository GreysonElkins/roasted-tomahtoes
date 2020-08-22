import { render, getByPlaceholderText, getByText, getByRole, screen, within } from "@testing-library/react";
import React from "react";
import MoviePage from "./MoviePage";
import "@testing-library/jest-dom";

describe('MoviePage', () => {
  let movie
  beforeEach(() => {
    movie = {
        "id": 524047,
        "title": "Greenland",
        "poster_path": "https://image.tmdb.org/t/p/original//sA154deR0X51EcR2lm2FfDczryg.jpg",
        "backdrop_path": "https://image.tmdb.org/t/p/original//juzEhsX92if2lJ2CSqKAI4RQswt.jpg",
        "release_date": "2020-07-29",
        "overview": "A detached married couple must get their son and themselves to safety after being randomly selected to enter an underground bunker, as a massive object from space threatens to destroy the world in less than 48 hours.",
        "genres": [
            "Action",
            "Science Fiction",
            "Thriller"
        ],
        "budget": 0,
        "revenue": 0,
        "runtime": 119,
        "tagline": "",
        "average_rating": 9
    }
    render(
     <MoviePage
      pageView={jest.fn()}
      movie={movie}
      error={'No movie found. Please try again.'}
      isLoggedIn={true}
     />
    )
  })

   it('should render information about the selected movie', () => {
    expect(screen.getByRole('img')).toBeInTheDocument()
    expect(screen.getByRole('heading', {name: 'Greenland'})).toBeInTheDocument();
    screen.getByText((content, node) => {
     const hasText = (node) =>
      node.textContent ===
      ('Overview: A detached married couple must get their son and themselves to safety after being randomly selected to enter an underground bunker, as a massive object from space threatens to destroy the world in less than 48 hours.' &&
       "Genre(s): Action, Science Fiction, Thriller" &&
       "Release Date: July 29, 2020" &&
       "Budget: $0" &&
       "Revenue: $0" &&
       "Runtime: 119 minutes" &&
       "Tagline: None");
     const nodeHasText = hasText(node);
     const childrenDontHaveText = Array.from(node.children).every(
      (child) => !hasText(child)
     )
     return nodeHasText && childrenDontHaveText;
    })
   }) 

   it('should display a button to play trailer', () => {
     expect(screen.getByRole('button', {name: 'Play Trailer'})).toBeInTheDocument()
   })

   it('should render a user rating, rating input, submit button if user is logged in', () => {
     expect(screen.getByText('🍿 40%')).toBeInTheDocument()
     expect(screen.getByPlaceholderText('Your 🍿 Rating')).toBeInTheDocument()
     expect(screen.getByRole('button', {name:'Submit Rating'})).toBeInTheDocument()
   })
})