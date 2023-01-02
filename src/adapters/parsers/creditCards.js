export const creditCardResponseToListEntity = (creditCardResponse) => {
  const {
    id,
    name,
  } = creditCardResponse

  return {
    id: id,
    title: name,
  }
}

export const creditCardResponseToFullEntity = (creditCardResponse) => {
  const {
    id,
    name,
    billing_day,
    limit,
  } = creditCardResponse

  return {
    id,
    name,
    billing_day,
    limit,
  }
}
