import React, { createContext } from 'react'
import useAuth from './hooks/useAuth'

const AuthContext = createContext()

const AuthContextProvider = ({ children }) => {
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
