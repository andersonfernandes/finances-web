import React, { createContext, useState } from 'react'

const AppContext = createContext()

const AppContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(false)
  const [showErrors, setShowErrors] = useState(false)

  return (
    <AppContext.Provider
      value={{
        loading,
        setLoading,
        showErrors,
        setShowErrors,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export default AppContext

export { AppContextProvider }
