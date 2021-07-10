import React, { createContext } from 'react'
import useAuth from './hooks/useAuth'

const AuthContext = createContext()

const AuthProvider = ({ children }) => {
  const {
    authenticated,
    loading,
    showErrors,
    handleLogin,
    handleLogout,
    handleTokenRefresh,
  } = useAuth()

  return (
    <AuthContext.Provider
      value={{
        authenticated,
        loading,
        showErrors,
        handleLogin,
        handleLogout,
        handleTokenRefresh,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider }
