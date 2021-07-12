import React, { useContext } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'

import { AuthContext, AuthProvider } from './context/AuthContext'
import LoadingBackdrop from './components/LoadingBackdrop'

import Home from './pages/Home'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'

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
      <AuthProvider>
        <Switch>
          <CustomRoute isPrivate path="/dashboard" component={Dashboard} />
          <CustomRoute path="/login" component={Login} />
          <CustomRoute path="/" component={Home} />
        </Switch>
      </AuthProvider>
    </Router>
  )
}
