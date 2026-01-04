import React from "react";
import Dashboard from "../Dashboard";
import RequestList from "../../components/Requestlist";

function Tech() {
  return (
    <Dashboard userName="Meet" role="TECH">
      <RequestList />
    </Dashboard>
  );
}

export default Tech;
