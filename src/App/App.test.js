import React from 'react'
// import React-DOM from 'react-dom'
import { render, screen, getByPlaceholderText, getByText, waitFor } from '@testing-library/react'
import App from './App'
import '@testing-library/jest-dom'
import {getData} from '../API/API'
jest.mock('../API/API.js')


describe('App', () => {
 beforeEach(() => {
  //  mockGetData = jest.mock(...) 
   render(<App/>)
 })

  it('should start with default state', () => {       
    const defaultApp = new App()
    expect(defaultApp.state.isLoggedIn).toBe(false)
    expect(defaultApp.state.movies).toStrictEqual([])
    expect(defaultApp.state.error).toBe('')
    expect(defaultApp.state.pageView).toBe('Home')
    expect(defaultApp.state.userRatings).toStrictEqual([])
    expect(defaultApp.state.singleMovie).toStrictEqual({})
    expect(defaultApp.state.singleMovieUserRating).toStrictEqual({})
    expect(defaultApp.state.trailers).toStrictEqual([])
    expect(defaultApp.state.user).toStrictEqual({id: '', email: '', name: ''})
    const {getByText} = render(<App/>)
    expect(getByText("Your Ratings").className).toBe("hidden")
    expect(getByText('Logout').className).toBe('hidden')
  })

  it('should render header', () => {
    const {getByPlaceholderText} = render(<App/>)
    expect(getByPlaceholderText('Search by title, genre, year')).toBeInTheDocument()
  })

  it('should show some header elements if isLoggedIn is true', () => {
    const { getByText } = render(<App isLoggedIn={true}/>)
    expect(getByText("Your Ratings")).toBeInTheDocument()
    expect(getByText('Logout')).toBeInTheDocument()
  })

  it('should render fetched movies data on load', async () => {
    getData.mockResolvedValueOnce([{
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
        title: "Godzilla",
        poster_path: "someURL",
        backdrop_path: "someURL",
        release_date: "2019-12-04",
        overview: "Some overview",
        average_rating: 4,
      }, 
      {
        id: 3,
        title: "Signs",
        poster_path: "someURL",
        backdrop_path: "someURL",
        release_date: "2018-12-04",
        overview: "Some overview",
        average_rating: 8,
      }
  ]);

    const {getByText} = render(<App/>)
    const movie1 = await waitFor(() => getByText('Donkey Kong'))
    const movie2 = await waitFor(() => getByText('Godzilla'))
    const movie3 = await waitFor(() => getByText('Signs'))

    expect(movie1).toBeInTheDocument()
    expect(movie2).toBeInTheDocument()
    expect(movie3).toBeInTheDocument()

  })

  //component did mount
  // check that get all movies has been called
  // states change after mount (error / movies) 

})
