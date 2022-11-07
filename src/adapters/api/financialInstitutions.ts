import { AxiosResponse } from 'axios'

import Client from './client'
import IFinancialinstitutionResponse from './responses/financialInstitution'

async function allFinancialInstitutions(): Promise<AxiosResponse<IFinancialinstitutionResponse>> {
  return Client.get('/financial_institutions')
}

export {
  allFinancialInstitutions,
}
