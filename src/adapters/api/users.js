import Client from './client'

const userData = async () => {
  return Client.get('/users/me')
}

export { userData }
