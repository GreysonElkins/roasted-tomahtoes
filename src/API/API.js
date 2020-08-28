import React from 'react'

const apiHead = 'https://rancid-tomatillos.herokuapp.com/api/v2'
class API {
  // constructor() {
    // this.apiHead = 'https://rancid-tomatillos.herokuapp.com/api/v2'
    // can I not use this in static methods because the API wasn't constructed?
  // }

  static getData = async (location, id) => {
    let pathAndData = this.findRelevantPathAndData(location, id);
    try {
      let response = await fetch(pathAndData.path)
      let data = await response.json()
      return data[pathAndData.data]
    } catch (error) {
      return error
    }
  }

  static findRelevantPathAndData = (location, id) => {
    const pathAndData = {path: '', data: ''}
    if (location === "movies") {
      pathAndData.path = `${apiHead}/movies/${id ? id : ''}`;
      pathAndData.data = id ? `movie` : `movies`;
    } else if (location === "videos" && id) {
      pathAndData.path = `${apiHead}/movies/${id}/videos`;
      pathAndData.data = `videos`;
    } else if (location === `ratings` && id) {
      pathAndData.path = `${apiHead}/users/${id}/ratings`;
      pathAndData.data = `ratings`;
    } else {
      throw new Error("A bad path was provided for fetching data");
    }
    return pathAndData
  }

  static postData = async (info, id) => {
    const path = this.findPostPath(info, id)
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
  
  static findPostPath = (info, id) => {
    const acceptableUserInfo = ['email', 'password']
    const acceptableRatingInfo = ['rating', 'movie_id']
    const infoValues = Object.keys(info)
    if (id && infoValues.every(
        value=> acceptableRatingInfo.includes(value))) {
      return `${apiHead}/${id}ratings`
    } else if (infoValues.every(
        value => acceptableUserInfo.includes(value))) {
      return `${apiHead}/login`
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