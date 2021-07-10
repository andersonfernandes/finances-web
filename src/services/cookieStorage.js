import Cookies from 'js-cookie'

const defaultCookieOptions = {
  sameSite: 'strict',
  secure: true,
}

const Storage = {
  get: Cookies.getJSON,
  set: (key, value) => Cookies.set(key, value, defaultCookieOptions),
  remove: Cookies.remove,
}

Storage.Keys = {
  ACCESS_TOKEN: 'fin_access_token',
  REFRESH_TOKEN: 'fin_refresh_token',
}

export default Storage
