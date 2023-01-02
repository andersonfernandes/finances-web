import Client from './client'

const RESOURCE_URL= '/credit_cards'

const allCreditCards = async () => {
  return Client.get(RESOURCE_URL)
}

const fetchCreditCard = async (id) => {
  return Client.get(`${RESOURCE_URL}/${id}`)
}

const postCreditCard = async ({
  name,
  billing_day,
  limit,
}) => {
  return Client.post(RESOURCE_URL, {
    name,
    billing_day,
    limit,
  })
}

const putCreditCard = async ({
  id,
  name,
  billing_day,
  limit,
}) => {
  return Client.put(`${RESOURCE_URL}/${id}`, {
    name,
    billing_day,
    limit,
  })
}

const deleteCreditCard = async (id) => {
  return Client.delete(`${RESOURCE_URL}/${id}`)
}

export {
  allCreditCards,
  fetchCreditCard,
  postCreditCard,
  putCreditCard,
  deleteCreditCard,
}
