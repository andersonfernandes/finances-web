import Cookies from 'js-cookie'

const DEFAULT_COOKIE_OPTIONS = {
  sameSite: 'strict',
  secure: true,
}

export enum CookieStorageKeys {
  ACCESS_TOKEN = '__fin_access_token',
  REFRESH_TOKEN = '__fin_refresh_token',
  CURRENT_ACCOUNT = '__fin_current_account',
}

export interface ICookieStorage {
  get: (key: CookieStorageKeys) => string
  set: (key: CookieStorageKeys, value: string) => void
  remove: (key: CookieStorageKeys) => void
}

const CookieStorage = {
  get: Cookies.get,
  set: (key: CookieStorageKeys, value: string) => Cookies.set(key, value, DEFAULT_COOKIE_OPTIONS),
  remove: Cookies.remove,
} as ICookieStorage

export default CookieStorage
