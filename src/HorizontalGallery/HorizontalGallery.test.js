import React from 'react'
import {render, screen} from '@testing-library/react'
import HorizontalGallery from './HorizontalGallery'
import { MemoryRouter } from 'react-router-dom'

describe('Horizontal Galleries', () => {
  let movieSelection, userRating
  beforeEach(() => {
    movieSelection = [
      {
        id: 524047,
        poster_path:
          "https://image.tmdb.org/t/p/original//sA154deR0X51EcR2lm2FfDczryg.jpg",
        backdrop_path:
          "https://image.tmdb.org/t/p/original//juzEhsX92if2lJ2CSqKAI4RQswt.jpg",
        title: "Greenland",
        average_rating: 5,
        release_date: "2020-07-29",
        userRating: { rating: 5 },
      },
      {
        id: 606234,
        poster_path:
          "https://image.tmdb.org/t/p/original//eDnHgozW8vfOaLHzfpHluf1GZCW.jpg",
        backdrop_path:
          "https://image.tmdb.org/t/p/original//u9YEh2xVAPVTKoaMNlB5tH6pXkm.jpg",
        title: "Archive",
        average_rating: 4,
        release_date: "2020-08-13",
        userRating: { rating: 4 },
      },
    ];

    userRating = {
      created_at: "today",
      id: 1,
      movie_id: 524047,
      rating: 4,
      updated_at: "yesterday",
      user_id: 70,
    }

  })


  it('should show movie cards from the selection of movies ', () => {      
    render(
      <MemoryRouter>
        <HorizontalGallery
          movieSelection={movieSelection}
          checkIfFavorite={jest.fn()}
          toggleFavorite={jest.fn()}
          galleryTitle={"MovieTime"}
          isLoggedIn={true}
          rateMovie={jest.fn()}
          userRatings={[userRating]}
          deleteRating={jest.fn()}
        />
      </MemoryRouter>
    )

    const titleOne = screen.getByText('Greenland')
    const titleTwo = screen.getByText('Archive')

    expect(titleOne).toBeInTheDocument()
    expect(titleTwo).toBeInTheDocument()
  })

  it('should have a header with the title of the gallery', () => {
    render(
      <MemoryRouter>
        <HorizontalGallery
          movieSelection={movieSelection}
          checkIfFavorite={jest.fn()}
          toggleFavorite={jest.fn()}
          galleryTitle={"MovieTime"}
          isLoggedIn={true}
          rateMovie={jest.fn()}
          userRatings={[userRating]}
          deleteRating={jest.fn()}
        />
      </MemoryRouter>
    )
    const galleryHeader = screen.getByRole('heading', { name: 'MovieTime' })

    expect(galleryHeader).toBeInTheDocument()
  })

  it('should be able to sort ratings specified based on the gallery title', () => {
      render(
        <MemoryRouter>
          <HorizontalGallery
            movieSelection={movieSelection}
            checkIfFavorite={jest.fn()}
            toggleFavorite={jest.fn()}
            galleryTitle={"5-star"}
            isLoggedIn={true}
            rateMovie={jest.fn()}
            userRatings={[userRating]}
            deleteRating={jest.fn()}
          />
        </MemoryRouter>
      )
      
      const titleOne = screen.getByText('Greenland')
      const titleTwo = screen.queryByText('Archive')
      
      expect(titleOne).toBeInTheDocument()
      // expect(screen.getByText("Archive")).not.toBeInTheDocument();
      expect(titleTwo).toBeNull();
  })
})