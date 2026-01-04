import React from "react";
import Dashboard from "../Dashboard";
import Requestlist from "../../components/Requestlist";

function Hod() {
  return (
    <Dashboard userName="Aryan" role="HOD">
      <Requestlist />
    </Dashboard>
  );
}

export default Hod;
