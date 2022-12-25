import { useEffect, useState } from 'react'

import IAccountResponse from '../../adapters/api/responses/account'
import IUserResponse from '../../adapters/api/responses/user'
import UsersService from '../../adapters/services/UsersService'
import CookieStorage, { CookieStorageKeys } from '../../adapters/storage/CookieStorage'

import { AlertSnackbar } from '../../components'

export interface IAppContext {
  initCurrentAccount: () => void
  currentAccount: IAccountResponse | null
  showAccountSwitcher: boolean
  handleAccountSwitch: (newAccount: IAccountResponse | null) => void
  loading: boolean
  setLoading: (value: boolean) => void
  showAlert: boolean
  setShowAlert: (value: boolean) => void
  alertData: { message: string, kind: string }
  setAlertData: ({ message, kind }: { message: string, kind: string }) => void
}

export default function useApp(): IAppContext {
  const [currentAccount, setCurrentAccount] = useState<IAccountResponse | null>(null)
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
      UsersService.loadUserData().then((data: IUserResponse) => {
        handleAccountSwitch(data.default_account)
      })
    }
  }

  const handleAccountSwitch = (newAccount: IAccountResponse | null) => {
    if (!newAccount) {
      setShowAccountSwitcher(true)
    } else if (!currentAccount || newAccount.id !== currentAccount['id']) {
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
