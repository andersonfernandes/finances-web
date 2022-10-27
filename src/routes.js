import React from 'react'
import { BrowserRouter as Router, Switch } from 'react-router-dom'

import { AuthContextProvider } from './context/AuthContext'

import { CustomRoute } from './components'
import Home from './pages/Home'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import CreditCards from './pages/CreditCards'

export default function Routes() {
	return (
		<Router>
			<AuthContextProvider >
				<Switch>
					<CustomRoute isPrivate path="/dashboard" component={Dashboard} />
					<CustomRoute isPrivate path="/credit_cards" component={CreditCards} />
					<CustomRoute path="/login" component={Login} />
					<CustomRoute path="/" component={Home} />
				</Switch>
			</AuthContextProvider>
		</Router>
	)
}
