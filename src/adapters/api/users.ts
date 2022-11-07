import { AxiosResponse } from 'axios'

import Client from './client'
import IUserResponse from './responses/user'

async function userData(): Promise<AxiosResponse<IUserResponse>> {
  return Client.get('/users/me')
}

export { userData }
