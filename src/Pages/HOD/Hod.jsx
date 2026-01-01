import React from 'react'
import Requestlist from '../../Components/Request List/Requestlist'
import Dashboard from '../../Components/Dashboard/Dashboard'
import AddRequestForm from '../../Components/Add Request Form/AddRequestForm'

function Hod() {
  return (
    <>

    <Dashboard>
      <Requestlist />
      <AddRequestForm/>
      <Status/>
      <ServiceDepartmentPersonMaster/>
      <ServiceRequestTypeMaster/>
      <ServiceRequestTypeWisePerson/>
      <StatusMaster/>

    </Dashboard>

    </>
  )

}

export default Hod