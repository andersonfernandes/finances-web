import React, { createContext, ReactNode } from 'react'

import useAuth, { IAuthContext } from './hooks/useAuth'

const AuthContext = createContext<IAuthContext>({} as IAuthContext)

const AuthContextProvider = ({ children }: { children: ReactNode | Array<ReactNode> }) => {
  const {
    authenticated,
    loading,
    showErrors,
    setShowErrors,
    handleLogin,
    handleLogout,
  } = useAuth()

  return (
    <AuthContext.Provider
      value={{
        authenticated,
        loading,
        showErrors,
        setShowErrors,
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
