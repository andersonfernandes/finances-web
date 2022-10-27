import axios from 'axios'

import Storage from '../../adapters/storage/cookieStorage'
import { refresh } from './authentication'

const { ACCESS_TOKEN, REFRESH_TOKEN } = Storage.Keys

const buildAuthorizationHeader = () => {
	const accessToken = Storage.get(ACCESS_TOKEN)

	if (accessToken) {
		return `Bearer ${accessToken}`
	}

	return undefined
}

const Client = axios.create({
	baseURL: process.env.REACT_APP_API_URL,
	headers: {
		'Content-Type': 'application/json',
		'Authorization': buildAuthorizationHeader(),
	},
})

Client.interceptors.response.use(
	null,
	async (error) => {
		const { config, response } = error

		if (!response) return Promise.reject(error)

		const authenticateHeader = response.headers['www-authenticate'] || ''
		const tokenIsExpired = authenticateHeader.match('expired_token')

		if (config && response.status === 401 && tokenIsExpired) {
			const refreshToken = Storage.get(REFRESH_TOKEN)

			return refresh(refreshToken).then(response => {
				const { access_token, refresh_token } = response.data
				Storage.set(ACCESS_TOKEN, access_token)
				Storage.set(REFRESH_TOKEN, refresh_token)

				const authorizationHeader = `Bearer ${access_token}`
				Client.defaults.headers.Authorization = authorizationHeader
				config.headers.Authorization = authorizationHeader

				return axios.request(config)
			})
		}

		return Promise.reject(error)
	})

export default Client
