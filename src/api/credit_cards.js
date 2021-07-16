import Client from './client'

const allCreditCards = async () => {
  return Client.get('/credit_cards')
}

export {
  allCreditCards,
}
