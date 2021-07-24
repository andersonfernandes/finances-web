import Client from './client'

const RESOURCE_URL= '/credit_cards'

const allCreditCards = async () => {
  return Client.get(RESOURCE_URL)
}

const createCreditCard = async ({
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

const updateCreditCard = async ({
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

const deleteCreditCards = async (id) => {
  return Client.delete(`${RESOURCE_URL}/${id}`)
}

export {
  allCreditCards,
  createCreditCard,
  updateCreditCard,
  deleteCreditCards,
}
