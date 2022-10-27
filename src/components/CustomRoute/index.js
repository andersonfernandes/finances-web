import React, { useContext } from 'react'
import { Redirect, Route } from 'react-router-dom'
import PropTypes from 'prop-types'

import AuthContext from '../../context/AuthContext'
import LoadingBackdrop from '../LoadingBackdrop'

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

CustomRoute.propTypes = {
  isPrivate: PropTypes.bool,
}

export default CustomRoute
