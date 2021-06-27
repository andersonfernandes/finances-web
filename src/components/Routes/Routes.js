import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'

import Login from '../Login'

export default function Routes({ tokens, setTokens }) {
  return (
    <Router>
      <Switch>
        <Route path="/login">
          <Login setTokens={ setTokens } />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

const Home = () => {
  return (
    <h1>Home Page</h1>
  )
}
