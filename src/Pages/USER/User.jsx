import React from 'react'
import Requestlist from '../../Components/Request List/Requestlist'
import AddRequestForm from '../../Components/Add Request Form/AddRequestForm'
import Dashboard from '../../Components/Dashboard/Dashboard'

function User() {
  return (
    <>
      
      <Dashboard>
        <AddRequestForm/>
        <Requestlist/>
      </Dashboard>

    </>

  )
}

export default User