export const creditCardResponseToEntity = (creditCardResponse) => {
  const {
    id,
    name,
    account: {
      financial_institution: { logo_url }
    }
  } = creditCardResponse

  return {
    id: id,
    title: name,
    icon: logo_url,
  }
}
