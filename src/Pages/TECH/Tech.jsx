import React from 'react'
import Requestlist from '../../Components/Request List/Requestlist'
import Dashboard from '../../Components/Dashboard/Dashboard'
import AddRequestForm from '../../Components/Add Request Form/AddRequestForm'
import Status from '../Status/Status'

function Tech() {
  return (
    <>

    <Dashboard>
      <Requestlist/>
      <AddRequestForm/>
      <Status/>
    </Dashboard>
   
    </>

  )
}

export default Tech