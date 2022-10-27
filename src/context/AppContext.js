import React, { createContext, useState } from 'react'
import { AlertSnackbar } from '../components'

const AppContext = createContext()

const AppContextProvider = ({ children }) => {
	const [loading, setLoading] = useState(false)
	const [showAlert, setShowAlert] = useState(false)
	const [alertData, setAlertData] = useState({
		message: '',
		kind: AlertSnackbar.kinds.info,
	})

	return (
		<AppContext.Provider
			value={{
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
