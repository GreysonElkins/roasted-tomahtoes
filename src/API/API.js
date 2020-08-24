import React from 'react'

const apiHead = 'https://rancid-tomatillos.herokuapp.com/api/v2'
class API {
  // constructor() {
    // this.apiHead = 'https://rancid-tomatillos.herokuapp.com/api/v2'
    // can I not use this in static methods because the API wasn't constructed?
  // }

  static getData = async location => {
    let response
    let data
    let key = this.findRelevantData(location)
    try {
      response = await fetch(`${apiHead}/${location}`)
      data = await response.json()
    } catch (error) {
      return error
    }
    let cleanedData = this.dataCleaner(data[key], key)
    return cleanedData
    //should this get moved into the `try` block?
  }

  static dataCleaner = (dataToClean, key) => {
    if (key === 'movies') {
      dataToClean.forEach(datum => {
        datum.userRating = {rating: 0}
      })
    } 
    return dataToClean
  } 
  
  static findRelevantData = location => {
    const acceptableData = ['movies', 'movie', 'videos', 'ratings']
    const apiPath = location.split('/') 
    if (apiPath.length === 3 
      && acceptableData.includes(apiPath[2])) {
      return apiPath[2]
    } else if (apiPath.length === 2 
      && acceptableData.includes('movies')) {
      return 'movie'
    } else if (location.includes('movies')) {
      return 'movies'
    } else {
      throw new Error("A bad path was provided for fetching data")
    }
  }

  static postData = async (info, id) => {
    if (this.postInfoIsOk(info, id)) {
      const path = id ? `users/${id}/ratings` : 'login'
      try {
        const response = await fetch(`${apiHead}/${path}`, {
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
    const infoValues = Object.keys(info)
    if (id && infoValues.every(
      value=> acceptableRatingInfo.includes(value))) {
      return true
    } else if (infoValues.every(
      value => acceptableUserInfo.includes(value))) {
      return true
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