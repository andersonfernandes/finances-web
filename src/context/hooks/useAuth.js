import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import { default as ApiClient } from '../../adapters/api/client'
import { authenticate, revoke } from '../../adapters/api/authentication'
import Storage from '../../adapters/storage/cookieStorage'

const { ACCESS_TOKEN, REFRESH_TOKEN, CURRENT_ACCOUNT } = Storage.Keys

export default function useAuth() {
  const history = useHistory()

  const [authenticated, setAuthenticated] = useState(false)
  const [showErrors, setShowErrors] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = Storage.get(ACCESS_TOKEN)

    if (token) {
      setAuthenticated(true)
    }

    setLoading(false)
  }, [])

  const handleLoginErrors = () => {
    Storage.remove(ACCESS_TOKEN)
    Storage.remove(REFRESH_TOKEN)

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
            Storage.set(ACCESS_TOKEN, access_token)
            Storage.set(REFRESH_TOKEN, refresh_token)

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
        Storage.remove(ACCESS_TOKEN)
        Storage.remove(REFRESH_TOKEN)
        Storage.remove(CURRENT_ACCOUNT)

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
