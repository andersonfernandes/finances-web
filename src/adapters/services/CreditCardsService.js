import {
  allCreditCards,
  deleteCreditCard,
  fetchCreditCard,
} from "../api/creditCards"
import { creditCardResponseToFullEntity, creditCardResponseToListEntity } from "../parsers/creditCards"

export default class CreditCardsService {
  static loadCreditCards() {
    return new Promise((resolve, reject) => {
      allCreditCards()
        .then(response => {
          const { status, data } = response

          if (status === 200) {
            const parsedData = data.map(creditCardResponseToListEntity)

            resolve(parsedData)
          } else {
            reject()
          }
        })
        .catch(() => reject())
    })
  }

  static loadCreditCardById(id) {
    return new Promise((resolve, reject) => {
      fetchCreditCard(id)
        .then((response => {
          const { status, data } = response

          if (status === 200) {
            resolve(creditCardResponseToFullEntity(data))
          } else {
            reject()
          }
        }))
        .catch(() => reject())
    })
  }

  static deleteCreditCard(id) {
    return deleteCreditCard(id)
  }
}
