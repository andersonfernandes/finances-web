import Api from './api'

const fetchToken = async ({ email, password }) => {
  return Api.post('/auth/access_token', {
    email,
    password,
  })
}

export { fetchToken }
