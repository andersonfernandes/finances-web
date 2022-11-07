import IAccountResponse from './account'

export default interface IUserResponse {
  name: string
  email: string
  default_account: IAccountResponse | null
}
