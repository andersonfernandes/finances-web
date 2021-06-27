import axios from 'axios'
import { getAccessTokenFromCookie } from '../services/tokens_storage'

const buildHeaders = () => {
  let headers = {
    'Content-Type': 'application/json'
  }

  const accessToken = getAccessTokenFromCookie()
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
