import React, { useContext } from 'react'
import { Button } from '@material-ui/core'

import { AuthContext } from '../../context/AuthContext'

const Dashboard = () => {
  const { handleLogout } = useContext(AuthContext)

  return (
    <>
      <h1>Dashboard</h1>
      <Button variant="contained" onClick={() => handleLogout()}>Sair</Button>
    </>
  )
}

export default Dashboard
