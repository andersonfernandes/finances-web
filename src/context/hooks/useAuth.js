import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import { authenticate } from '../../api/authentication'
import Storage from '../../services/cookieStorage'

const { ACCESS_TOKEN, REFRESH_TOKEN } = Storage.Keys

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

    authenticate({ email, password })
      .then(response => {
        if (response.status === 200) {
          const { access_token, refresh_token } = response.data
          Storage.set(ACCESS_TOKEN, access_token)
          Storage.set(REFRESH_TOKEN, refresh_token)

          setAuthenticated(true)
          history.push('/')
        } else {
          handleLoginErrors()
        }
      })
      .catch(() => {
        handleLoginErrors()
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const handleLogout = async () => {
    setAuthenticated(false)

    Storage.remove(ACCESS_TOKEN)
    Storage.remove(REFRESH_TOKEN)

    // TODO: Call API
    // TODO: Handle history
  }

  const handleTokenRefresh = async () => {
    // const accessToken = Storage.get(ACCESS_TOKEN)
    // const refreshToken = Storage.get(REFRESH_TOKEN)

    // TODO: Call API
    // TODO: Update cookies
    // TODO: History?
  }

  return {
    authenticated,
    loading,
    showErrors,
    handleLogin,
    handleLogout,
    handleTokenRefresh,
  }
}
