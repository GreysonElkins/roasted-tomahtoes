import React from 'react'

const apiHead = 'https://rancid-tomatillos.herokuapp.com/api/v2'
const api = {
  getAllMovies: async () => {
    const response = await fetch(`${apiHead}/movies`)
    const data = await response.json()
    return data.movies
  },

  getAMovie: async id => {
    try {
      const response = await fetch(`${apiHead}/movies/${id}`)
      const data = await response.json()
      return data.movie
    } catch (error) {
      return error
    }
  },

  getData: async location => {
    let response
    let key = location ? movie : movies
    try {
      response = await fetch(`${apiHead}/${location}`)
    } catch (error) {
      return error
    }
    return data[key]
  },

  findRelevantData: location => {
    const apiPath = location.split('/') 
    if (apiPath.length === 3) {
      return apiPath[2]
    } else if (apiPath.length === 2) {
      return 'movie'
    } else {
      return 'movies'
    }
  }

  postLogin: async (loginInfo) => {
    try {
      const response = await fetch(`${apiHead}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: loginInfo.emailInput,
          password: loginInfo.passwordInput,
        }),
      })
      return response
    } catch (error) {
      return error
    }
  }

}

export default api