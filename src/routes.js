import React, { useContext } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'

import AuthContext, { AuthContextProvider } from './context/AuthContext'
import LoadingBackdrop from './components/LoadingBackdrop'

import Home from './pages/Home'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import CreditCards from './pages/CreditCards'

const CustomRoute = ({ isPrivate, ...rest}) => {
  const { loading, authenticated } = useContext(AuthContext)

  if (loading) {
    return <LoadingBackdrop open={loading} />
  }

  if (isPrivate && !authenticated) {
    return <Redirect to="/login" />
  }

  return <Route exact {...rest} />
}

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
