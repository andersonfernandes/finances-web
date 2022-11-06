import { useEffect, useState } from 'react'

import UsersService from '../../adapters/services/UsersService'
import CookieStorage, { CookieStorageKeys } from '../../adapters/storage/CookieStorage'

import { AlertSnackbar } from '../../components'

export default function useApp() {
  const [currentAccount, setCurrentAccount] = useState(null)
  const [showAccountSwitcher, setShowAccountSwitcher] = useState(false)
  const [loading, setLoading] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [alertData, setAlertData] = useState({
    message: '',
    kind: AlertSnackbar.kinds.info,
  })

  const initCurrentAccount = () => {
    if (!CookieStorage.get(CookieStorageKeys.ACCESS_TOKEN)) return

    const currentAccountRaw = CookieStorage.get(CookieStorageKeys.CURRENT_ACCOUNT)

    if (currentAccountRaw) {
      setCurrentAccount(JSON.parse(currentAccountRaw))
    } else {
      UsersService.loadUserData().then(data => {
        handleAccountSwitch(data.default_account)
      })
    }
  }

  const handleAccountSwitch = (newAccount) => {
    if (!newAccount) {
      setShowAccountSwitcher(true)
    } else if (!currentAccount || newAccount.id !== currentAccount.id) {
      setCurrentAccount(newAccount)
      CookieStorage.set(CookieStorageKeys.CURRENT_ACCOUNT, JSON.stringify(newAccount))
    }
  }

  useEffect(initCurrentAccount, [])

  return {
    initCurrentAccount,
    currentAccount,
    showAccountSwitcher,
    handleAccountSwitch,
    loading,
    setLoading,
    showAlert,
    setShowAlert,
    alertData,
    setAlertData,
  }
}
