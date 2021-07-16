import React, { createContext } from 'react'
import useAuth from './hooks/useAuth'

const AuthContext = createContext()

const AuthContextProvider = ({ children }) => {
  const {
    authenticated,
    loading,
    showErrors,
    handleLogin,
    handleLogout,
  } = useAuth()

  return (
    <AuthContext.Provider
      value={{
        authenticated,
        loading,
        showErrors,
        handleLogin,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext

export { AuthContextProvider }
