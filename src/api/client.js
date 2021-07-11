import axios from 'axios'

import Storage from '../services/cookieStorage'

const buildAuthorizationHeader = () => {
  const accessToken = Storage.get(Storage.Keys.ACCESS_TOKEN)

  if (accessToken) {
    return `Bearer ${accessToken}`
  }

  return undefined
}

const Client = axios.create({
  baseURL: 'http://localhost:5000/v1',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': buildAuthorizationHeader(),
  },
})

export default Client
