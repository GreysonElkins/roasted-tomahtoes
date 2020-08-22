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

  getMovies: async id => {
    let response
    let key = id ? movie : movies
    if (id) {
      response = await fetch(`${apiHead}/movies/${id}`)
    } else {
      response = await fetch(`${apiHead}/movies`)
    }

    return data[key]
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