import { authenticate } from "../api/authentication"
import Storage from './cookieStorage'

const { ACCESS_TOKEN, REFRESH_TOKEN } = Storage.Keys

const fetchTokens = ({ email, password }) => {
  return new Promise((resolve, reject) => {
    authenticate({ email, password })
      .then(response => {
        if (response.status === 200) {
          const { access_token, refresh_token } = response.data
          Storage.set(ACCESS_TOKEN, access_token)
          Storage.set(REFRESH_TOKEN, refresh_token)

          resolve()
        } else {
          reject()
        }
      })
      .catch(_ => {
        reject()
      })
  })
}

export {
  fetchTokens,
}
