import { AxiosResponse } from 'axios'

import Client from './client'
import ICreditCardResponse from './responses/creditCard'

const RESOURCE_URL= '/credit_cards'

interface ICreditCardParams {
  id?: number
  name: string
  closing_day: number
  due_day: number
  limit: number
  financial_institution_id: number 
}

async function allCreditCards(): Promise<AxiosResponse<ICreditCardResponse>> {
  return Client.get(RESOURCE_URL)
}

async function fetchCreditCard(id: number): Promise<AxiosResponse<ICreditCardResponse>> {
  return Client.get(`${RESOURCE_URL}/${id}`)
}

async function postCreditCard(
  { name, closing_day, due_day, limit, financial_institution_id }: ICreditCardParams
): Promise<AxiosResponse<ICreditCardResponse>> {
  return Client.post(RESOURCE_URL, {
    name,
    closing_day,
    due_day,
    limit,
    financial_institution_id,
  })
}

async function putCreditCard (
  { id, name, closing_day, due_day, limit, financial_institution_id }: ICreditCardParams
): Promise<AxiosResponse<ICreditCardResponse>> {
  return Client.put(`${RESOURCE_URL}/${id}`, {
    name,
    closing_day,
    due_day,
    limit,
    financial_institution_id,
  })
}

async function deleteCreditCard(id: number): Promise<AxiosResponse> {
  return Client.delete(`${RESOURCE_URL}/${id}`)
}

export {
  allCreditCards,
  fetchCreditCard,
  postCreditCard,
  putCreditCard,
  deleteCreditCard,
}
