import { useEffect, useState } from 'react'
import UsersService from '../../adapters/services/UsersService'

import { AlertSnackbar } from '../../components'

export default function useApp() {
  const [currentAccount, setCurrentAccount] = useState(null)
  const [loading, setLoading] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [alertData, setAlertData] = useState({
    message: '',
    kind: AlertSnackbar.kinds.info,
  })

  useEffect(() => {
    UsersService.loadUserData().then(data => {
      setCurrentAccount(data.default_account)
    })
  }, [])

  return {
    currentAccount,
    loading,
    setLoading,
    showAlert,
    setShowAlert,
    alertData,
    setAlertData,
  }
}
