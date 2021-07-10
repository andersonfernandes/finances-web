import React, { useContext } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link
} from 'react-router-dom'

import Login from './pages/Login'
import { AuthContext, AuthProvider } from './context/AuthContext'
import LoadingBackdrop from './components/LoadingBackdrop'

const CustomRoute = ({ isPrivate, ...rest}) => {
  const { loading, authenticated } = useContext(AuthContext)

  if (loading) return <LoadingBackdrop open={loading} />

  if (isPrivate && !authenticated) return <Redirect to="/login" />

  return <Route exact {...rest} />
}

export default function Routes() {
  return (
    <Router>
      <AuthProvider>
        <Switch>
          <CustomRoute path="/login" component={Login} />
          <CustomRoute isPrivate path="/about" component={About} />
          <CustomRoute isPrivate path="/" component={Home} />
        </Switch>
      </AuthProvider>
    </Router>
  )
}

const Home = () => {
  return (
    <>
      <h1>Home Page</h1>
      <Link to="/about">About</Link>
    </>
  )
}


const About = () => {
  return (
    <>
      <h1>About Page</h1>
      <Link to="/">Home</Link>
    </>
  )
}
