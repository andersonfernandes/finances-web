import { allAccounts } from '../api/accounts'

export default class AccountsService {
  static loadAccounts() {
    return new Promise((resolve, reject) => {
      allAccounts()
        .then(response => {
          const { status, data } = response

          if (status === 200) {
            resolve(data)
          } else {
            reject()
          }
        })
        .catch(() => reject())
    })
  }
}
