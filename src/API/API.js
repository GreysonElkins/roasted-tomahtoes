import React from 'react'

const apiHead = 'https://rancid-tomatillos.herokuapp.com/api/v2'
const localHostHead = "http://localhost:3001/api/v1";
class API {
  // constructor() {
    // this.apiHead = 'https://rancid-tomatillos.herokuapp.com/api/v2'
    // can I not use this in static methods because the API wasn't constructed?
  // }

  static getData = async (location, id) => {
    let response
    let data
    let key = this.findRelevantData(location, id)
    try {
      response = await fetch(key.path)
      data = await response.json()
    } catch (error) {
      return error
    }
    return data[key.key]
    //should this get moved into the `try` block?
  }
  
  static findRelevantData = (location, id) => {
    if (location === 'ratings') {
      return { path: `${apiHead}/users/${id}/${location}`, key: `${location}` };
    } else if (location === 'videos' || location === 'movie') {
      return { path: `${apiHead}/movies/${id}`, key: `${location}` };
    }
    else if (location === 'comments') {
      return {path: `${localHostHead}/movies/${id}/comments`, key: `${location}`}
    } 
    else if (location === 'favorites') {
      return {path: `${localHostHead}/${location}`}
    } else {
      throw new Error("A bad path was provided for fetching data")
    }
  }

  static postData = async (info, id) => {
    if (this.postInfoIsOk(info, id)) {
      const path = this.postInfoIsOk(info, id)
      try {
        const response = await fetch(`${path}`, {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(
            info
          )
        })
        return response
      } catch (error) {
        return error
      }
    }
  }

  static postInfoIsOk = (info, id) => {
    const acceptableUserInfo = ['email', 'password']
    const acceptableRatingInfo = ['rating', 'movie_id']
    const acceptableCommentsInfo = ['comment', 'author']
    const infoValues = Object.keys(info)
    if (id && infoValues.every(
      value=> acceptableRatingInfo.includes(value))) {
      return `${apiHead}/users/${id}/ratings`
      } else if (id && infoValues.every(
      value=> acceptableCommentsInfo.includes(value))) {
      return `${localHostHead}/movies/${id}/comments`
    } else if (infoValues.every(
      value => acceptableUserInfo.includes(value))) {
      return `${apiHead}/users`
    } else {
      throw new Error ('Something is wrong with the data for POST')
    }
  }

  static deleteData = async (userID, ratingID) => {
    try {
      const response = await fetch(`${apiHead}/users/${userID}/ratings/${ratingID}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        }
      })  
      return response
    } catch(error) {
      return error
    }
  }
}

export default API