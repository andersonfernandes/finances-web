import { authenticate } from "../api/authentication"
import { setTokensCookie } from "./tokens_storage"

const fetchTokens = ({ email, password }) => {
  return new Promise((resolve, reject) => {
    authenticate({ email, password })
      .then(response => {
        if (response.status === 200) {
          const { access_token, refresh_token } = response.data
          setTokensCookie({
            accessToken: access_token,
            refreshToken: refresh_token,
          })

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
