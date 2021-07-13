import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'

import { AuthContext } from '../context/AuthContext'

const renderWithContext = (component, customContext = {}) => {
  const defaultContext = {
    authenticated: true,
  }
  const contextValues = Object.assign(defaultContext, customContext)

  return render(
    <Router>
      <AuthContext.Provider value={contextValues}>
        {component}
      </AuthContext.Provider>
    </Router>
  )
}

export {
  renderWithContext,
}
