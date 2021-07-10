import axios from 'axios'

import Storage from '../services/cookieStorage'

const authorizationHeader = () => {
  const accessToken = Storage.get(Storage.Keys.ACCESS_TOKEN)

  if (accessToken) {
    return `Bearer ${accessToken.trim()}`
  }

  return undefined
}

const Client = () => {
  return axios.create({
    baseURL: 'https://financesapi.herokuapp.com/v1',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': authorizationHeader(),
    },
  })
}

export default Client
