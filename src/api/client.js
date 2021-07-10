import axios from 'axios'

import Storage from '../services/cookieStorage'

const buildHeaders = () => {
  let headers = {
    'Content-Type': 'application/json'
  }

  const accessToken = Storage.get(Storage.Keys.ACCESS_TOKEN)
  if (accessToken) {
    Object.assign(headers, { 'Authentication': `Bearer ${accessToken}` })
  }

  return headers
}

const Client = axios.create({
  baseURL: 'https://financesapi.herokuapp.com/v1',
  headers: buildHeaders(),
})

export default Client
