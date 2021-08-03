import { postCreditCard } from "../../api/credit_cards"

const createCreditCard = (params) => {
  return new Promise((resolve, reject) => {
    // Validade Data

    postCreditCard(params)
      .then(response => {
        const { status, data } = response

        if (status === 201) {
          resolve(data)
        } else {
          reject()
        }
      })
      .catch(() => {
        reject()
      })
  })
}

export default createCreditCard
