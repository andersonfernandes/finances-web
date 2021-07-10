import React, { useContext } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'

import Login from './pages/Login'
import { AuthContext, AuthProvider } from './context/AuthContext'

const PrivateRoute = ({ component: Component, ...args}) => {
  const { authenticated } = useContext(AuthContext)

  return (
    <Route
      {...args}
      render={() => authenticated
        ? <Component />
        : <Redirect to="/login" />
      }
    />
  )
}

export default function Routes() {
  return (
    <Router>
      <AuthProvider>
        <Switch>
          <Route path="/login" component={Login} />
          <PrivateRoute path="/" component={Home} />
        </Switch>
      </AuthProvider>
    </Router>
  )
}

const Home = () => {
  return (
    <h1>Home Page</h1>
  )
}
