import React from 'react'
import Requestlist from '../../Components/Request List/Requestlist'
import AddRequestForm from '../../Components/Add Request Form/AddRequestForm'
import Dashboard from '../../Components/Dashboard/Dashboard'
import Status from '../Status/Status'
import StatusTable from '../../Components/StatusTable/StatusTable'
import StatusMaster from '../StatusMaster/StatusMaster'
import ServiceDepartmentMaster from '../ServiceDepartmentMaster/ServiceDepartmentMaster'

function User() {
  return (
    <>
      
      <Dashboard>
        <AddRequestForm/>
        {/* <Status/> */}
      </Dashboard>

    </>

  )
}

export default User