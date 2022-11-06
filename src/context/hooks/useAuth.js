import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import { default as ApiClient } from '../../adapters/api/client'
import { authenticate, revoke } from '../../adapters/api/authentication'
import CookieStorage, { CookieStorageKeys } from '../../adapters/storage/CookieStorage'

export default function useAuth() {
  const history = useHistory()

  const [authenticated, setAuthenticated] = useState(false)
  const [showErrors, setShowErrors] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = CookieStorage.get(CookieStorageKeys.ACCESS_TOKEN)

    if (token) {
      setAuthenticated(true)
    }

    setLoading(false)
  }, [])

  const handleLoginErrors = () => {
    CookieStorage.remove(CookieStorageKeys.ACCESS_TOKEN)
    CookieStorage.remove(CookieStorageKeys.REFRESH_TOKEN)

    setAuthenticated(false)
    setShowErrors(true)
  }

  const handleLogin =  async ({ email, password }) => {
    setShowErrors(false)
    setLoading(true)

    return new Promise((resolve, reject) => {
      authenticate({ email, password })
        .then(response => {
          if (response.status === 200) {
            const { access_token, refresh_token } = response.data
            CookieStorage.set(CookieStorageKeys.ACCESS_TOKEN, access_token)
            CookieStorage.set(CookieStorageKeys.REFRESH_TOKEN, refresh_token)

            ApiClient.defaults.headers.Authorization = `Bearer ${access_token}`

            setAuthenticated(true)
            history.push('/dashboard')
            resolve()
          } else {
            handleLoginErrors()
            reject()
          }
        })
        .catch(() => {
          handleLoginErrors()
          reject()
        })
        .finally(() => {
          setLoading(false)
        })
    })
  }

  const handleLogout = async () => {
    setLoading(true)
    setAuthenticated(false)

    revoke()
      .then(() => {
        CookieStorage.remove(CookieStorageKeys.ACCESS_TOKEN)
        CookieStorage.remove(CookieStorageKeys.REFRESH_TOKEN)
        CookieStorage.remove(CookieStorageKeys.CURRENT_ACCOUNT)

        setLoading(false)
        history.push('/')
      })
  }

  return {
    authenticated,
    loading,
    showErrors,
    setShowErrors,
    handleLogin,
    handleLogout,
  }
}
