import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'

import { AuthProvider } from '../context/AuthContext'

const renderWithContext = (component) => {
  return render(
    <Router>
      <AuthProvider>
        {component}
      </AuthProvider>
    </Router>
  )
}

export {
  renderWithContext,
}
