import React from "react";
import { waitFor, mockFn } from "@testing-library/react";
import "@testing-library/jest-dom";
import API from "./API";
import MutationObserver from "@sheerun/mutationobserver-shim";
window.MutationObserver = MutationObserver;


describe('API methods', () => {

  let mockResponse, apiHead, localHost

  beforeEach(() => {
    apiHead = "https://rancid-tomatillos.herokuapp.com/api/v2";
    localHost = `http://localhost:3001/api/v1`;
  })

  describe('Helper Functions', () => {

    it(`should be able to determine which key to use on
    a fetch response based on the end of the URL`, () => {
      const movies = API.findRelevantPathAndData('movies')
      const singleMovie = API.findRelevantPathAndData('movies/:movie_id')
      const videos = API.findRelevantPathAndData('movies/:movie_id/videos')
      const ratings = API.findRelevantPathAndData("users/:user_id/ratings")

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

    it(`should identify the path for fetch based on the body`, 
    () => {
      const goodUser = {email: '@yahoo', password: 'qwerty'}
      const goodRating = {rating: 0, movie_id: 1}
      const goodFavorite = {id: 1}
      const goodComment = {comment: 'This movie sux', author: 'Germaine'}
      expect(API.findPostPath(goodUser)).toBe(`http://localhost:3001/api/v1/login`)
      expect(API.findPostPath(goodRating, 7)).toBe(
        `http://localhost:3001/api/v1/users/7/ratings`
      );
      expect(API.findPostPath(goodFavorite)).toBe('http://localhost:3000/favorites')
      expect(API.findPostPath(goodComment, 7)).toBe('http://localhost:3000/movies/7/comments')
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

    beforeEach(() => {

      mockResponse = { 
        json: () => {
          return {movies: 'Birdman', movie: 'Batman'}
        }
      }



      global.fetch = jest.fn(() => {
        return mockResponse
      })
      
      API.findRelevantPathAndData = jest.fn((location, id) => {
        const pathAndData = {path: '', data: ''}
        if (location === "movies") {
          pathAndData.path = `${apiHead}/movies/${id ? id : ''}`
          pathAndData.data = id ? `movie` : `movies`
        } else if (location === "videos" && id) {
          pathAndData.path = `${apiHead}/movies/${id}/videos`
          pathAndData.data = `videos`
        } else if (location === `ratings` && id) {
          pathAndData.path = `${apiHead}/users/${id}/ratings`
          pathAndData.data = `ratings`
        } else if (location === `favorites`) {
          pathAndData.path = `${localHost}/favorites`
          pathAndData.data = `favorites`
        } else if (location === 'comments' && id) {
          pathAndData.path = `${localHost}/movies/${id}/comments`;
          pathAndData.data = `comments`;
        }
        else {
          throw new Error("A bad path was provided for fetching data");
        }
        return pathAndData
      })
    })

    it('should get data from a given location', async () => {
      API.getData('movies')
      await waitFor(() => expect(global.fetch).toBeCalledWith(
        "https://rancid-tomatillos.herokuapp.com/api/v2/movies"));
    })

    it('should call findRelevantData with that location when getting data', () => {
      API.getData('movies')
      expect(API.findRelevantData).toBeCalledTimes(1)
      expect(API.findRelevantData).toBeCalledWith('movies')
    })

    it(`should return a key from the response 
      depending on the argument`, async () => {
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

      API.findPostPath = jest.fn((info, id) => {
        const acceptableUserInfo = ["email", "password"];
        const acceptableRatingInfo = ["rating", "movie_id"];
        const acceptableFavoriteInfo = ["id"];
        const acceptableCommentsInfo = ["comment", "author"];
        const infoValues = Object.keys(info);
        if (
          id &&
          infoValues.every((value) => acceptableRatingInfo.includes(value))
        ) {
          return `${apiHead}/users/${id}/ratings`;
        } else if (
          infoValues.every((value) => acceptableUserInfo.includes(value))
        ) {
          return `${apiHead}/login`;
        } else if (
          infoValues.every((value) => acceptableFavoriteInfo.includes(value))
        ) {
          return `${localHost}/favorites`;
        } else if (
          infoValues.every((value) => acceptableCommentsInfo.includes(value))
        ) {
          return `${localHost}/movies/${id}/comments`;
        } else {
          throw new Error("Something is wrong with the data for POST");
        }
      });
    })

    afterEach(() => {
      global.fetch.mockClear()
      API.findPostPath.mockClear()
    })

    it(`should stringify the passed in first parameter`, () => {
      API.postData({email: '@yahoo', password:'qwerty'})
      expect(JSON.stringify).toBeCalledTimes(1)
    })

    it(`should call a helper method to check 
    the body has the right content`, () => {
      API.postData({})
      expect(API.findPostPath).toBeCalledTimes(1)
    })

  })
})




