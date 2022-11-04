import { userData } from '../api/users'

export default class UsersService {
  static loadUserData() {
    return new Promise((resolve, reject) => {
      userData()
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
