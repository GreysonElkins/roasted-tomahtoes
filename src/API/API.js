import React from 'react'

const apiHead = 'https://rancid-tomatillos.herokuapp.com/api/v2'
class API {

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
    return data[key]
  }
  
  static findRelevantData = location => {
    const apiPath = location.split('/') 
    if (apiPath.length === 3) {
      return apiPath[2]
    } else if (apiPath.length === 2) {
      return 'movie'
    } else {
      return 'movies'
    }
  }

  static postLogin = async (loginInfo) => {
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

export default API