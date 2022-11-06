import { useEffect, useState } from 'react'

import UsersService from '../../adapters/services/UsersService'
import Storage from '../../adapters/storage/cookieStorage'

import { AlertSnackbar } from '../../components'

const { ACCESS_TOKEN, CURRENT_ACCOUNT } = Storage.Keys

export default function useApp() {
  const [currentAccount, setCurrentAccount] = useState(null)
  const [loading, setLoading] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [alertData, setAlertData] = useState({
    message: '',
    kind: AlertSnackbar.kinds.info,
  })

  const initCurrentAccount = () => {
    if (!Storage.get(ACCESS_TOKEN)) return

    const currentAccountRaw = Storage.get(CURRENT_ACCOUNT)

    if (currentAccountRaw) {
      setCurrentAccount(JSON.parse(currentAccountRaw))
    } else {
      UsersService.loadUserData().then(data => {
        setCurrentAccount(data.default_account)
        Storage.set(CURRENT_ACCOUNT, JSON.stringify(data.default_account))
      })
    }
  }

  const handleAccountSwitch = (newAccount) => {
    if (!currentAccount || newAccount.id != currentAccount.id) {
      setCurrentAccount(newAccount)
      Storage.set(CURRENT_ACCOUNT, JSON.stringify(newAccount))
    }
  }

  useEffect(initCurrentAccount, [])

  return {
    initCurrentAccount,
    currentAccount,
    handleAccountSwitch,
    loading,
    setLoading,
    showAlert,
    setShowAlert,
    alertData,
    setAlertData,
  }
}
