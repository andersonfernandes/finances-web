import React, { createContext } from 'react'
import PropTypes from 'prop-types'

import useApp from './hooks/useApp'

const AppContext = createContext()

const AppContextProvider = ({ children }) => {
  const {
    initCurrentAccount,
    currentAccount,
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

AppContextProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
}

export default AppContext

export { AppContextProvider }
