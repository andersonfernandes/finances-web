import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'

import { AuthContextProvider } from '../../context/AuthContext'

const renderWithContext = (component) => {
  return render(
    <Router>
      <AuthContextProvider>
        {component}
      </AuthContextProvider>
    </Router>
  )
}

export {
  renderWithContext,
}
