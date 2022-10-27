import React, { createContext } from 'react'
import PropTypes from 'prop-types'

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

AuthContextProvider.propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node,
	])
}

export default AuthContext

export { AuthContextProvider }
