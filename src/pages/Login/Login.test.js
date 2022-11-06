import React from 'react'
import {
  act,
  cleanup,
  fireEvent,
  screen,
  waitFor,
} from '@testing-library/react'

import Login from './index'
import { renderWithContext } from '../../adapters/test/customTestingLibrary'

jest.mock('../../adapters/api/authentication')
jest.mock('../../adapters/storage/CookieStorage')

describe('<Login />', () => {
  beforeEach(() => renderWithContext(<Login />))
  afterEach(cleanup)

  it('renders the login form', () => {
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
    expect(screen.getByLabelText('Password')).toBeInTheDocument()
    expect(screen.getByText('Enter')).toBeInTheDocument()
    expect(screen.getByText('Back')).toBeInTheDocument()
  })

  describe('when submiting the form with correct credentials', () => {
    it('set the tokens cookies and redirect to the dashboard', async () => {
      const emailInput = screen.getByLabelText('Email')
      const passwordInput = screen.getByLabelText('Password')

      fireEvent.change(emailInput, { target: { value: 'valid_user@mail.com' } })
      fireEvent.change(passwordInput, { target: { value: 'valid_password' } })

      await act(async () => fireEvent.submit(screen.getByText('Enter')))

      // await waitFor(() => {
      // expect(authenticateSpy).toHaveBeenCalledTimes(1)
      // })
    })
  })

  describe('when submiting the form with incorrect credentials', () => {
    it('renders the error message', async () => {
      const emailInput = screen.getByLabelText('Email')
      const passwordInput = screen.getByLabelText('Password')

      fireEvent.change(emailInput, { target: { value: 'invalid_user@mail.com' } })
      fireEvent.change(passwordInput, { target: { value: 'invalid_password' } })

      await act(async () => fireEvent.submit(screen.getByText('Enter')))

      await waitFor(() => {
        expect(screen.getByText('Invalid Email or Password!')).toBeInTheDocument()
      })
    })
  })
})
