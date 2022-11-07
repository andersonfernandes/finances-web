import Client from './client'
import IUserResponse from './responses/user'

async function userData(): Promise<IUserResponse> {
  return Client.get('/users/me')
}

export { userData }
