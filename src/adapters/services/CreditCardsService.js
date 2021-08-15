import {
  allCreditCards,
  deleteCreditCard,
  fetchCreditCard,
  postCreditCard,
  putCreditCard,
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

  static saveCreditCard(params) {
    const saveAction = params.id ? putCreditCard : postCreditCard

    return new Promise((resolve, reject) => {
      saveAction(params)
        .then(response => {
          const { status } = response

          if ([200, 201].includes(status)) {
            resolve()
          } else {
            reject()
          }
        })
        .catch(() => reject())
    })
  }

  static deleteCreditCard(id) {
    return deleteCreditCard(id)
  }
}
