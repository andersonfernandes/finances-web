import Client from './client'

const allAccounts = async () => {
	return Client.get('/accounts')
}

export {
	allAccounts,
}
