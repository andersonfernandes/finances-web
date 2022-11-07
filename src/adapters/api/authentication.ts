import { AxiosResponse } from 'axios'

import Client from './client'
import IAuth from './responses/auth'

async function authenticate(
  { email, password }: { email: string, password: string }
): Promise<AxiosResponse<IAuth>> {
  return Client.post('/auth/access_token', {
    email,
    password,
  })
}

async function refresh(refreshToken: string): Promise<AxiosResponse<IAuth>> {
  return Client.post('/auth/refresh_token', {
    refresh_token: refreshToken,
  })
}

async function revoke(): Promise<AxiosResponse> {
  return Client.post('/auth/revoke')
}

export {
  authenticate,
  refresh,
  revoke,
}
