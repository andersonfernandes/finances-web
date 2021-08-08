import Client from './client'

const allFinancialInstitutions = async () => {
  return Client.get('/financial_institutions')
}

export {
  allFinancialInstitutions,
}
