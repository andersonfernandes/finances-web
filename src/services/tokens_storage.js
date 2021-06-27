import Cookies from 'js-cookie'

const getAccessTokenFromCookie = () => {
  Cookies.get('access_token')
}

const getRefreshTokenFromCookie = () => {
  Cookies.get('refresh_token')
}

const setTokensCookie = ({ accessToken, refreshToken }) => {
  Cookies.set('access_token', accessToken, defaultCookieOptions)
  Cookies.set('refresh_token', refreshToken, defaultCookieOptions)
}

const defaultCookieOptions = {
  sameSite: 'strict',
  secure: true,
}

export {
  getAccessTokenFromCookie,
  getRefreshTokenFromCookie,
  setTokensCookie,
}
