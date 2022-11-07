import IAccountResponse from './account'

export default interface ICreditCardResponse {
  id: number
  name: string
  closing_day: string
  due_day: string
  limit: number
  account: IAccountResponse
}
