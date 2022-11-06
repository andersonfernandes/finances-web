import axios from 'axios'

import CookieStorage, { CookieStorageKeys } from '../../adapters/storage/CookieStorage'
import { refresh } from './authentication'

const buildAuthorizationHeader = () => {
  const accessToken = CookieStorage.get(CookieStorageKeys.ACCESS_TOKEN)

  if (accessToken) {
    return `Bearer ${accessToken}`
  }

  return undefined
}

const Client = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': buildAuthorizationHeader(),
  },
})

Client.interceptors.response.use(
  null,
  async (error) => {
    const { config, response } = error

    if (!response) return Promise.reject(error)

    const authenticateHeader = response.headers['www-authenticate'] || ''
    const tokenIsExpired = authenticateHeader.match('expired_token')

    if (config && response.status === 401 && tokenIsExpired) {
      const refreshToken = CookieStorage.get(CookieStorageKeys.REFRESH_TOKEN)

      return refresh(refreshToken).then(response => {
        const { access_token, refresh_token } = response.data
        CookieStorage.set(CookieStorageKeys.ACCESS_TOKEN, access_token)
        CookieStorage.set(CookieStorageKeys.REFRESH_TOKEN, refresh_token)

        const authorizationHeader = `Bearer ${access_token}`
        Client.defaults.headers.Authorization = authorizationHeader
        config.headers.Authorization = authorizationHeader

        return axios.request(config)
      })
    }

    return Promise.reject(error)
  })

export default Client
