import React from 'react'
import Overview from './Overview'
import "@testing-library/jest-dom";
import { render, screen, getAllByText, fireEvent } from "@testing-library/react";

describe('Overview', () => {
  let movie, toggleOverview
  beforeEach(() => {
   toggleOverview = jest.fn()
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
    render(<Overview 
      movie={movie}
    />)

  })

  it('should render an overview of movie', () => {
    const overview = screen.getByText("A detached married couple must get their son and themselves to safety after being randomly selected to enter an underground bunker, as a massive object from space threatens to destroy the world in less than 48 hours.")
    expect(overview).toBeInTheDocument()
  })

  it('should render a button', () => {
    const displayOverviewBtn = screen.getByRole('button')
    expect(displayOverviewBtn).toBeInTheDocument()
  })

  it('should fire an event when button is clicked', () => {
    const displayOverviewBtn = screen.getByRole('button')
    
    fireEvent.click(displayOverviewBtn)
    expect(toggleOverview).toBeCalledTimes(1)
  })


})