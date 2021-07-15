import React from 'react'
import { cleanup, screen } from '@testing-library/react'

import Home from './Home'
import { renderWithContext } from '../../services/customTestingLibrary'

describe('<Home />', () => {
  beforeEach(() => renderWithContext(<Home />))
  afterEach(cleanup)

  it('renders the app name', () => {
    expect(screen.getByText('Finances')).toBeInTheDocument()
  })

  it('renders the sign in link', () => {
    expect(screen.getByText('Sign In')).toBeInTheDocument()
  })
})
