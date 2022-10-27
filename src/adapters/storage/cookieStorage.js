import Cookies from 'js-cookie'

const defaultCookieOptions = {
	sameSite: 'strict',
	secure: true,
}

const Storage = {
	get: Cookies.get,
	set: (key, value) => Cookies.set(key, value, defaultCookieOptions),
	remove: Cookies.remove,
}

Storage.Keys = {
	ACCESS_TOKEN: '__fin_access_token',
	REFRESH_TOKEN: '__fin_refresh_token',
}

export default Storage
