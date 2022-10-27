import Client from './client'

const authenticate = async ({ email, password }) => {
	return Client.post('/auth/access_token', {
		email,
		password,
	})
}

const refresh = async (refreshToken) => {
	return Client.post('/auth/refresh_token', {
		refresh_token: refreshToken,
	})
}

const revoke = async () => {
	return Client.post('/auth/revoke')
}

export {
	authenticate,
	refresh,
	revoke,
}
