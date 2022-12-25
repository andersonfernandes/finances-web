import React, { createContext, ReactNode } from 'react'

import useApp, { IAppContext } from './hooks/useApp'

const AppContext = createContext<IAppContext>({} as IAppContext)

const AppContextProvider = ({ children }: { children: ReactNode | Array<ReactNode> }) => {
  const {
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
  } = useApp()

  return (
    <AppContext.Provider
      value={{
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
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export default AppContext

export { AppContextProvider }
