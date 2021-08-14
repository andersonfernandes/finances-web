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
  closing_day,
  due_day,
  limit,
  financial_institution_id,
}) => {
  return Client.post(RESOURCE_URL, {
    name,
    closing_day,
    due_day,
    limit,
    financial_institution_id,
  })
}

const putCreditCard = async ({
  id,
  name,
  closing_day,
  due_day,
  limit,
  financial_institution_id,
}) => {
  return Client.put(`${RESOURCE_URL}/${id}`, {
    name,
    closing_day,
    due_day,
    limit,
    financial_institution_id,
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
