import Client from './client'

const authenticate = async ({ email, password }) => {
  return Client.post('/auth/access_token', {
    email,
    password,
  })
}

export { authenticate }
