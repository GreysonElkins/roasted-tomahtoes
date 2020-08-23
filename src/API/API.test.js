import React from "react";
import { waitFor, mockFn } from "@testing-library/react";
import "@testing-library/jest-dom";
import API from "./API";
import MutationObserver from "@sheerun/mutationobserver-shim";
window.MutationObserver = MutationObserver;


describe('API methods', () => {
  describe('Helper Functions', () => {

    it(`should be able to determine which key to use on
    a fetch response based on the end of the URL`, () => {
      const movies = API.findRelevantData('movies')
      const singleMovie = API.findRelevantData('movies/:movie_id')
      const videos = API.findRelevantData('movies/:movie_id/videos')
      const ratings = API.findRelevantData("users/:user_id/ratings")

      expect(movies).toBe('movies')
      expect(singleMovie).toBe('movie')
      expect(videos).toBe('videos')
      expect(ratings).toBe('ratings')
    })

    // it(`should return an error if it gets a bad path`, () => {
    //   const getItWrong = () => {
    //     API.findRelevantData('Birdman')
    //   }
    //   expect(getItWrong("Birdman")).toThrowError('bad path')
    // })

    it('should be able to check an input for POST requirements', () => {
      const goodUser = {email: '@yahoo', password: 'qwerty'}
      const goodRating = {rating: 0, movie_id: 1}
      expect(API.postInfoIsOk(goodUser)).toBe(true)
      expect(API.postInfoIsOk(goodRating, 7)).toBe(true)
    })

    // it(`should return an error if the post is bad`, () => {
    // waiting for feedback from the previous test on Errors
      // check an object with all the keys
      // check an object with no keys or other data types
      // we could program to check the values of the object entered, 
        // but I don't think it's necessary
    // })

    // ^ I don't know why this isn't working 
  })

  describe('Fetch GET', () => {
 
    let mockResponse

    beforeEach(() => {

      mockResponse = { 
        json: () => {
          return {movies: 'Birdman', movie: 'Batman'}
        }
      }

      global.fetch = jest.fn(() => {
        return mockResponse
        })
      
        API.findRelevantData = jest.fn(location => {
          const apiPath = location.split("/");
          if (apiPath.length === 3) {
            return apiPath[2];
          } else if (apiPath.length === 2) {
            return "movie";
          } else {
            return "movies";
          }
        })
    })

    it('should get data from a given location', async ()=> {
      API.getData('movies')
      await waitFor(() => expect(global.fetch).toBeCalledWith(
        "https://rancid-tomatillos.herokuapp.com/api/v2/movies"));
    })

    it('should call findRelevantData with that location when getting data', () => {
      API.getData('movies')
      expect(API.findRelevantData).toBeCalledTimes(1)
      expect(API.findRelevantData).toBeCalledWith('movies')
    })

    it(`should return different aspects of the 
    response depending on the argument`, async () => {
      const allMovies = await API.getData('movies')
      const movie = await API.getData("movie/1")
      expect(allMovies).toBe('Birdman')
      expect(movie).toBe('Batman')
    }) 

    it(`should return an error if the get is bad`, () => {

    })
  })

  describe('Fetch POST', () => {

    beforeEach(() => {
      JSON.stringify = jest.fn()
      API.postInfoIsOk = jest.fn(() => true)
    })

    afterEach(() => {
      global.fetch.mockClear()
      API.postInfoIsOk.mockClear()
    })

    it(`should fetch to the login API if no id is provided`, async () => {
      API.postData('info')
      await waitFor(() =>
        expect(global.fetch).toBeCalledWith(
          `https://rancid-tomatillos.herokuapp.com/api/v2/login`, 
          {
            "body": undefined, 
            "headers": {"Content-Type": "application/json"}, 
            "method": "POST"
          }
        )
      );

    })

    it(`should fetch to the users rating api if an id is provided`, 
    async () => {
      API.postData('info', '7')
      await waitFor(() =>
        expect(global.fetch).toBeCalledWith(
          `https://rancid-tomatillos.herokuapp.com/api/v2/users/7/ratings`, 
          {
            "body": undefined, 
            "headers": {"Content-Type": "application/json"}, 
            "method": "POST"
          }
        )
      );
    })



    it(`should stringify the passed in first parameter`, () => {
      API.postData({name: `object`})
      expect(JSON.stringify).toBeCalledTimes(1)
    })

    it(`should call a helper method to check 
    the body has the right content`, () => {
      API.postData({})
      expect(API.postInfoIsOk).toBeCalledTimes(1)
    })

  })
})




