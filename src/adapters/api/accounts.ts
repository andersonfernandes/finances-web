import { AxiosResponse } from 'axios'

import Client from './client'
import IAccountResponse from './responses/account'

async function allAccounts(): Promise<AxiosResponse<IAccountResponse>> {
  return Client.get('/accounts')
}

export {
  allAccounts,
}
