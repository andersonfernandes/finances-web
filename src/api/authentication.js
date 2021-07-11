import Client from './client'

const authenticate = async ({ email, password }) => {
  return Client.post('/auth/access_token', {
    email,
    password,
  })
}

const revoke = async () => {
  return Client.post('/auth/revoke')
}

export {
  authenticate,
  revoke,
}
