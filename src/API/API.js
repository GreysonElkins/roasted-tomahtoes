import React from 'react'

const apiHead = ' https://rancid-tomatillos.herokuapp.com/api/v2'
const api = {
  getAllMovies: async () => {
    const response = await fetch(`${apiHead}/movies`)
    const data = await response.json()
    return data.movies
  }
}

export default api