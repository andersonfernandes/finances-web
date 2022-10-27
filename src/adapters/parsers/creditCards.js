export const creditCardResponseToListEntity = (creditCardResponse) => {
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

export const creditCardResponseToFullEntity = (creditCardResponse) => {
	const {
		id,
		name,
		closing_day,
		due_day,
		limit,
		account: { financial_institution }
	} = creditCardResponse

	return {
		id,
		name,
		closing_day,
		due_day,
		limit,
		financial_institution,
		financial_institution_id: financial_institution.id,
	}
}
