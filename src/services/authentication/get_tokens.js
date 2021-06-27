import { authenticate } from "../../api/authentication";

const getTokens = ({ email, password }) => {
  return new Promise((resolve, reject) => {
    authenticate({ email, password })
      .then(response => {
        if (response.status === 200) {
          const { access_token, refresh_token } = response.data
          // TODO: save tokens to a cookie

          resolve(response.data)
        } else {
          reject(response.data)
        }
      })
      .catch(error => {
        reject(error)
      })
  })
}

export default getTokens;
